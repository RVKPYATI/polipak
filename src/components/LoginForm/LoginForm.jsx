import React from "react";

const LoginForm = ({ data, handleSubmit, handleInputChange, isError }) => {
  return (
    <>
      <div
        className={`flex flex-col w-1/4 h-80 mx-auto my-44 items-center bg-white border ${
          isError.status ? " border-red-600" : ""
        } rounded-lg drop-shadow-xl`}
      >
        <h2 className="text-xl font-bold my-3">
          {isError.status ? isError.err_message : "Авторизуйтесь"}
        </h2>
        <div className="w-full border-b-2 mb-8"></div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col form-group">
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              className="w-60 h-10 px-2 border rounded outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              className="w-60 h-10 px-2 border rounded outline-none"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-1/2 h-10 mt-5 mx-auto text-white bg-green-600 hover:bg-green-700 hover:transition-all duration-500 rounded"
            onClick={handleSubmit}
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export { LoginForm };
