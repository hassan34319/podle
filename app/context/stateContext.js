"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategory, putSelectedCategory] = useState("Podcast Production Companies");
  const [selectedPage, putSelectedPage] = useState(1)
    const addBusiness = (new_business) => {
        setBusiness(new_business)
    }
    const addEmail = (new_email) => {
        setEmail(new_email)
    }
    const setSelectedCategory = (text) => {
      putSelectedCategory(text)
    }
    const setSelectedPage = (num) => {
      putSelectedPage(num)
    }
    


  

  return (
    <Context.Provider
      value={{
        business,
        addBusiness,
        email,
        addEmail,
        selectedCategory,
        setSelectedCategory,
        selectedPage,
        setSelectedPage
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);