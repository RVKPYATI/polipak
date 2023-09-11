import React, { useState } from "react";
import { ModalApp } from "../Modal/ModalApp";
import { Modal } from "../Modal/Modal";
import { WorkOrderForm } from "../WorkOrderForm/WorkOrderForm";

export const Table = ({ data, columns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={openModal}
        className="float-right bg-green-500 text-white p-2 rounded w-12 h-12 flex items-center justify-center"
      >
        <span className="text-xl">+</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <WorkOrderForm />
      </Modal>
      <table className="table-fixed w-[1200px] divide-y divide-gray-200">
        <thead>
          <tr>
            {Object.keys(columns).map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {columns[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data &&
            data.map((item, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-200" : ""}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button>
                    <div className="flex justify-between w-[200px]">
                      <div className="text-lg font-semibold">{item.number}</div>
                      <div>
                        <ModalApp item={item} />
                      </div>
                    </div>
                  </button>
                </td>
                <td className="px-6 py-4 ">
                  {item.start_date ? item.start_date : "Нет"}
                </td>
                <td className="px-6 py-4  ">
                  {item.is_finished ? "✔️" : "❌"}
                </td>
                <td className="px-6 py-4 ">
                  {`${item.product.code} - ${item.product.name}`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
