import React, { useState } from 'react';
import SideNav from './SideNav';
import AssignRole from './adminComponents/AssignRoles';
import AddUser from './adminComponents/AddUser';
import OktaForm from './adminComponents/OktaForm';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('default');

  const renderContent = () => {
    switch (selectedComponent) {
      case 'assign-roles':
        return <AssignRole />;
      case 'enable-okta':
        return <OktaForm />;
      case 'add-users':
        return <AddUser />;
      default:
        return <div>Welcome to the Admin Panel</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6 h-screen bg-gray-800 text-white fixed top-0 left-0">
        <SideNav onSelect={setSelectedComponent} />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-[16.6666667%] p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
