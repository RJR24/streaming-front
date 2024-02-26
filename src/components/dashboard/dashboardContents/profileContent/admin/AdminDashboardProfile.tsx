import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Swal from "sweetalert2";
import axios from "axios";

import UserInfoModal from "../../../../UserInfoModal";

const AdminDashboardProfile = () => {
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Show a confirmation message
      const confirmResult = await Swal.fire({
        icon: "question",
        title: "Confirm Logout",
        text: "Are you sure you want to log out?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
      });

      // If the user confirms the logout, proceed with the logout request
      if (confirmResult.isConfirmed) {
        const authToken = localStorage.getItem("x-auth-token");

        // Make a request to logout endpoint
        await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/logout`, null, {
          headers: {
            "x-auth-token": authToken,
          },
        });

        // Redirect to login
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleEditPersonalInfoClick = () => {
    //  Toggle visibility of UserInfoModal
    setShowUserInfoModal(!showUserInfoModal);
  };

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const authToken = localStorage.getItem("x-auth-token");

        if (!authToken) {
          // Token is not provided, redirect to login
          router.push("/login");
          return;
        }

        // Make a request to get user information, including isAdmin
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/profile`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          }
        );

        const user = response.data.data;
        console.log(
          "🚀 ~ file: UserDashboard.tsx:73 ~ checkUserRole ~ user:",
          user
        );

        // Set user data in state
        setUserName(user.name);
        setUserEmail(user.email);
      } catch (error) {
        console.error("Error checking user role:", error);

        // Token is not valid, redirect to login
        router.push("/login");
      }
    };

    // Call the function to check user role
    checkUserRole();

    // Set activeContent after checking user role
  }, [router]);

  return (
    <div>
      <div>
        <Head>
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

          <style>
            {
              `:root { font-family: 'Inter', sans-serif; }
            @supports (font-variation-settings: normal) {
              :root { font-family: 'Inter var', sans-serif; }
            }` as any
            }
          </style>
        </Head>

        <div className="BgImage antialiased bg-black bg-opacity-80 w-full min-h-screen text-slate-300 relative py-4">
          <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
              <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
                Dashboard<span className="text-indigo-400">.</span>
              </h1>
              <p className="text-slate-400 text-sm mb-2">Welcome</p>
              <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
                <div>
                  <Image
                    className="rounded-full w-10 h-10 relative object-cover"
                    src="https://Image.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1800&t=st=1669749937~exp=1669750537~hmac=4c5ab249387d44d91df18065e1e33956daab805bee4638c7fdbf83c73d62f125"
                    alt=""
                    height={32}
                    width={32}
                  ></Image>
                </div>
                <div>
                  <p className="font-medium group-hover:text-indigo-400 leading-4">
                    {userName}
                  </p>
                  <span className="text-xs text-slate-400"></span>
                </div>
              </div>
              <hr className="my-2 border-slate-700"></hr>
              <div id="menu" className="flex flex-col space-y-2 my-5">
                <Link
                  href="/home"
                  className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                >
                  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:text-indigo-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                        Home
                      </p>
                      <p className="text-slate-400 text-sm hidden md:block">
                        Home page
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href={"/admin/categories"}
                  className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group cursor-pointer"
                  // onClick={() => handleMenuClick("dashboard")}
                >
                  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:text-indigo-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 4h6l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h4l2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                        Categories
                      </p>
                      <p className="text-slate-400 text-sm hidden md:block">
                        Data overview
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/admin/profile"}
                  className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                  // onClick={() => handleMenuClick("profile")}
                >
                  <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:text-indigo-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                        Profile
                      </p>
                      <p className="text-slate-400 text-sm hidden md:block">
                        Edit profile
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/admin/usersManagement"}
                  className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                >
                  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:text-indigo-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                        Users
                      </p>
                      <p className="text-slate-400 text-sm hidden md:block">
                        Manage users
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group cursor-pointer">
                  <div
                    className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center"
                    onClick={handleLogout}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:text-indigo-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                        Logout
                      </p>
                      <p className="text-slate-400 text-sm hidden md:block">
                        User logout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-center text-gray-600">
                v1.0.0 | &copy; 2024 Kaveh RezaeiJAmi
              </p>
            </div>

            <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
              <div id="24h">
                <h1 className="font-bold py-4 uppercase">
                  Account Information
                </h1>
                <div
                  id="stats"
                  className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <div className="bg-black/60 hover:bg-white/10  to-white/5 p-6 rounded-lg">
                    <div className="flex flex-row space-x-4 items-center">
                      <div id="stats-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-10 h-10 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-indigo-400 font-bold text-xl inline-flex items-center space-x-2">
                          <span>{userName}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/60 hover:bg-white/10  p-6 rounded-lg">
                    <div className="flex flex-row space-x-4 items-center">
                      <div id="stats-1"></div>
                      <div>
                        <p className="text-indigo-400 font-bold text-xl inline-flex items-center space-x-2">
                          <span>{userEmail}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="profile">
                <h1 className="font-bold py-4 uppercase"></h1>
                <div
                  id="stats"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  <div className="email-password bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className=" p-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="32"
                          width="36"
                          viewBox="0 0 576 512"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                          />
                        </svg>
                      </div>
                      <div className="p-2">
                        <p className="text-xl font-bold">
                          Change Email and Password
                        </p>
                        <p className="text-gray-500 font-medium">last change</p>
                        <p className="text-gray-500 text-sm">12 Jan 2024</p>
                      </div>
                    </div>

                    <div className="flex  gap-10 border-t border-white/5 p-4 ">
                      <Link
                        // show reset password page
                        href="/resetPassword"
                        className="hover:text-indigo-400"
                      >
                        password
                      </Link>

                      <Link
                        // show email change page
                        href="/changeEmail"
                        className="hover:text-indigo-400"
                      >
                        email
                      </Link>
                    </div>
                  </div>

                  <div className="personal-info  bg-black/60 hover:bg-white/10  to-white/5 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className=" p-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="32"
                          width="36"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="white"
                            d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l44.9 74.7c-16.1 17.6-28.6 38.5-36.6 61.5c-1.9-1.8-3.5-3.9-4.9-6.3L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 240a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0-192c-8.8 0-16 7.2-16 16v80c0 8.8 7.2 16 16 16s16-7.2 16-16V288c0-8.8-7.2-16-16-16z"
                          />
                        </svg>
                      </div>
                      <div className="p-2">
                        <p className="text-xl font-bold">
                          Personal Information
                        </p>
                        <p className="text-gray-500 font-medium">{userName}</p>
                        <p className="text-gray-500 text-sm">23 Nov 2023</p>
                      </div>
                    </div>
                    <div className="border-t border-white/5 p-4">
                      <button
                        className="inline-flex space-x-2 items-center text-center"
                        onClick={handleEditPersonalInfoClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                        <span className="hover:text-indigo-400">
                          click to edit
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {/*Render UserInfoModal when showUserInfoModal is true */}
                {showUserInfoModal && (
                  <UserInfoModal
                    onClose={() => setShowUserInfoModal(false)}
                    user={{
                      name: userName,
                      dateOfBirth: null,
                      phoneNumber: null,
                      address: null,
                    }}
                    userId={userId}
                  />
                )}
              </div>
              <div id="last-24-login">
                <h1 className="font-bold py-4 uppercase">Last 24h Logins</h1>
                <div className="overflow-x-scroll">
                  <table className="w-full whitespace-nowrap">
                    <thead className="bg-black/60">
                      <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                      <th className="text-left py-3 px-2">Email</th>
                      <th className="text-left py-3 px-2">Admin</th>
                      <th className="text-left py-3 px-2">Login on</th>
                    </thead>

                    <tr
                      key={0}
                      className="border-b hover:bg-white/10 border-gray-700"
                    >
                      <td className="py-3 px-2 font-bold">
                        <div className="inline-flex space-x-3 items-center">
                          <span></span>
                          <span>{userName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">{userEmail}</td>
                      <td className="py-3 px-2">✅Yes</td>
                      <td className="py-3 px-2">2024/01/12 13:47pm</td>
                    </tr>
                    <tr
                      key={1}
                      className="border-b hover:bg-white/10 border-gray-700"
                    >
                      <td className="py-3 px-2 font-bold">
                        <div className="inline-flex space-x-3 items-center">
                          <span></span>
                          <span>{userName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">{userEmail}</td>
                      <td className="py-3 px-2">✅Yes</td>
                      <td className="py-3 px-2">2024/01/12 10:03am</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProfile;
