import React, { useState, useEffect } from "react";

import { Modal } from "./Modal";
import useFetch from "../../hooks/useFetch";
import { useSession } from "../../hooks/useSession";
import { nomenclaturesURI, workordersURI } from "../../constants/endpoints";

function ModalApp({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataNomenclatures, setDataNomenclatures] = useState([]);
  const [flag, setFlag] = useState(false);
  const { getSession } = useSession();
  const { fetchData } = useFetch();
  const token = getSession("session");

  const [formData, setFormData] = useState({
    number: item.number,
    start_date: item.start_date,
    is_finished: item.is_finished,
    material: {
      material_code: item.material.code,
      material_name: item.material.name,
    },
    product: {
      product_code: item.product.code,
      product_name: item.product.name,
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getnomenclatures = async () => {
      const newData = await fetchData(nomenclaturesURI, "GET", null, token);
      setDataNomenclatures(newData.data.results);
    };
    getnomenclatures();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "material") {
      setFormData((prevData) => ({
        ...prevData,
        material: {
          ...formData.material,
        },
      }));
    } else {
      // Если поле не относится к материалу, обновляем его как обычно
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchData(
        `${workordersURI}${item.id}/`,
        "PATCH",
        null,
        token
      );

      console.log("Данные успешно сохранены", response.data);
      setFlag(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div onClick={openModal}>✏️</div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form action="">
          <table className="table-fixed w-[1000px] text-left">
            <tbody>
              <tr>
                <td className="border px-4 py-2">ID</td>
                <td className="border px-4 py-2">{item.id}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Номер</td>
                <td className="border px-4 py-2">
                  <input
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
                    value={
                      formData.start_date ? formData.start_date : undefined
                    }
                    name="start_date"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Завершен</td>
                <td className="border px-4 py-2">
                  <select
                    name="is_finished"
                    value={formData.is_finished}
                    onChange={handleChange}
                  >
                    <option value="true">✔️</option>
                    <option value="false">❌</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Сырье</td>
                <td className="border px-4 py-2">
                  <select name="material" onChange={handleChange}>
                    <option
                      name="mat"
                      value={
                        formData.material.material_code +
                        formData.material.material_name
                      }
                    >{`${formData.material.material_code} - ${formData.material.material_name}`}</option>
                    {dataNomenclatures.map((item, i) => (
                      <option
                        key={i}
                        value={`${item.code} - ${item.name}`}
                      >{`${item.code} - ${item.name}`}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Продукция</td>
                <td className="border px-4 py-2">
                  <select name="product" onChange={handleChange}>
                    <option
                      name="mat"
                      value={
                        formData.product.product_code +
                        formData.product.product_name
                      }
                    >{`${formData.product.product_code} - ${formData.product.product_name}`}</option>
                    {dataNomenclatures.map((item, i) => (
                      <option
                        key={i}
                        value={`${item.code} - ${item.name}`}
                      >{`${item.code} - ${item.name}`}</option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded"
            >
              Сохранить
            </button>
            <div>{flag ? "Данные успешно сохранены" : ""}</div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export { ModalApp };
