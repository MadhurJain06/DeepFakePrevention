import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse

from app.models.schemas import (
    UploadResponse, ProcessResponse, DownloadInfo, AttackResult
)
from app.services.image_service import process_image
from app.utils.file_utils import validate_image, save_upload, get_file_size

router = APIRouter(prefix="/api", tags=["images"])

UPLOAD_DIR    = os.getenv("UPLOAD_DIR",    "uploads")
PROCESSED_DIR = os.getenv("PROCESSED_DIR", "processed")


def _use_kaggle() -> bool:
    return bool(os.getenv("KAGGLE_URL", "").strip())


@router.post("/upload", response_model=UploadResponse)
async def upload_image(file: UploadFile = File(...)):
    validate_image(file)
    image_id, saved_path = await save_upload(file, UPLOAD_DIR)
    return UploadResponse(
        image_id=image_id,
        original_url=f"/api/original/{image_id}{_ext(saved_path)}",
        message="Image uploaded successfully.",
    )


@router.post("/process/{image_id}", response_model=ProcessResponse)
async def process_uploaded_image(image_id: str):
    input_path = _find_file(UPLOAD_DIR, image_id)
    if not input_path:
        raise HTTPException(status_code=404, detail="Uploaded image not found.")

    if _use_kaggle():
        from app.services.kaggle_service import process_via_kaggle
        result = await process_via_kaggle(input_path, PROCESSED_DIR)
    else:
        result = process_image(input_path, PROCESSED_DIR)
    ext    = _ext(input_path)

    # Coerce attack_results list if present
    attack_results = None
    raw = result.get("attack_results") or []
    if raw:
        attack_results = [AttackResult(**r) for r in raw]

    return ProcessResponse(
        image_id          = image_id,
        original_url      = f"/api/original/{image_id}{ext}",
        processed_url     = f"/api/processed/{image_id}{ext}",
        protection_strength = result["protection_strength"],
        processing_time_ms  = result["processing_time_ms"],
        noise_level         = result["noise_level"],
        perturbation_type   = result["perturbation_type"],
        psnr_db             = result.get("psnr_db"),
        semantic_loss       = result.get("semantic_loss"),
        golden_timestep     = result.get("golden_timestep"),
        attacks_blocked     = result.get("attacks_blocked"),
        total_attacks       = result.get("total_attacks"),
        attack_results      = attack_results,
    )


@router.get("/original/{image_id}{ext:path}")
async def get_original(image_id: str, ext: str):
    path = _find_file(UPLOAD_DIR, image_id)
    if not path:
        raise HTTPException(status_code=404, detail="Original image not found.")
    return FileResponse(path, media_type=_media_type(path))


@router.get("/processed/{image_id}{ext:path}")
async def get_processed(image_id: str, ext: str):
    path = _find_file(PROCESSED_DIR, f"{image_id}_protected")
    if not path:
        raise HTTPException(status_code=404, detail="Processed image not found.")
    return FileResponse(path, media_type=_media_type(path))


@router.get("/download/{image_id}", response_model=DownloadInfo)
async def download_info(image_id: str):
    path = _find_file(PROCESSED_DIR, f"{image_id}_protected")
    if not path:
        raise HTTPException(status_code=404, detail="Processed image not found.")
    return DownloadInfo(
        image_id=image_id,
        filename=os.path.basename(path),
        size_bytes=get_file_size(path),
    )


@router.get("/download/{image_id}/file")
async def download_file(image_id: str):
    path = _find_file(PROCESSED_DIR, f"{image_id}_protected")
    if not path:
        raise HTTPException(status_code=404, detail="Processed image not found.")
    return FileResponse(
        path,
        media_type=_media_type(path),
        headers={"Content-Disposition": f'attachment; filename="{os.path.basename(path)}"'},
    )


# ── helpers ───────────────────────────────────────────────────────────────────
def _find_file(directory: str, stem: str) -> str | None:
    for ext in (".jpg", ".jpeg", ".png", ".webp"):
        p = os.path.join(directory, f"{stem}{ext}")
        if os.path.exists(p):
            return p
    return None


def _ext(path: str) -> str:
    from pathlib import Path
    return Path(path).suffix.lower()


def _media_type(path: str) -> str:
    return {
        ".jpg":  "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png":  "image/png",
        ".webp": "image/webp",
    }.get(_ext(path), "application/octet-stream")
