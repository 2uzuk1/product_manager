import { useState } from "react";

import Modal from "../Modal";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-semibold">Product Manager</h1>
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className="cursor-pointer py-2 px-6 bg-primary rounded-lg text-background transition hover:scale-105 hover:bg-primary/90 "
        >
          New product
        </button>
      </div>

      <Modal canShow={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default Home;
