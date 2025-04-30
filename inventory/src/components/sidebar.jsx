import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ roleButtons }) => {
  return (
    <div className="w-64 overflow-hidden bg-violet-950 shadow-lg p-4">
      <h2 className="text-xl text-white font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        {roleButtons.map(({ to, text }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 
              `w-full text-left px-4 py-2 rounded-lg transition duration-300 ${
                isActive ? 'bg-violet-700 text-white' : 'bg-violet-500 text-white hover:bg-violet-700'
              }`
            }
          >
            {text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
export default Sidebar;