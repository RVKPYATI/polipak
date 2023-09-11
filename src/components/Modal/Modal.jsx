import React, { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      const closeModalOnOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };

      document.addEventListener("click", closeModalOnOutsideClick);

      return () => {
        document.removeEventListener("click", closeModalOnOutsideClick);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg z-10">
        <div className="flex justify-end">
          <div
            className="text-gray-500 hover:text-gray-700 cursor-pointer text-2xl font-bold"
            onClick={onClose}
          >
            &times;
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export { Modal };
