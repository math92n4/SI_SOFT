from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class Spacecraft(BaseModel):
    id: int
    name: str

spacecrafts = [
    Spacecraft(id=1, name="Apollo 13"),
    Spacecraft(id=2, name="Challenger"),
    Spacecraft(id=3, name="Enterprise")
]

@router.get("/api/spacecrafts", tags=["spacecraft"], response_model=list[Spacecraft])
def get_spacecrafts():
    return spacecrafts

@router.get("/api/spacecrafts/{id}", tags=["spacecraft"], response_model=Spacecraft)
def get_spacecraft_by_id(id: int):
    for spacecraft in spacecrafts:
        if spacecraft.id == id:
            return spacecraft
    raise HTTPException(status=404, detail="No spacecraft found")

@router.post("/api/spacecrafts", tags=["spacecraft"], response_model=Spacecraft)
def create_spacecraft(spacecraft: Spacecraft):
    spacecrafts.append(spacecraft)
    return spacecraft