import Button from "./Button";
import ModalBase from "./ModalBase";

const ProductListModal = ({ canShow, onClose, products }) => {
  return (
    <ModalBase canShow={canShow} onClose={onClose} title="Product List">
      <ul className="flex flex-col gap-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex flex-col rounded-xl p-2 gap-2 bg-surface text-smooth-text border border-border transition hover:scale-101 hover:shadow-md"
          >
            <h2 className="font-bold">{p.name}</h2>
            {p.description !== null && (
              <div className="flex flex-col">
                <span>Description:</span>
                <span className="border border-border p-2 rounded-md bg-surface text-text">
                  {p.description}
                </span>
              </div>
            )}
            <span className="rounded-md bg-surface text-text">
              Quantity: {p.quantity}
            </span>
            {p.price === null ? (
              "Price not defined"
            ) : (
              <span className="rounded-md bg-surface text-text">
                Price: {p.price}JPY
              </span>
            )}
          </li>
        ))}
      </ul>
    </ModalBase>
  );
};

export default ProductListModal;
