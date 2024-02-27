"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [business, setBusiness] = useState({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    logo: {
      _type: 'image',
      asset: {
        _ref: "", // Initial reference to the uploaded image asset
      },
    },
  });
  const [email, setEmail] = useState("");
  const [selectedCategory, putSelectedCategory] = useState("");
  const [searchTitle, putSearchTitle] =useState("")
  const [searchLocation, putSearchLocation] = useState("")
  const [selectedPage, putSelectedPage] = useState(1)
  const [samplePage, putSamplePage] = useState(1)
  const [selectedArrow, putSelectedArrow] = useState("")
    const addBusiness = (new_business) => {
        setBusiness(new_business)
    }
    const addEmail = (new_email) => {
        setEmail(new_email)
    }
    const setSelectedCategory = (text) => {
      putSelectedCategory(text)
    }
    const setSearchLocation = (text) => {
      putSearchLocation(text)
    }
    const setSearchTitle = (text) => {
      putSearchTitle(text)
    }
    const setSelectedPage = (num) => {
      putSelectedPage(num)
    }
    const setSelectedArrow = (text) => {
      putSelectedArrow(text)
    }

    const setSamplePage = (num) => {
      putSamplePage(num)
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
        setSelectedPage,
        setSamplePage,
        setSelectedArrow,
        samplePage,
        selectedArrow,
        searchLocation,
        searchTitle,
        setSearchLocation,
        setSearchTitle
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);