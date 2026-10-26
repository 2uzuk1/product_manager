import Button from "./Button";
import ModalBase from "./ModalBase";

const ModalCategory = ({ canShow, onClose, onSave }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <ModalBase canShow={canShow} onClose={onClose} title="New Product">
      <form onClick={handleSubmit} className="flex flex-col gap-7">
        <label>
          Category name:
          <input type="text" />
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="save">Save</Button>
          <Button variant="cancel">Cancel</Button>
        </div>
      </form>
    </ModalBase>
  );
};

export default ModalCategory;
