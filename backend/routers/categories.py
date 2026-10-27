from uuid import uuid4

from database import categories, products
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class CategoryCreate(BaseModel):
    name: str


class Category(CategoryCreate):
    id: str


@router.get("/categories", response_model=list[Category])
def list_categories():
    return categories


@router.post("/categories", status_code=201, response_model=Category)
def create_category(data: CategoryCreate):
    name = data.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="ERROR! Name cannot be empty")
    if any(c.name.lower() == name.lower() for c in categories):
        raise HTTPException(status_code=409, detail="ERROR! Category already exists")

    category = Category(id=str(uuid4()), name=name)
    categories.append(category)

    return category


@router.delete("/categories/{category_id}", status_code=204)
def delete_category(category_id: str):
    if not any(c.id == category_id for c in categories):
        raise HTTPException(status_code=404, detail="ERROR! Category not found")
    if any(p.category_id == category_id for p in products):
        raise HTTPException(
            status_code=409,
            detail="ERROR! This category still has products",
            # On category deletion with products asigned to it cause data loss.
        )
    for c in categories:
        if c.id == category_id:
            categories.remove(c)
            return


@router.put("/categories/{category_id}", response_model=Category)
def edit_category(data: CategoryCreate, category_id: str):
    name = data.name.strip()
    if not any(c.id == category_id for c in categories):
        raise HTTPException(status_code=404, detail="ERROR! Category not found")
    if not name:
        raise HTTPException(status_code=422, detail="ERROR! Name cannot be empty")
    # Only one unique category name.
    if any(c.name.lower() == name.lower() and c.id != category_id for c in categories):
        raise HTTPException(status_code=409, detail="ERROR! Category already exists")

    for i, c in enumerate(categories):
        if c.id == category_id:
            categories[i] = Category(id=category_id, name=name)
            return categories[i]
