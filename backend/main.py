from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


#Categories
class CategoryCreate(BaseModel):
    name: str

class Category(CategoryCreate):
    id: str

categories = []

@app.get("/categories")
def list_categories():
    return categories


@app.post("/categories", status_code=201, response_model=Category)
async def create_category(data: Category):
    name = data.name.strip()
    if any(c.name.lower() == name.lower() for c in categories):
        raise HTTPException(status_code=409, detail="ERROR! Category already exists")
    if not name:
        raise HTTPException(status_code=422, detail="ERROR! Name cannot be empty")

    category = Category(id=str(uuid4()), name=name)
    categories.append(category)

    return category

#Products
class Product(BaseModel):
    id: str | None = None
    category_id: str
    name: str
    description: str | None = None
    quantity: int
    price: float

products = []

@app.get("/products")
def list_product():
    return products

@app.post("/products", status_code=201, response_model=Product)
async def create_product(data: Product):
    name = data.name.strip()
    if any(p.name.lower() == name.lower() and p.category_id == data.category_id for p in products):
        raise HTTPException(status_code=409, detail="ERROR! Product already exists")

    if not any(c.id == data.category_id for c in categories):
        raise HTTPException(status_code=404, detail="ERROR! Category not found")
    
    if not name:
        raise HTTPException(status_code=422, detail="ERROR! Name cannot be empty")

    product = Product(
        id=str(uuid4()), 
        category_id=data.category_id, 
        name=name, 
        description=data.description, 
        quantity=data.quantity, 
        price=data.price
        )
    
    products.append(product)
    return product