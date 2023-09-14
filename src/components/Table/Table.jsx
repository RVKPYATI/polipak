import React, { useState } from "react";

import { Modal } from "../Modal/Modal";
import { WorOrderNew } from "../WorkOrderForm/WorOrderNew";

export const Table = ({ data, columns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <WorOrderNew item={dataModal} />
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
                  <div>
                    <div className="flex justify-between w-[200px]">
                      <div className="text-lg font-semibold">{item.number}</div>
                      <div onClick={openModal}>
                        <button onClick={() => setDataModal(item)}>✏️</button>
                      </div>
                    </div>
                  </div>
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
