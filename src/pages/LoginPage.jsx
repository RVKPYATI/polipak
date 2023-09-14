import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LoginForm } from "../components/LoginForm/LoginForm";
import { useSession } from "../hooks/useSession";
import { authURI } from "../constants/endpoints";

export const LoginPage = ({ setIsAuth }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isError, setIsError] = useState({ status: false, err_message: "" });
  const { setSession } = useSession();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await axios.post(authURI, requestData);

      if (response && response.status === 200) {
        const tokenSession = "Token " + response.data.token;
        setSession("session", tokenSession);
        setSession("name", formData.username);
        setIsAuth(true);
        navigate("/workers");
      } else {
        console.error("Ошибка:", response.status);
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        // Обработка ошибки "сервер недоступен"
        setIsError({ status: true, err_message: "Сервер недоступен" });
        console.error(
          "Сервер недоступен. Проверьте ваше подключение к интернету."
        );
      } else if (error.response && error.response.status === 400) {
        setIsError({ status: true, err_message: "Неверные учетные данные" });
        console.error("Ошибка 400. Неверный запрос.");
      } else {
        // Обработка других ошибок
        setIsError(true);
        console.error("Ошибка:", error.message);
      }
    }
  };

  return (
    <div className="login-form">
      <LoginForm
        data={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isError={isError}
      />
    </div>
  );
};
