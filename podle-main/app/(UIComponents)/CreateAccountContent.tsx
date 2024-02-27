"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { inter } from "../utils/inter";
import Logo from "./Logo";
type Props = {
  email: string;
  password: string;
  phone: string;
  username: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPhone: (phone: string) => void;
  setUsername: (username: string) => void;
  signUpService: boolean;
  setSignUpService: (signUp: boolean) => void;
  handleSubmitLogin?: () => void;
  handleSubmitService?: () => void;
  error: boolean;
};

function CreateAccountContent({
  error,
  email,
  password,
  setEmail,
  setPassword,
  username,
  setUsername,
  phone,
  setPhone,
  signUpService,
  setSignUpService,
  handleSubmitLogin,
  handleSubmitService,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });

  const validateEmail = (input: string): boolean => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(input);
  };

  const validatePassword = (input: string): boolean => {
    // Password validation (at least 8 characters)
    return input.length >= 8;
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      username: "",
      phone: "",
    };

    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password || !validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return; // Prevent submission if there are validation errors
    }
    if (signUpService) {
      setLoading(true);
      if (handleSubmitService) {
        const res = await handleSubmitService();
      }
      setLoading(false);
    } else {
      setLoading(true);
      if (handleSubmitLogin) {
        const res2 = await handleSubmitLogin();
      }
      setLoading(false);
    }
  };

  return (
    <div className="md:col-span-6 order-2 md:order-1">
      {/* Logo */}
      <div className="ml-14 mt-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* Main Content */}
      <div className="md:mt-[12vh] flex flex-col lg:mx-[25%] w-[90%] mx-auto md:w-[80%] lg:w-[50%]">
        <h1 className="font-bold text-3xl text-start">Sign Up To Podle.</h1>
        <p className="font-medium my-[3vh]">
          Sign Up to explore or provide Podle’s network of verified podcasting
          services.
        </p>
        {/* Input Feilds */}
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mb-3">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="Email Address *"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mb-3">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="Username *"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mb-3">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="Phone Number *"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mb-2">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="Password *"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        {error && <p className="text-red-500 text-lg">Email Already exists.</p>}
        {/* Button Login */}
        <div className={` ${inter.className} mt-[3vh]`}>
          <button
            onClick={handleSubmit}
            className={`bg-black text-white font-medium   py-4 w-full px-20 `}
          >
            {loading ? "Loading" : "Sign Up"}
          </button>
        </div>
        {/* Link Signup */}
        <div
          className={`  ${inter.className} mt-[2vh] md:text-start md:items-start items-center text-center`}
        >
          <span className="font-medium md:text-start text-center">
            Already have an account?{"   "}
          </span>
          <Link href="/login" className="font-bold text-[#16A235] ml-1">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountContent;
