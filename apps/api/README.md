---
title: Indian Bovine Breed Identifier API
emoji: 🐄
colorFrom: green
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# Indian Bovine Breed Identifier API

This Hugging Face Space hosts the FastAPI backend for the AI-Powered Indian Bovine Breed Identifier application. It is automatically deployed from our GitHub repository.

## 🚀 Purpose

The API serves a deep learning model trained to classify different breeds of Indian cattle and buffalo from an uploaded image. It provides a prediction endpoint that is consumed by our Next.js frontend.

## 🛠️ Tech Stack

- **Framework:** FastAPI
- **Model Library:** PyTorch
- **Model Architecture:** `convnext_tiny` (from `timm`)
- **Containerization:** Docker

## 📝 API Endpoint

- **`POST /predict`**
  - **Description:** Accepts an image file and returns the predicted breed and the model's confidence level.
  - **Request Body:** `multipart/form-data` with a single field named `file`.
  - **Success Response (200):**
    ```json
    {
      "breed": "Sahiwal",
      "confidence": "92.14%"
    }
    ```