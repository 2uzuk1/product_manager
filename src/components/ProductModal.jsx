import Button from "./Button";

const ProductModal = ({ canShow, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (!canShow) return null;
  return (
    <div className="modal-overlay">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="modal-card"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold" id="product-modal-title">
            New product
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-smooth-text hover:text-red-600 cursor-pointer"
          >
            &#10006;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <label>
            Product:
            <input type="text" />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" />
          </label>
          <div className="flex flex-row justify-end gap-2">
            <Button variant="save" type="submit">
              Save
            </Button>
            <Button variant="cancel" type="button" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
