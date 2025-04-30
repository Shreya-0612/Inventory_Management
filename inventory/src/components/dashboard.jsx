import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
const Dashboard = () => {
  const userRole = localStorage.getItem("user_role") || "default";

  const roleButtons = {
    super_admin: [
      { to: "/dashboard/add-user", text: "Add User" },
      { to: "/dashboard/add-inventory", text: "Add Inventory" },
      { to: "/dashboard/view-product", text: "View Products" },
      { to: "/dashboard/delete-inventory", text: "Delete Inventory"},
      ],
    inventory_manager: [
      { to: "/dashboard/add-inventory", text: "Add Inventory" },
      { to: "/dashboard/view-product", text: "View Inventory" },
      { to: "/dashboard/delete-inventory", text: "Delete Inventory"},
      ],
    warehouse_staff: [
      { to: "/dashboard/view-product", text: "View Inventory" },

    ],
    default: [],
  }[userRole] || [];

  return (
    <div className='flex h-screen bg-gradient-to-tr from-violet-900 to-violet-300'>
      <Sidebar roleButtons={roleButtons} /> 
      <div className="flex-1 p-8 bg-gradient-to-tr from-violet-900 to-violet-300 overflow-y-auto">
        <h1 className="text-2xl text-white font-bold mb-4">Welcome to Dashboard!</h1>
        <p className="mb-6 text-white">Manage your products efficiently with the options on the left.</p>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;