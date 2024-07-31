import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import RoleManagement from './RoleManagement';
import { UserCircleIcon, LogoutIcon } from '@heroicons/react/outline'; // Import icons

const setCookie = (name, value, hours) => {
  let expires = '';
  if (hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

const getCookie = (name) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const Dashboard = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      setCookie('accessToken', token, 1 / 24);
    }

    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      window.location.href = 'http://localhost:3000/login';
    } else {
      axios
        .post('http://localhost:8000/auth/get/user', {
          token: accessToken,
        })
        .then((response) => {
          setUserData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  const handleLogout = () => {
    document.cookie = 'accessToken=; Max-Age=0; path=/;';
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <UserCircleIcon className="h-8 w-8 text-gray-500" />
          <p className="ml-2 text-xl font-bold">{userData.role.join(', ')} Dashboard</p>
        </div>
        {userData && (
          <div className="flex items-center">
            <p className="mr-4">{userData.sub}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
            >
              <LogoutIcon className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        )}
      </header>
      <div className="flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {userData ? (
            <div>
              <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard!</h1>
              <div className="mb-4 flex">
                <p className="font-semibold mr-2">Role:</p>
                <p>{userData.role.join(', ')}</p>
              </div>
              <div className="mb-4 flex">
                <p className="font-semibold mr-2">Email:</p>
                <p>{userData.sub}</p>
              </div>
              {userData.role.includes('admin') && (
                <RoleManagement userData={userData} />
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
