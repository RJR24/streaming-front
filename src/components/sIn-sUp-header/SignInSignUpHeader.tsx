import React from "react";
import Image from "next/image";

import netflixLogo from "../../assets/image-logo/Netflix-logo.svg";

const SignInSignUpHeader = () => {
  return (
    <div className=" flex justify-between  ">
    <div className="netflix-logo  px-12 py-6">
      <Image src={netflixLogo} alt="netflix logo"></Image>
    </div>
    </div>
  );
};

export default SignInSignUpHeader;
