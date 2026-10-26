import Button from "./Button";

const ModalCategory = ({ canShow, onClose }) => {
  if (canShow) {
    return (
      <div className="modal-overlay">
        <div className="modal-card"></div>
      </div>
    );
  }
};

export default ModalCategory;
