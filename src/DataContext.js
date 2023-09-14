// MyContext.js
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [dataContext, setData] = useState([]);

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <MyContext.Provider value={{ dataContext, updateData }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
