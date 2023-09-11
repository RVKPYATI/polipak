import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../components/LoginForm/LoginForm";
import useFetch from "../hooks/useFetch";
import { useSession } from "../hooks/useSession";
import { authURI } from "../constants/endpoints";

export const LoginPage = ({ setIsAuth }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isError, setIsError] = useState(false);
  const { fetchData } = useFetch();
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
      const response = await fetchData(authURI, "POST", requestData);

      if (response.status === 200) {
        const tokenSession = "Token " + response.data.token;

        setSession("session", tokenSession);
        setSession("name", formData.username);
        setIsAuth(true);
        navigate("/workers");
      }
    } catch (error) {
      setIsError(true);
      console.error("Ошибка авторизации:", error);
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
