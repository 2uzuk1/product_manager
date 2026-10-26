import Button from "./Button";
import ModalBase from "./ModalBase";

const ProductModal = ({ canShow, onClose, onSave }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ModalBase canShow={canShow} onClose={onClose} title="New category">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <label>
          Product:
          <input type="text" />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" min="0" />
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="save" type="submit">
            Save
          </Button>
          <Button variant="cancel" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </ModalBase>
  );
};

export default ProductModal;
