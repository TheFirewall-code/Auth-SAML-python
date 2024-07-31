import React, { useState } from 'react';
import axios from 'axios';

const RoleManagement = ({ userData }) => {
  const [roleName, setRoleName] = useState('');
  const [apiList, setApiList] = useState(['']);
  const [message, setMessage] = useState('');

  const handleAddApi = () => {
    setApiList([...apiList, '']);
  };

  const handleApiChange = (index, value) => {
    const newApiList = apiList.map((api, i) => (i === index ? value : api));
    setApiList(newApiList);
  };

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
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

  const handleSubmit = () => {
    const accessToken = getCookie('accessToken');
    const payload = {
      role: roleName,
      apis: apiList,
      token: accessToken, // include the accessToken in the payload
    };

    axios
      .post('http://localhost:8000/admin/create-role', payload)
      .then((response) => {
        setMessage('Role created successfully');
        setRoleName('');
        setApiList(['']);
      })
      .catch((error) => {
        setMessage('Error creating role');
        console.log(error);
      });
  };


  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      {message && <p className="mb-4">{message}</p>}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Role Name</label>
        <input
          type="text"
          value={roleName}
          onChange={handleRoleNameChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">APIs</label>
        {apiList.map((api, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={api}
              onChange={(e) => handleApiChange(index, e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>
        ))}
        <button
          onClick={handleAddApi}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add API
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Create Role
      </button>
    </div>
  );
};

export default RoleManagement;
