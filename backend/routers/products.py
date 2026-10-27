from uuid import uuid4

from database import categories, products
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()


class ProductCreate(BaseModel):
    category_id: str
    name: str
    description: str | None = None
    quantity: int = Field(ge=0)
    price: int | None = Field(ge=0, default=None)
    # Currency TBD


class Product(ProductCreate):
    id: str


@router.get("/products", response_model=list[Product])
def list_products(category_id: str | None = None):
    if category_id is None:
        return products
    return [p for p in products if p.category_id == category_id]


@router.post("/products", status_code=201, response_model=Product)
def create_product(data: ProductCreate):
    name = data.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="ERROR! Name cannot be empty")
    if not any(c.id == data.category_id for c in categories):
        raise HTTPException(
            status_code=422,
            detail="ERROR! Category not found",
            # 422: the request is readable, but category_id points to nothing
        )
    if any(
        p.name.lower() == name.lower() and p.category_id == data.category_id
        for p in products
    ):
        raise HTTPException(status_code=409, detail="ERROR! Product already exists")

    product = Product(
        id=str(uuid4()),
        category_id=data.category_id,
        name=name,
        description=data.description,
        quantity=data.quantity,
        price=data.price,
    )

    products.append(product)
    return product


@router.delete("/products/{product_id}", status_code=204)
def delete_product(product_id: str):
    for p in products:
        if p.id == product_id:
            products.remove(p)
            return

    raise HTTPException(status_code=404, detail="ERROR! Product not found")


@router.put("/products/{product_id}", response_model=Product)
def edit_product(data: ProductCreate, product_id: str):
    name = data.name.strip()
    if not any(p.id == product_id for p in products):
        raise HTTPException(status_code=404, detail="ERROR! Product not found")
    if not name:
        raise HTTPException(status_code=422, detail="ERROR! Name cannot be empty")
    if not any(c.id == data.category_id for c in categories):
        raise HTTPException(status_code=422, detail="ERROR! Category not found")
    if any(
        p.name.lower() == name.lower()
        and p.category_id == data.category_id
        and p.id != product_id
        for p in products
    ):
        raise HTTPException(status_code=409, detail="ERROR! Product already exists")
        # Only one unique product per category
    for i, p in enumerate(products):
        if p.id == product_id:
            products[i] = Product(
                id=product_id,
                category_id=data.category_id,
                name=name,
                description=data.description,
                quantity=data.quantity,
                price=data.price,
            )
            return products[i]
