const ModalBase = ({ canShow, onClose, title, children }) => {
  if (!canShow) return null;
  return (
    <div className="modal-overlay">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal-card"
      >
        <div className="flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-smooth-text hover:text-red-600 cursor-pointer"
          >
            &#10006;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
