import os
import io
import base64
from pathlib import Path

import httpx
from PIL import Image


async def process_via_kaggle(input_path: str, processed_dir: str) -> dict:
    kaggle_url = os.getenv("KAGGLE_URL", "").rstrip("/")
    if not kaggle_url:
        raise RuntimeError("KAGGLE_URL is not set in environment.")

    image_id = Path(input_path).stem
    ext = Path(input_path).suffix.lower() or ".png"

    async with httpx.AsyncClient(timeout=600.0) as client:
        with open(input_path, "rb") as f:
            response = await client.post(
                f"{kaggle_url}/process",
                files={"file": (Path(input_path).name, f, "image/jpeg")},
            )
        response.raise_for_status()

    data = response.json()

    img_bytes = base64.b64decode(data["protected_image_b64"])
    protected_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

    out_fname = f"{image_id}_protected{ext}"
    out_path = os.path.join(processed_dir, out_fname)
    protected_img.save(out_path, quality=95)

    m = data["metrics"]
    psnr = m.get("psnr")
    noise_level = (
        "imperceptible" if psnr and psnr >= 38
        else ("low" if psnr and psnr >= 30 else "visible")
    )

    return {
        "image_id": image_id,
        "output_path": out_path,
        "output_filename": out_fname,
        "processing_time_ms": int(m.get("processing_time", 0) * 1000),
        "protection_strength": m.get("drs", 0.0),
        "noise_level": noise_level,
        "perturbation_type": "adversarial-pgd-eot-clip",
        "psnr_db": psnr,
        "semantic_loss": m.get("semantic_loss"),
        "golden_timestep": m.get("golden_timestep"),
        "attacks_blocked": m.get("attacks_blocked"),
        "total_attacks": m.get("total_attacks"),
        "attack_results": m.get("attack_results", []),
    }
