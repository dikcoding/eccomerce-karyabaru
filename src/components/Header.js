import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.svg";
import { BsBag } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[40px]">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        {/* cart dan ikon user */}
        <div className="flex items-center space-x-4">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>

          {/* Ikon user */}
          <div className="relative">
            <VscAccount
              className="text-2xl cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            />
            {showLogout && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
