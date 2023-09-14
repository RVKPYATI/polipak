import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Table } from "../Table/Table";
import useFetch from "../../hooks/useFetch";
import { useSession } from "../../hooks/useSession";
import { workordersURI } from "../../constants/endpoints";
import Navbar from "../Navbar/Navbar";
import { Modal } from "../Modal/Modal";
import { WorkOrderForm } from "../WorkOrderForm/WorkOrderForm";

export const Workers = () => {
  const [data, setData] = useState([]);
  const { getSession } = useSession();
  const { fetchData } = useFetch();
  const columns = {
    number: "Номер",
    date: "Дата начала, план",
    is_finished: "Завершен",
    products: "Продукция",
  };
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [page, setPage] = useState(1);
  const [pageCounts, setPageCounts] = useState();

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSelectedOption(`?page=${newPage}`);
  };

  const handleOptionChange = (e) => {
    if (e.target.value === "2") {
      setSelectedOption("?is_finished=true");
    } else setSelectedOption("");
  };
  const handleInputChange = ({ target }) => {
    setQuery(target.value);
  };

  const handleSearch = () => {
    setSelectedOption(`?search=${query}`);
    setQuery("");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    try {
      const getData = async () => {
        const token = getSession("session");

        const newData = await fetchData(
          workordersURI + selectedOption,
          "GET",
          null,
          token
        );

        const results = await newData.data.results;
        setPageCounts(newData.data.count);
        setData(results);
      };
      getData();
    } catch (error) {
      console.error("Произошла ошибка при получении данных", error);
    }
  }, [selectedOption, page]);

  return (
    <>
      <Navbar />
      <div className="p-5 pt-16 w-[1240px]">
        <h1 className="text-xl mb-5 font-bold">
          Список нарядов на производство
        </h1>
        <div className="flex gap-2 mb-3">
          <div>
            <input
              className="border-2 p-2 mr-2 rounded"
              type="text"
              placeholder="Введите запрос"
              value={query}
              onChange={handleInputChange}
            />
            <button
              className="border-2 p-2 bg-green-500 text-white rounded-md"
              onClick={handleSearch}
            >
              Поиск
            </button>
          </div>
          <Link
            to="/arm"
            className="border-2 p-1 bg-orange-500 text-white ml-10 rounded-md"
          >
            АРМ ООП
          </Link>
        </div>
        <div>Фильтр:</div>
        <select
          onChange={handleOptionChange}
          className="p-2 border border-gray-300 rounded w-48 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="1">Все</option>
          <option value="2">Завершен</option>
        </select>
        <button
          onClick={openModal}
          className="float-right bg-green-500 text-white p-2 rounded w-12 h-12 flex items-center justify-center"
        >
          <span className="text-xl">+</span>
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <WorkOrderForm />
        </Modal>
        <Table data={data} columns={columns} />
        <div className="flex justify-center gap-2 items-center">
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            {"<< Назад"}
          </button>
          <div>{`Страница ${page} из ${Math.floor(pageCounts / 10 + 1)}`}</div>
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === Math.floor(pageCounts / 10 + 1)}
          >
            {"Вперед >>"}
          </button>
        </div>
      </div>
    </>
  );
};
