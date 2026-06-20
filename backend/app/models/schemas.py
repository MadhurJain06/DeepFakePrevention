from pydantic import BaseModel
from typing import Optional, List, Any


class UploadResponse(BaseModel):
    image_id: str
    original_url: str
    message: str


class AttackResult(BaseModel):
    name: str
    protection_held: bool
    arcface_distance: Optional[float] = None
    mse: Optional[float] = None
    ssim: Optional[float] = None
    time_seconds: Optional[float] = None


class ProcessResponse(BaseModel):
    image_id: str
    original_url: str
    processed_url: str
    # Core display metrics
    protection_strength: float      # DRS score 0–1
    processing_time_ms: int
    noise_level: str
    perturbation_type: str
    # Extended metrics from notebook pipeline
    psnr_db: Optional[float] = None
    semantic_loss: Optional[float] = None
    golden_timestep: Optional[int] = None
    attacks_blocked: Optional[int] = None
    total_attacks: Optional[int] = None
    attack_results: Optional[List[AttackResult]] = None


class DownloadInfo(BaseModel):
    image_id: str
    filename: str
    size_bytes: int


class ErrorResponse(BaseModel):
    detail: str
    code: Optional[str] = None
