import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

import Image from "next/image";
import UserProfileDropdownModal from "./UserProfileDropdownModal";

import NetflixLogo from "../../assets/image-logo/Netflix-logo.svg";
import search from "../../assets/image-logo/search.svg";
import giftBox from "../../assets/image-logo/giftBox.svg";
import bell from "../../assets/image-logo/bell.svg";
import arrowDown from "../../assets/image-logo/arrowDown.svg";
import profileAvatar from "../../assets/image-logo/ProfileIMG.svg";

const NavbarMobile = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-2  flex flex-col items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="px-36 rounded-md py-2 font-normal text-base hover:bg-gray-900 text-slate-300 hover:text-white"
      >
        <a href="#" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="px-36 rounded-md py-2 font-normal text-base hover:bg-gray-900 text-slate-300 hover:text-white"
      >
        <a href="#" className="flex items-center whitespace-nowrap">
          Tv shows
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="px-36 rounded-md py-2 font-normal text-base hover:bg-gray-900 text-slate-300 hover:text-white"
      >
        <a href="#" className="flex items-center">
          Movies
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="px-36 rounded-md py-2 font-normal text-base hover:bg-gray-900 text-slate-300 hover:text-white"
      >
        <a href="#" className="flex items-center">
          Popular
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="px-36 rounded-md py-2 font-normal text-base  hover:bg-gray-900"
      >
        <a href="#" className="flex items-center whitespace-nowrap">
          My list
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className=" bg-black  max-h-[768px] w-full ">
      <Navbar className="sticky bg-black top-0 z-10 h-max max-w-full rounded-none px-4 py-4 lg:px-8 lg:py-4 border-none">
        <div className="flex items-center justify-between text-blue-gray-900 ">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <Image src={NetflixLogo} alt="Netflix Logo" className=" " />
          </Typography>

          <div className=" flex ">
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

            <div className="flex items-center  top-[-50px]">
              <div className="mr-4 hidden lg:block">{navList} accordion</div>
              <div className="flex items-center gap-x-1">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Log In</span>
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Sign in</span>
                </Button>
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </Navbar>
    </div>
  );
};

export default NavbarMobile;

// import React from "react";
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
//   Card,
// } from "@material-tailwind/react";
// import Image from "next/image";
// import NetflixLogo from "../../assets/image-logo/Netflix-logo.svg";

// const NavbarMobile = () => {
//   const [openNav, setOpenNav] = React.useState(false);

//   React.useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setOpenNav(false)
//     );
//   }, []);
//   const navList = (
//     <ul className="mt-2 mb-2 h-full flex flex-col justify-center items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
//       <Typography
//         as="li"
//         variant="small"
//         color="black"
//         className="px-36 rounded-md py-2 font-normal text-base w-full hover:bg-gray-900 text-slate-300 hover:text-white flex justify-center items-center"
//       >
//         <a href="#" className="flex items-center">
//           Home
//         </a>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="px-36 rounded-md py-2 font-normal text-base w-full hover:bg-gray-900 text-slate-300 hover:text-white flex justify-center items-center  "
//       >
//         <a href="#" className="flex items-center whitespace-nowrap">
//           Tv shows
//         </a>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="px-36 rounded-md py-2 font-normal text-base w-full hover:bg-gray-900 text-slate-300 hover:text-white flex justify-center items-center  "
//       >
//         <a href="#" className="flex items-center">
//           Movies
//         </a>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="px-36 rounded-md py-2 font-normal text-base w-full hover:bg-gray-900 text-slate-300 hover:text-white flex justify-center items-center  "
//       >
//         <a href="#" className="flex items-center">
//           Popular
//         </a>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="px-36 rounded-md py-2 font-normal text-base w-full hover:bg-gray-900 text-slate-300 hover:text-white flex justify-center items-center  "
//       >
//         <a href="#" className="flex items-center whitespace-nowrap">
//           My list
//         </a>
//       </Typography>
//     </ul>
//   );

//   return (
//     <div className=" px-3  py-3  bg-black ">
//       <Navbar className="  bg-black z-10 h-max max-w-full px-4 py-2 lg:px-8 lg:py-4 border-none ">
//         <div className="flex items-center justify-between text-blue-gray-900">
//           <Typography
//             as="a"
//             href="#"
//             className="mr-4 cursor-pointer py-1.5 font-medium"
//           >
//             <Image src={NetflixLogo} alt="Netflix Logo" className=" " />
//           </Typography>
//           <div className="flex items-center gap-4">
//             <div className="mr-4 hidden lg:block">{navList}</div>
//             <div className="flex items-center gap-x-1">
//               <Button
//                 variant="text"
//                 size="sm"
//                 className="hidden lg:inline-block"
//               >
//                 <span>Log In</span>
//               </Button>
//               <Button
//                 variant="gradient"
//                 size="sm"
//                 className="hidden lg:inline-block"
//               >
//                 <span>Sign in</span>
//               </Button>
//             </div>

//             <IconButton
//               variant="text"
//               className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//               ripple={false}
//               onClick={() => setOpenNav(!openNav)}
//             >
//               {openNav ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </IconButton>
//           </div>
//         </div>
//         <MobileNav className=" flex justify-center min-h-fit" open={openNav}>
//           {navList}
//           {/* <div className="flex items-center gap-x-1">
//             <Button fullWidth variant="text" size="sm" className="">
//               <span>Log In</span>
//             </Button>
//             <Button fullWidth variant="gradient" size="sm" className="">
//               <span>Sign in</span>
//             </Button>
//           </div> */}
//         </MobileNav>
//       </Navbar>
//     </div>
//   );
// };

// export default NavbarMobile;
