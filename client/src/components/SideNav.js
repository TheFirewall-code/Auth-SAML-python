// SideNav.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AiOutlineUser, AiOutlineLock, AiOutlineUserAdd, AiOutlineLogout } from 'react-icons/ai';

const SideNav = ({ onSelect }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
  };

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#333', color: '#fff', padding: '16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Admin Panel</h1>
      </div>
      <nav>
        <List>
          <ListItem button onClick={() => onSelect('assign-roles')} style={{ color: '#fff', '&:hover': { backgroundColor: '#444' } }}>
            <ListItemIcon>
              <AiOutlineLock style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Assign Roles" />
          </ListItem>
          <ListItem button onClick={() => onSelect('enable-okta')} style={{ color: '#fff', '&:hover': { backgroundColor: '#444' } }}>
            <ListItemIcon>
              <AiOutlineUser style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Enable Okta" />
          </ListItem>
          <ListItem button onClick={() => onSelect('add-users')} style={{ color: '#fff', '&:hover': { backgroundColor: '#444' } }}>
            <ListItemIcon>
              <AiOutlineUserAdd style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Add Users" />
          </ListItem>
          <ListItem button onClick={handleLogout} style={{ color: '#fff', '&:hover': { backgroundColor: '#444' } }}>
            <ListItemIcon>
              <AiOutlineLogout style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </nav>
    </div>
  );
};

export default SideNav;
