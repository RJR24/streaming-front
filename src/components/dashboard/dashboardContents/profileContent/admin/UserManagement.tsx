import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Swal from "sweetalert2";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  suspended?: boolean;
}

const UsersManagement = () => {
  const [activeContent, setActiveContent] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
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
        setEmail(user.email);
      } catch (error) {
        console.error("Error checking user role:", error);

        // Token is not valid, redirect to login
        router.push("/login");
      }
    };

    // Call the function to check user role
    checkUserRole();

    // Set activeContent after checking user role
    setActiveContent("dashboard");
  }, [router]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) {
        console.error("Access denied. No token provided.");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/usersList`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setUsers(response.data.users);
      console.log("Users from the database:", response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const suspendUser = (userId: string) => {
    console.log("🚀 ~ suspendUser ~ userId:", userId);
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        users.find((user) => user._id === userId)?.suspended
          ? "Reactivate"
          : "Suspend"
      } the user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (users.find((user) => user._id === userId)?.suspended) {
          confirmReactivate(userId);
        } else {
          confirmSuspension(userId);
        }
      }
    });
  };

  const confirmSuspension = async (userId: string) => {
    if (!userId) {
      console.error("Access denied. No userId provided.");
      return;
    }
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) {
        console.error("Access denied. No token provided.");
        return;
      }

      if (!userId) {
        console.error("Access denied. No userId provided.");
        return;
      }

      console.log("Token:", token);
      console.log("Selected User ID:", userId);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/suspendUser/${userId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      Swal.fire("User Suspended!", "", "success");

      // Refresh the users list after suspending the user
      fetchUsers();
    } catch (error) {
      console.error("Error suspending user:", error);
      Swal.fire("Error", "Failed to suspend user", "error");
    }
  };

  const confirmReactivate = async (userId: string) => {
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) {
        console.error("Access denied. No token provided.");
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/reactivateUser/${userId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      Swal.fire("User Reactivated!", "", "success");

      // Refresh the users list after Reactivating the user
      fetchUsers();
    } catch (error) {
      console.error("Error Reactivating user:", error);
      Swal.fire("Error", "Failed to reactivate user", "error");
    }
  };

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
            <div
              id="menu"
              className="bg-white/10 col-span-3 rounded-lg p2 md:p-4 "
            >
              <h1 className="font-bold text-base lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
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
                  href="/admin/usersManagement"
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
                <div className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 cursor-pointer items-center" onClick={handleLogout}>
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

            <div className="bg-white/10 col-span-9 rounded-lg p-6">
              <div className="overflow-hidden">
                <h1 className="text-3xl font-bold mb-6">Users Management</h1>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold mb-4">Users List</h2>
                  <table className="w-full whitespace-nowrap">
                    <thead className="bg-black/60">
                      <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                      <th className="text-left py-3 px-2">Email</th>
                      <th className="text-left py-3 px-2">Admin</th>
                      <th className="text-left py-3 px-2 rounded-r-lg">
                        Actions
                      </th>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="border-b border-gray-700">
                          <td className="py-3 px-2 font-bold">
                            <div className="inline-flex space-x-3 items-center">
                              <span>{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">{user.email}</td>
                          <td className="py-3 px-2">
                            {user.isAdmin ? "✅Yes" : "⛔No"}
                          </td>
                          <td className="py-3 px-2">
                            <div className="inline-flex items-center space-x-3">
                              <p
                                title="Edit"
                                className="cursor-pointer hover:text-blue-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </p>
                              <button
                                title="Suspend-user"
                                className="hover:text-red-500"
                                onClick={() => suspendUser(user._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke={
                                    selectedUserId === user._id
                                      ? "red"
                                      : "currentColor"
                                  }
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
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

export default UsersManagement;
