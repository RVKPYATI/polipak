import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { workordersURI } from "../../constants/endpoints";
import useFetch from "../../hooks/useFetch";
import PrintLabel from "../PrintLabel/PrintLabel";
import { useMyContext } from "../../DataContext";

export const ArmOrderForm = ({ id, token }) => {
  const { fetchData } = useFetch();
  const componentRef = useRef(null);
  const [currentWorkOrder, setCurrentWorkOrder] = useState("");
  const [flag, setFlag] = useState(false);

  const [dataForPrint, setDataForPrint] = useState({});
  const [formData, setFormData] = useState({
    weight: "",
  });

  const { dataContext, updateData } = useMyContext();

  useEffect(() => {
    try {
      const getCurrentWorkOrder = async () => {
        const newData = await fetchData(
          `${workordersURI}${id}/`,
          "GET",
          null,
          token
        );
        setCurrentWorkOrder(newData.data.number);
      };
      getCurrentWorkOrder();
    } catch (error) {
      console.error("Произошла ошибка", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        `${workordersURI}${id}/products/`,
        "POST",
        formData,
        token
      );

      updateData([...dataContext, response.data]);
      setDataForPrint({
        response: response.data,
        currentWorkOrder,
      });
      setFlag(true);
    } catch (error) {
      console.error("Произошла ошибка при отправке", error);
      setFlag(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Этикетка",
  });

  return (
    <form action="">
      <div className="w-[1000px] bg-gray-100 p-4 rounded-lg shadow-lg">
        <div className="text-2xl font-semibold mb-4">Наряд-Заказ</div>
        <div className="mb-2">
          Текущий заказ:{" "}
          <span className="font-semibold">{currentWorkOrder}</span>
        </div>
        <div className="mb-2">Добавить продукт:</div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Введите вес, кг
          </label>
          <input
            onChange={handleChange}
            name="weight"
            value={formData.weight}
            type="text"
            className="shadow appearance-none border rounded w-50% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-md"
        >
          Сохранить
        </button>
        {flag && (
          <button
            onClick={handlePrint}
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold ml-3 py-2 px-4 rounded hover:shadow-md"
          >
            Печать этикетки
          </button>
        )}
      </div>
      <div>
        {flag ? (
          <>
            <div className="text-green-500 mt-2">Данные успешно сохранены</div>
            <PrintLabel ref={componentRef} dataForPrint={dataForPrint} />
          </>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};
