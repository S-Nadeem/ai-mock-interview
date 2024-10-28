import React from "react";
import AddNewInterview from "../_components/AddNewInterview";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <p className="text-lg">Create and start your AI mock Interview</p>
      <div className="grid grid-cols-1 my-5 md:grid-cols-3">
        <AddNewInterview />
      </div>
    </div>
  );
};

export default Dashboard;
