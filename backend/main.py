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


@app.delete("/categories/{category_id}", status_code=204)
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


@app.put("/categories/{category_id}", response_model=Category)
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


# --- Products ---
class ProductCreate(BaseModel):
    category_id: str
    name: str
    description: str | None = None
    quantity: int = Field(ge=0)
    price: int | None = Field(ge=0, default=None)
    # Currency TBD


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


@app.delete("/products/{product_id}", status_code=204)
def delete_product(product_id: str):
    for p in products:
        if p.id == product_id:
            products.remove(p)
            return

    raise HTTPException(status_code=404, detail="ERROR! Product not found")


@app.put("/products/{product_id}", response_model=Product)
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
