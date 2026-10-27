import { useEffect, useState } from "react";

import Button from "../components/Button";
import ProductModal from "../components/ProductModal";
import CategoryModal from "../components/CategoryModal";

function Home() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col gap-5 m-7 items-center">
      <h1 className="text-4xl font-semibold">Product Manager</h1>
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Button
          onClick={() => setProductModalOpen(true)}
          disabled={categories.length === 0}
        >
          New product
        </Button>
        <Button onClick={() => setCategoryModalOpen(true)}>New category</Button>
      </div>
      <ul className="grid grid-cols-2 gap-2 p-2 max-w-2xl w-full bg-surface border border-border rounded-xl transition ease-in-out hover:scale-101 hover:shadow-md">
        <h2 className="flex col-span-2 justify-center font-semibold p-2">
          Categories
        </h2>
        {categories.map((c) => (
          <li
            className="flex justify-center p-2 text-smooth-text font-semibold bg-surface border border-border rounded-md cursor-pointer transition ease-in-out hover:border-b-0 hover:scale-101 hover:shadow-md hover:text-text"
            key={c.id}
            onClick={() => setProductModalOpen(true)}
          >
            {c.name}
          </li>
        ))}
      </ul>

      <ProductModal
        canShow={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        children={ProductModal}
      />
      <CategoryModal
        canShow={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        children={CategoryModal}
      />
    </div>
  );
}

export default Home;
