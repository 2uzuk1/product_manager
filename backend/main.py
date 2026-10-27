from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Categories ---
class CategoryCreate(BaseModel):
    name: str


class Category(CategoryCreate):
    id: str


categories = []


@app.get("/categories", response_model=list[Category])
def list_categories():
    return categories


@app.post("/categories", status_code=201, response_model=Category)
def create_category(data: CategoryCreate):
    name = data.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="ERROR! Name cannot be empty")
    if any(c.name.lower() == name.lower() for c in categories):
        raise HTTPException(status_code=409, detail="ERROR! Category already exists")

    category = Category(id=str(uuid4()), name=name)
    categories.append(category)

    return category


@app.delete("/categories/{id}", status_code=204)

# --- Products ---
class ProductCreate(BaseModel):
    category_id: str
    name: str
    description: str | None = None
    quantity: int = Field(ge=0)
    price: int | None = Field(ge=0, default=None)


class Product(ProductCreate):
    id: str


products = []


@app.get("/products", response_model=list[Product])
def list_products():
    return products


@app.post("/products", status_code=201, response_model=Product)
def create_product(data: ProductCreate):
    name = data.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="ERROR! Name cannot be empty")
    if not any(c.id == data.category_id for c in categories):
        raise HTTPException(status_code=422, detail="ERROR! Category not found")
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
