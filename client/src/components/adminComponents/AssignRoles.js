// src/components/AssignRole.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Chip, Typography, Box, Paper } from '@mui/material';

const AssignRole = () => {
  const [roleName, setRoleName] = useState('');
  const [apiName, setApiName] = useState('');
  const [selectedAPIs, setSelectedAPIs] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles from the backend when the component mounts
    axios.get('http://localhost:8000/roles/')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the roles!", error);
      });
  }, []);

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleApiNameChange = (e) => {
    const value = e.target.value;
    setApiName(value);

    if (value.endsWith(', ')) {
      const newApi = value.slice(0, -2).trim();
      if (newApi && !selectedAPIs.includes(newApi)) {
        setSelectedAPIs([...selectedAPIs, newApi]);
        setApiName('');
      }
    }
  };

  const handleAddAPI = () => {
    if (apiName && !selectedAPIs.includes(apiName)) {
      setSelectedAPIs([...selectedAPIs, apiName]);
      setApiName('');
    }
  };

  const handleAddRole = () => {
    if (roleName && selectedAPIs.length > 0) {
      const newRole = { role_name: roleName, apis: selectedAPIs };
      axios.post('http://localhost:8000/roles/', newRole)
        .then(response => {
          setRoles([...roles, response.data]);
          setRoleName('');
          setSelectedAPIs([]);
        })
        .catch(error => {
          console.error("There was an error adding the role!", error);
        });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Assign Role
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Role Name"
            variant="outlined"
            value={roleName}
            onChange={handleRoleNameChange}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Add API"
            variant="outlined"
            value={apiName}
            onChange={handleApiNameChange}
            placeholder="Type API name and press comma and space to add"
          />
        </Box>
        {apiName && !selectedAPIs.includes(apiName) && (
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddAPI}
              fullWidth
            >
              Add API
            </Button>
          </Box>
        )}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            APIs for Role
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedAPIs.map((api, index) => (
              <Chip key={index} label={api} />
            ))}
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRole}
          fullWidth
        >
          Add Role
        </Button>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Roles List
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            {roles.map((role) => (
              <li key={role.id}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                  {role.role_name}:
                </Typography>
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                  {role.apis.join(', ')}
                </Typography>
              </li>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssignRole;
