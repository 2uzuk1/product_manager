import { useEffect, useState } from "react";

import Button from "../components/Button";
import ProductModal from "../components/ProductModal";
import CategoryModal from "../components/CategoryModal";
import ProductListModal from "../components/ProductListModal";

import CategoryForm from "../components/CategoryForm";

function Home() {
  const [modalOpen, setModalOpen] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    fetch("http://localhost:8000/categories")
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        setError("Not possible to load categories.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setError("");
    fetch("http://localhost:8000/products")
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
        setError("Not possible to load products");
      });
  }, []);

  const handleCategoryClick = (category_id) => {
    setSelectedCategoryId(category_id);
    console.log(category_id);
  };

  return (
    <div className="flex flex-col gap-5 m-7 items-center">
      <h1 className="text-4xl font-semibold">Product Manager</h1>
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Button
          onClick={() => setModalOpen("newProduct")}
          disabled={categories.length === 0}
        >
          New product
        </Button>
        <Button onClick={() => setModalOpen("category")}>New category</Button>
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center p-5 gap-2">
          <div
            role="status"
            className="animate-spin w-10 h-10 rounded-full border-4 border-border border-t-primary"
          ></div>
          <span className="sr-only">Loading</span>
        </div>
      ) : (
        categories.length > 0 && (
          <ul className="grid grid-cols-2 gap-2 p-2 max-w-2xl w-full bg-surface border border-border rounded-xl transition ease-in-out hover:scale-101 hover:shadow-md">
            <h2 className="flex col-span-2 justify-center font-semibold p-2">
              Categories
            </h2>

            {categories.map((c) => (
              <li
                className="flex justify-center p-2 text-smooth-text font-semibold bg-surface border border-border rounded-md cursor-pointer transition ease-in-out hover:border-b-transparent hover:scale-101 hover:shadow-md hover:text-primary"
                key={c.id}
                onClick={() => handleCategoryClick(c.id)}
              >
                {c.name}
              </li>
            ))}
          </ul>
        )
      )}
      {error && (
        <div className="flex justify-center p-10 border border-border rounded-xl shadow-md w-full max-w-2xl">
          <div
            role="alert"
            className="border border-out rounded-sm text-out/90 px-20 bg-out/20"
          >
            {error}
          </div>
        </div>
      )}

      <ProductModal
        canShow={modalOpen === "newProduct"}
        onClose={() => setModalOpen(null)}
      />
      <CategoryModal
        canShow={modalOpen === "category"}
        onClose={() => setModalOpen(null)}
      />
      <ProductListModal
        canShow={selectedCategoryId !== null}
        onClose={() => setSelectedCategoryId(null)}
        products={products}
      />
      <CategoryForm />
    </div>
  );
}

export default Home;
