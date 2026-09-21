import { useEffect, useRef } from "react";

import { createPortal } from "react-dom";

export default function DishModal({ dish, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!dish) return;

    closeButtonRef.current?.focus();

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dish, onClose]);

  if (!dish) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="dish-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <img src={dish.image} alt={dish.name} />

        <div className="modal-content">
          <span className="dish-category">{dish.category}</span>

          <h2 id="dish-modal-title">{dish.name}</h2>

          <p>{dish.description}</p>

          <div className="modal-bottom">
            <strong>{dish.price} ETB</strong>
          </div>
        </div>
      </div>
    </div>,

    document.body,
  );
}
