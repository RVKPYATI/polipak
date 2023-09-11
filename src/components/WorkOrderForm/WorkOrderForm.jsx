import React, { useState, useEffect } from "react";

import useFetch from "../../hooks/useFetch";
import { useSession } from "../../hooks/useSession";
import { nomenclaturesURI, workordersURI } from "../../constants/endpoints";

export const WorkOrderForm = () => {
  const [dataNomenclatures, setDataNomenclatures] = useState([]);
  const [flag, setFlag] = useState(false);
  const { getSession } = useSession();
  const { fetchData } = useFetch();
  const token = getSession("session");

  const [formData, setFormData] = useState({
    number: "",
    start_date: undefined,
    is_finished: false,
    material: {
      material_code: "",
      material_name: "",
    },
    product: {
      product_code: "",
      product_name: "",
    },
  });

  useEffect(() => {
    const getnomenclatures = async () => {
      const newData = await fetchData(nomenclaturesURI, "GET", null, token);
      setDataNomenclatures(newData.data.results);
    };
    getnomenclatures();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "is_finished") {
      setFormData((prevData) => ({
        ...prevData,
        is_finished: !prevData.is_finished,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchData(workordersURI, "POST", formData, token);

      setFlag(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action="">
      <table className="table-fixed w-[1000px] text-left">
        <tbody>
          <tr>
            <td className="border px-4 py-2">
              Номер <strong className="text-xs">*</strong>
            </td>
            <td className="border px-4 py-2">
              <input
                required
                className="border-2"
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Дата начала, план</td>
            <td className="border px-4 py-2">
              <input
                className="border-2"
                type="date"
                value={formData.start_date}
                name="start_date"
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2">
              Сырье <strong className="text-xs">*</strong>
            </td>
            <td className="border px-4 py-2">
              <select required name="material" onChange={handleChange}>
                <option value="">Выбрать</option>
                {dataNomenclatures.map((item, i) => (
                  <option
                    key={i}
                    value={item.id}
                  >{`${item.code} - ${item.name}`}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Продукция <strong className="text-xs">*</strong>
            </td>
            <td className="border px-4 py-2">
              <select required name="product" onChange={handleChange}>
                <option value="">Выбрать</option>
                {dataNomenclatures.map((item, i) => (
                  <option
                    key={i}
                    value={item.id}
                  >{`${item.code} - ${item.name}`}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Завершен</td>
            <td className="border px-4 py-2">
              <input
                type="checkbox"
                onChange={handleChange}
                name="is_finished"
                id=""
                checked={formData.is_finished}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded"
          disabled={formData.number === ""}
        >
          Сохранить
        </button>
        {flag ? (
          <div className="text-green-500 mt-2">Данные успешно сохранены</div>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};
