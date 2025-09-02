from fastapi import APIRouter

router = APIRouter(prefix="/api/v1", tags=["API v1"])

@router.get("/")
async def api_root():
    return {"message": "Trade API v1", "version": "1.0.0"}

@router.get("/ping")
async def ping():
    return {"message": "pong"}
