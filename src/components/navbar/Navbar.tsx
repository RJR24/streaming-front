import React, { useState } from "react";
import Image from "next/image";
import UserProfileDropdownModal from "./UserProfileDropdownModal";

import NetflixLogo from "../../assets/image-logo/Netflix-logo.svg";
import search from "../../assets/image-logo/search.svg";
import giftBox from "../../assets/image-logo/giftBox.svg";
import bell from "../../assets/image-logo/bell.svg";
import arrowDown from "../../assets/image-logo/arrowDown.svg";
import profileAvatar from "../../assets/image-logo/ProfileIMG.svg";
import Script from "next/script";

const Navbar: React.FC = () => {
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const handleMenuClick = () => {
    setIsMenuClicked(!isMenuClicked);
  };
  return (
    <>
      <nav className=" navbar-desktop-view px-6 py-4 md:px-10 md:py-6 bg-black text-slate-100 max border-gray-200 ">
        <div className="flex justify-between">
          <div className="container mx-auto flex min-w-0 items-center gap-12">
            <Image src={NetflixLogo} alt="Netflix Logo" />

            <div
              className="navbar-left w-auto  text-slate-100"
              id="mobile-menu"
            >
              <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium text-slate-100">
                <li>
                  <a
                    href="#"
                    className="bg-blue-700 md:bg-transparent block pl-3 pr-4 py-2 text-gray-500 md:hover:text-gray-400 md:p-0 rounded focus:outline-none"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 whitespace-nowrap hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    TV Shows
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    Movies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    Popular
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 whitespace-nowrap hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    My List
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="navbar-right relative flex items-center gap-4">
            <div className="navbar-right-items flex justify-center items-center gap-5">
              <div>
                <Image
                  src={search}
                  alt="search"
                  width={20}
                  className=" min-w-5 "
                />
              </div>
              <div>Kids</div>
              <div className=" w-5">
                <Image src={giftBox} alt="gift Box" className=" min-w-5 " />
              </div>
              <div className=" w-5">
                <Image src={bell} alt="bell" className=" min-w-5 " />
              </div>
              <div
                className="user-avatar flex items-center gap-2"
                onMouseEnter={() => setIsUserDropdownVisible(true)}
                onMouseLeave={() => setIsUserDropdownVisible(false)}
              >
                <Image
                  src={profileAvatar}
                  alt="profile avatar"
                  className=" w-8 object-contain min-w-8"
                />
                <Image
                  src={arrowDown}
                  alt="arrow Down"
                  className=" w-5 object-contain"
                />
                <div className="User-DropdownModal">
                  <UserProfileDropdownModal isVisible={isUserDropdownVisible} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="navbar-mobile-view md:hidden px-4 py-4 md:px-10 md:py-6 bg-black text-slate-100 max border-gray-200 ">
        <div className="flex justify-between">
          <div className="container mx-auto flex min-w-0 items-center gap-12">
            <Image
              src={NetflixLogo}
              alt="Netflix Logo"
              className={`${isMenuClicked ? "hidden" : ""}`}
            />
          </div>

          <div
            className={`${
              isMenuClicked ? "hidden" : "navbar-right"
            } relative flex items-center gap-5`}
          >
            <div>
              <Image src={search} alt="search" width={20} />
            </div>
            <div>Kids</div>
            <div className="w-5">
              <Image src={giftBox} alt="gift Box" />
            </div>
            <div className="w-5">
              <Image src={bell} alt="bell" />
            </div>
            <div
              className="user-avatar flex items-center gap-2"
              onMouseEnter={() => setIsUserDropdownVisible(true)}
              onMouseLeave={() => setIsUserDropdownVisible(false)}
            >
              <Image
                src={profileAvatar}
                alt="profile avatar"
                className="w-8 object-contain"
              />
              <Image
                src={arrowDown}
                alt="arrow Down"
                className="w-5 object-contain"
              />
              <div className="User-DropdownModal">
                <UserProfileDropdownModal isVisible={isUserDropdownVisible} />
              </div>
            </div>
          </div>

          <div className="menu ml-5 flex align-items-center ">
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isMenuClicked}
              onClick={handleMenuClick}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 transition-transform ${
                  isMenuClicked ? "rotate-0" : "rotate-180"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className={`${
                isMenuClicked ? "block" : "hidden"
              } navbar-left w-auto text-slate-100 mt-2`}
              id="mobile-menu"
            >
              <ul className="flex-col md:flex-row md:space-x-8 md:text-sm md:font-medium text-slate-100">
                <li>
                  <a
                    href="#"
                    className="bg-blue-700 md:bg-transparent block pl-3 pr-4 py-2 text-gray-500 md:hover:text-gray-400 md:p-0 rounded focus:outline-none"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 whitespace-nowrap hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    TV Shows
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    Movies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    Popular
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 whitespace-nowrap hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    My List
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Script src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></Script>
    </>
  );
};

export default Navbar;
