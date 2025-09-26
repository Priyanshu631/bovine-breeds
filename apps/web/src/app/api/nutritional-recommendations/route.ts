import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

export async function POST(req: NextRequest) {
  try {
    const { breed } = await req.json();

    if (!breed) {
      return NextResponse.json({ error: "Breed is required." }, { status: 400 });
    }

    const query = `
      You are an expert in Indian bovine health. Provide specific nutritional recommendations for a "${breed}" bovine.
      Generate the response as a JSON array of objects. Each object must have an 'icon', 'heading', and 'text' property.
      
      The 'icon' property must be one of the following strings:
      - "Dog" for general health/diet tips.
      - "Bone" for calcium/mineral needs.
      - "Leaf" for forage/plant-based diet.
      - "Droplet" for hydration.
      - "Star" for a key fact or overall tip.
      
      The 'heading' property should be a concise title for the recommendation.
      The 'text' property should contain the detailed description.

      Example format:
      [
        {
          "icon": "Leaf",
          "heading": "High-quality roughage",
          "text": "Sahiwals need a diet predominantly based on high-quality roughage, such as berseem clover, lucerne (alfalfa), and other legumes. Ensure a minimum of 50-60% of their total daily intake comes from good quality green fodder. The fodder should be free of toxins and mold."
        },
        {
          "icon": "Droplet",
          "heading": "Clean water access",
          "text": "Always ensure access to clean and fresh water. Water intake is crucial, especially for lactating cows, to maintain milk production and overall health. Water troughs should be cleaned regularly."
        }
      ]
      
      Do not include any text, markdown, or code blocks outside of the JSON array.
      Provide at least 5 recommendations.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: query }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    const recommendations = JSON.parse(responseText);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to get recommendations." }, { status: 500 });
  }
}
