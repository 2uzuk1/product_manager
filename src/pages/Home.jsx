import { useState } from "react";

import Button from "../components/Button";
import ProductModal from "../components/ProductModal";
import CategoryModal from "../components/CategoryModal";

function Home() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([1]);

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

      <ul className="grid grid-cols-[0.5fr_4fr_1fr_1fr] py-2 max-w-4xl w-full border border-border rounded-xl">
        <li>ID</li>
        <li>Product Name</li>
        <li className="text-right">Quantity</li>
        <li>Action</li>
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
