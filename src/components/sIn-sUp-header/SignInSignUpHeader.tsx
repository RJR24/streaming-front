import React from "react";
import Image from "next/image";

import netflixLogo from "../../assets/image-logo/Netflix-logo.svg";

const SignInSignUpHeader = ({ isLoginPage }) => {
  return (
    <div className=" header w-full bg-cover bg-center py-3 px-[8%] relative ">
      <nav className=" flex items-center justify-between py-3 ">
        <Image
          src={netflixLogo}
          alt="netflix logo"
          className=" w-36 cursor-pointer"
        ></Image>

        <div>
          <a
            href={isLoginPage ? "/signup" : "login"}
            className=" border-0 outline-none bg-[#db0000de] transition-colors hover:bg-[#fc3c3c] text-white text-xs py-2 px-4 cursor-pointer ml-3 rounded"
          >
            {isLoginPage ? "Sign Up" : "Sign In"}
          </a>
        </div>
      </nav>
    </div>
  );
};

export default SignInSignUpHeader;
