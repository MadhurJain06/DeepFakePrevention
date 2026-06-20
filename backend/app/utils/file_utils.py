import os
import uuid
import aiofiles
from pathlib import Path
from fastapi import UploadFile, HTTPException

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE_MB", "10")) * 1024 * 1024


def validate_image(file: UploadFile) -> None:
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{file.content_type}'. Allowed: JPEG, PNG, WebP."
        )
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Invalid file extension '{ext}'.")


async def save_upload(file: UploadFile, upload_dir: str) -> tuple[str, str]:
    image_id = str(uuid.uuid4())
    ext = Path(file.filename).suffix.lower()
    filename = f"{image_id}{ext}"
    dest = os.path.join(upload_dir, filename)

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"File exceeds {os.getenv('MAX_FILE_SIZE_MB', '10')} MB limit."
        )

    async with aiofiles.open(dest, "wb") as f:
        await f.write(contents)

    return image_id, dest


def cleanup_file(path: str) -> None:
    try:
        if os.path.exists(path):
            os.remove(path)
    except OSError:
        pass


def get_file_size(path: str) -> int:
    try:
        return os.path.getsize(path)
    except OSError:
        return 0
