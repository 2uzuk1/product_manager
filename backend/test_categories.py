import pytest
from database import categories, products
from fastapi.testclient import TestClient
from main import app


@pytest.fixture(autouse=True)
def clean_database():
    categories.clear()
    products.clear()


client = TestClient(app)


def test_create_category():
    response = client.post("/categories", json={"name": "Frutas"})
    assert response.status_code == 201
    assert response.json()["name"] == "Frutas"


def test_list_categories_empty():
    response = client.get("/categories")
    assert response.status_code == 200
    assert response.json() == []


def test_create_category_duplicate_409():
    client.post("/categories", json={"name": "Frutas"})
    response = client.post("/categories", json={"name": "Frutas"})
    assert response.status_code == 409


def test_create_empty_name_422():
    response = client.post("/categories", json={"name": ""})
    assert response.status_code == 422


def test_create_blank_name_422():
    response = client.post("/categories", json={"name": "    "})
    assert response.status_code == 422


def test_product_create_201():
    category = client.post("/categories", json={"name": "Fruits"})
    category_id = category.json()["id"]
    response = client.post(
        "/products",
        json={"category_id": category_id, "name": "Laranja", "quantity": 50},
    )
    assert response.status_code == 201


def test_delete_category_with_products_409():
    category = client.post("/categories", json={"name": "Frutas"})
    category_id = category.json()["id"]
    product = client.post(
        "/products",
        json={"category_id": category_id, "name": "Laranja", "quantity": 50},
    )
    assert product.status_code == 201
    response = client.delete(f"/categories/{category_id}")
    assert response.status_code == 409
