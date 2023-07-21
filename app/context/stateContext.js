"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [business, setBusiness] = useState("");

    const addBusiness = (new_business) => {
        setBusiness(new_business)
    }


  

  return (
    <Context.Provider
      value={{
        business,
        addBusiness
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);