import torch
import torch.nn as nn
from torchvision import transforms
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import timm  # Important: Import the timm library

# --- 1. Define Class Names and Transformations ---

# These class names are extracted directly from your notebook's output.
# The order is critical and must match exactly.
CLASS_NAMES = [
    'Alambadi', 'Amritmahal', 'Ayrshire', 'Banni', 'Bargur', 'Bhadawari',
    'Brown_Swiss', 'Dangi', 'Deoni', 'Gir', 'Guernsey', 'Hallikar', 'Hariana',
    'Holstein_Friesian', 'Jaffrabadi', 'Jersey', 'Kangayam', 'Kankrej',
    'Kasargod', 'Kenkatha', 'Kherigarh', 'Khillari', 'Krishna_Valley',
    'Malnad_gidda', 'Mehsana', 'Murrah', 'Nagori', 'Nagpuri', 'Nili_Ravi',
    'Nimari', 'Ongole', 'Pulikulam', 'Rathi', 'Red_Dane', 'Red_Sindhi',
    'Sahiwal', 'Surti', 'Tharparkar', 'Toda', 'Umblachery', 'Vechur'
]

# These are the exact validation/inference transforms from your notebook.
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])


# --- 2. Initialize FastAPI App and Load the Model ---

app = FastAPI(title="Bovine Breed Classification API (Timm)")

# Add CORS middleware to allow your frontend to connect
origins = ["http://localhost:3000", "localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and weights
model_path = 'best_model_final.pth'
num_classes = len(CLASS_NAMES)

# Recreate the exact model architecture using timm
model = timm.create_model(
    'convnext_tiny',
    pretrained=False,  # Set to False as we are loading our own weights
    num_classes=num_classes,
    drop_path_rate=0.2
)

# Load the saved state dictionary.
# map_location='cpu' ensures it works on machines without a GPU.
checkpoint = torch.load(model_path, map_location=torch.device('cpu'))
model.load_state_dict(checkpoint['model_state_dict'])

# Set the model to evaluation mode (important!)
model.eval()
print("Timm 'convnext_tiny' model loaded and ready for inference.")


# --- 3. Define API Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Welcome to the Timm-powered Bovine Breed Classification API"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Receives an image, applies the correct transformations, and returns the prediction.
    """
    # Read image content from the uploaded file
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')

    # Preprocess the image and add a batch dimension [C, H, W] -> [1, C, H, W]
    image_tensor = preprocess(image).unsqueeze(0)

    # Make prediction
    with torch.no_grad():  # Disables gradient calculation for faster inference
        outputs = model(image_tensor)
        
        # Apply softmax to convert model outputs to probabilities
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        
        # Get the top prediction's index and confidence
        confidence, predicted_idx = torch.max(probabilities, 0)
        
        predicted_class_name = CLASS_NAMES[predicted_idx.item()]
        confidence_percentage = confidence.item() * 100

    return {
        "breed": predicted_class_name,
        "confidence": f"{confidence_percentage:.2f}%"
    }