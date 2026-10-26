import { useState } from "react";

import Button from "../components/Button";
import ProductModal from "../components/ProductModal";
import CategoryModal from "../components/CategoryModal";

function Home() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 m-5">
      <h1 className="text-4xl font-semibold">Product Manager</h1>
      <div className="flex gap-2">
        <Button onClick={() => setProductModalOpen(true)}>New product</Button>
        <Button onClick={() => setCategoryModalOpen(true)}>New category</Button>
      </div>

      <ProductModal
        canShow={productModalOpen}
        onClose={() => setProductModalOpen(false)}
      />
      <CategoryModal
        canShow={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
    </div>
  );
}

export default Home;
