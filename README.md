# 🛡️ AI Immunization for Protecting Images Against Generative Deepfake Models

> **Adaptive Latent-Space Immunization** is a proactive defense framework that protects personal images against AI-powered deepfake generation using latent-space adversarial optimization, CLIP-guided prompt awareness, and robust perturbation techniques. Unlike traditional image immunization methods, it preserves legitimate AI-assisted editing while resisting malicious manipulation.

![Python](https://img.shields.io/badge/Python-3.10-blue)
![PyTorch](https://img.shields.io/badge/PyTorch-2.2-red)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![Diffusers](https://img.shields.io/badge/HuggingFace-Diffusers-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

# Overview

Generative AI models such as Stable Diffusion have significantly improved image synthesis capabilities, but they have also enabled highly convincing deepfake generation. Existing protection methods such as **Glaze** and **PhotoGuard** rely on static adversarial perturbations that often block both malicious and legitimate AI editing.

This project introduces an **Adaptive Latent-Space Immunization Framework**, a seven-phase adversarial machine learning pipeline that generates intelligent perturbations directly within the latent space of diffusion models. The framework combines computer vision, adversarial optimization, semantic prompt analysis, and robustness testing to produce protected images that remain visually identical while resisting AI-driven manipulation.

---

#  Features

*  Face-aware adversarial masking
*  Automatic Golden Timestep discovery
*  Latent-space PGD optimization
*  Expectation Over Transformation (EOT) robustness
*  CLIP-guided adaptive prompting
*  Automated Red-Team attack simulation
*  Deepfake Resistance Score (DRS)
*  FastAPI REST API
*  GPU deployment on Kaggle

---

#  User Interface

## Home Dashboard

<p align="center">
  <img width="899" height="428" alt="image" src="https://github.com/user-attachments/assets/e67cf7ec-d6dc-4ae9-8147-1ab67c67570e" />
</p>

---

## Upload & Configuration

<p align="center">
  <img width="1600" height="763" alt="image" src="https://github.com/user-attachments/assets/59a94210-6ffb-4bc4-9cf4-deb34320b6fb" />
</p>

Configure protection strength and upload the image to start the immunization process.

---

## Protection Results

<p align="center">
 <img width="1600" height="768" alt="image" src="https://github.com/user-attachments/assets/b518ea47-ab2a-4da4-a23c-01204175408c" />
</p>

Compare the original and protected image along with evaluation metrics and Deepfake Resistance Score (DRS).

---

#  System Architecture

<p align="center">
  <img width="1345" height="1170" alt="image" src="https://github.com/user-attachments/assets/cb12d14e-d211-4e6b-9d2d-fe9dfa8f6e2e" />

</p>

The framework follows a seven-phase pipeline beginning with face localization and ending with quantitative robustness evaluation.

---

#  Pipeline Workflow

```text
Input Image
      │
      ▼
Face Detection & Mask Generation
      │
      ▼
Golden Timestep Detection
      │
      ▼
Latent Space Encoding
      │
      ▼
PGD Optimization
      │
      ▼
Expectation Over Transformation
      │
      ▼
CLIP Adaptive Controller
      │
      ▼
Red-Team Evaluation
      │
      ▼
Deepfake Resistance Score
      │
      ▼
Protected Image
```

---

#  Seven-Phase Framework

### Phase 1 — Face Masking

Detects identity-rich facial regions using OpenCV Haar Cascades.

### Phase 2 — Golden Timestep Analysis

Determines the diffusion timestep most vulnerable to identity manipulation.

### Phase 3 — Latent Adversarial Optimization

Generates adversarial perturbations using Projected Gradient Descent (PGD).

### Phase 4 — EOT Robustness

Hardens perturbations against

* JPEG Compression
* Gaussian Blur
* Image Resizing
* Random Transformations

### Phase 5 — Adaptive Prompting

Uses CLIP embeddings to distinguish between safe and malicious prompts.

### Phase 6 — Red-Team Validation

Evaluates protection against

* ControlNet
* Img2Img
* DDIM
* JPEG Compression
* Blur

### Phase 7 — Deepfake Resistance Score (DRS)

Computes an overall protection score using

* ArcFace Identity Distance
* PSNR
* CLIP Semantic Preservation

---

#  Results

| Metric                     | Value       |
| -------------------------- | ----------- |
| Deepfake Resistance Score  | **≈ 0.84**  |
| PSNR                       | **30±8 dB** |
| CLIP Similarity            | **> 0.93**  |
| Successful Attack Blocking | **8 / 10**  |

---

# 🖼️ Sample Output

| Original Image           | Protected Image           |
| ------------------------ | ------------------------- |
| <img width="444" height="634" alt="image" src="https://github.com/user-attachments/assets/c2f34695-e118-430e-89c3-e5f18496cce0" />| <img width="448" height="636" alt="image" src="https://github.com/user-attachments/assets/dda97acf-4188-4690-814d-443d062eda1c" /> |

---

#  Tech Stack

### Artificial Intelligence

* PyTorch
* Hugging Face Diffusers
* Stable Diffusion
* CLIP
* ArcFace

### Computer Vision

* OpenCV
* DeepFace
* Scikit-Image

### Backend

* FastAPI
* Uvicorn
* ngrok

### Deployment

* Kaggle Dual NVIDIA T4 GPUs

---

# 📂 Project Structure

```text
DeepFake-Immunization/
│
├── assets/
│   ├── ui-home.png
│   ├── ui-upload.png
│   ├── ui-result.png
│   ├── architecture.png
│   ├── original.jpg
│   └── protected.jpg
│
├── backend/
│
├── frontend/
│
├── notebooks/
│
├── models/
│
├── utils/
│
├── requirements.txt
│
└── README.md
```

---

# 🚀 Installation

```bash
git clone https://github.com/yourusername/deepfake-immunization.git

cd deepfake-immunization

pip install -r requirements.txt

python app.py
```

---

# 📚 References

* Stable Diffusion
* Hugging Face Diffusers
* PhotoGuard
* Glaze
* CLIP
* ArcFace
* Projected Gradient Descent (PGD)
* Expectation Over Transformation (EOT)

---

## ⭐ If you found this project interesting, consider giving it a star!
