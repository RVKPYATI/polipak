import React, { useState, useEffect } from "react";

import useFetch from "../hooks/useFetch";
import { useSession } from "../hooks/useSession";
import { workordersURI } from "../constants/endpoints";
import { ArmOrderForm } from "../components/ArmOrderForm/ArmOrderForm";
import { formatDate } from "../tools/formatDate";
import { Modal } from "../components/Modal/Modal";
import Navbar from "../components/Navbar/Navbar";
import { useMyContext } from "../DataContext";

export const ArmPage = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const { getSession } = useSession();
  const { fetchData } = useFetch();
  const token = getSession("session");
  const { dataContext, updateData } = useMyContext();

  useEffect(() => {
    const getData = async () => {
      const response = await fetchData(workordersURI, "GET", null, token);
      const dataWorkOrders = await response.data.results;
      setData(dataWorkOrders);
    };

    getData();
    updateData([]);
  }, []);

  const getDataId = async (id) => {
    try {
      const response = await fetchData(
        `${workordersURI}${id}/products/`,
        "GET",
        null,
        token
      );
      const data = await response.data;
      updateData(data);
    } catch (error) {
      console.error("Произошла ошибка", error);
    }
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    getDataId(selectedValue);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="p-5 pt-16">
        <h2 className="text-xl font-bold mb-4">
          Интерфейс оператора производственного процесса
        </h2>

        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option>Выберите Наряд-Заказ:</option>
          {data.map((item) => (
            <option
              value={item.id}
              key={item.id}
              className="hover:bg-gray-100"
              onChange={handleOptionChange}
            >
              {item.number}
            </option>
          ))}
        </select>
        <div className="flex justify-between w-[1100px] p-3">
          Список произведенной продукции по заказу-наряду
          {selectedOption ? (
            <button
              onClick={openModal}
              className="float-right bg-green-500 text-white p-2 rounded w-12 h-12 flex items-center justify-center"
            >
              <span className="text-xl">+</span>
            </button>
          ) : (
            ""
          )}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ArmOrderForm id={selectedOption} token={token} />
          </Modal>
        </div>
        {dataContext.length > 0 ? (
          <table className="w-[1100px] divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Серийный номер
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Вес, кг.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата производства
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataContext.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-200" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-semibold">{item.serial}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base">{item.weight}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base">{formatDate(item.date)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="font-bold">Нет результатов</p>
        )}
      </div>
    </>
  );
};
