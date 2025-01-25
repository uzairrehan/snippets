'use client';

import { useState } from 'react';
import { FaHome, FaCog, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } fixed left-0 top-0 h-full transition-all duration-300 bg-gray-800 text-white p-4 space-y-6 z-20`}  
      >
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-500 hover:text-white focus:outline-none z-30"
          style={{ position: 'absolute', top: '1rem', left: '1rem' }} 
        >
          {isOpen ? '←' : '→'}
        </button>
        <div className="space-y-4">
          <p className={`${isOpen ? 'block' : 'hidden'} text-xl font-semibold`}>Dashboard</p>
          <ul>
            <li className="flex items-center space-x-4">
              <FaHome className={`${isOpen ? 'text-white' : 'text-gray-400'} text-lg m-2`} />
              <a
                href="#"
                className={`${isOpen ? 'block' : 'hidden'} hover:bg-gray-700 p-2 rounded`}
              >
                Home
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <FaCog className={`${isOpen ? 'text-white' : 'text-gray-400'} text-lg m-2`} />
              <a
                href="#"
                className={`${isOpen ? 'block' : 'hidden'} hover:bg-gray-700 p-2 rounded`}
              >
                Settings
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <FaUser className={`${isOpen ? 'text-white' : 'text-gray-400'} text-lg m-2`} />
              <a
                href="#"
                className={`${isOpen ? 'block' : 'hidden'} hover:bg-gray-700 p-2 rounded`}
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col pl-16 lg:pl-64 pt-16">
        {/* Navbar */}
        <div className="bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-800 ml-14">Dashboard</div>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Notifications
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
              Profile
            </button>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="p-6 pt-24">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome back, User!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-800">Card 1</h3>
              <p className="text-gray-600">Some content here...</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-800">Card 2</h3>
              <p className="text-gray-600">Some content here...</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-800">Card 3</h3>
              <p className="text-gray-600">Some content here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
