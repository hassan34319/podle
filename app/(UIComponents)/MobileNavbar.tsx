"use client";
import React, { useState } from "react";
import Link from "next/link";
import {  X } from "react-feather"; // Import the Menu icon

type Props = {};

function MobileNavbar({}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <section className="flex items-center w-1/4">
      <button className="lg:hidden text-white ml-[20%]" onClick={toggleMobileMenu}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6167 7.34154C15.979 7.34154 17.0833 6.23717 17.0833 4.87487C17.0833 3.51257 15.979 2.4082 14.6167 2.4082C13.2544 2.4082 12.15 3.51257 12.15 4.87487C12.15 6.23717 13.2544 7.34154 14.6167 7.34154Z"
            fill="black"
          />
          <path
            d="M5.38332 7.34154C6.74563 7.34154 7.84999 6.23717 7.84999 4.87487C7.84999 3.51257 6.74563 2.4082 5.38332 2.4082C4.02102 2.4082 2.91666 3.51257 2.91666 4.87487C2.91666 6.23717 4.02102 7.34154 5.38332 7.34154Z"
            fill="black"
          />
          <path
            d="M14.6167 17.5915C15.979 17.5915 17.0833 16.4872 17.0833 15.1249C17.0833 13.7626 15.979 12.6582 14.6167 12.6582C13.2544 12.6582 12.15 13.7626 12.15 15.1249C12.15 16.4872 13.2544 17.5915 14.6167 17.5915Z"
            fill="black"
          />
          <path
            d="M5.38332 17.5915C6.74563 17.5915 7.84999 16.4872 7.84999 15.1249C7.84999 13.7626 6.74563 12.6582 5.38332 12.6582C4.02102 12.6582 2.91666 13.7626 2.91666 15.1249C2.91666 16.4872 4.02102 17.5915 5.38332 17.5915Z"
            fill="black"
          />
        </svg>
        {/* Use the Menu icon */}
      </button>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-[60%] h-[100vh] bg-black opacity-90 z-50 md:text-xl">
          <button
            className="text-white my-2 mt-4 ml-4 "
            onClick={closeMobileMenu}
          >
            <X />
          </button>
          <div className="flex flex-col items-center pt-16 lg:hidden">
            <Link className="text-white my-2" href="/services">
              Podcast Services
            </Link>
            <Link className="text-white my-2" href="https://medium.com/@mattystaudt">
              Blog
            </Link>
            <Link className="text-white my-2" href="/login">
              Login
            </Link>
            <Link className="text-white my-2" href="https://discord.gg/JNvtFq3p">
              Discord
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default MobileNavbar;
