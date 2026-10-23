const Modal = ({ canShow, onClose }) => {
  if (canShow) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
        <div className="flex flex-col w-full max-w-md rounded-xl bg-surface p-6 shadow-xl gap-6">
          <div className="flex items-center justify-between">
            <h2 className="flex text-lg font-semibold">New product</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="hover:text-out cursor-pointer"
            >
              &#10006;
            </button>
          </div>
          <form>
            <label>
              Product:
              <input type="text" />
            </label>
            <label>
              Quantity:
              <input type="number" name="quantity" />
            </label>
          </form>
        </div>
      </div>
    );
  }
};

export default Modal;
