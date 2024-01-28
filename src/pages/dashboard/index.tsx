import React from "react";
import UserDashboard from "../../components/dashboard/UserDashboard";
import Navbar from "../../components/navbar/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <UserDashboard />
    </div>
  );
};

export default Dashboard;
