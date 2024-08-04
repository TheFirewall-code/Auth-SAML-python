import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper as MuiPaper } from '@mui/material';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch roles from the backend
    axios.get('http://localhost:8000/roles/')
      .then(response => {
        setRoles(response.data.map(role => role.role_name)); // Adjust this according to your role structure
      })
      .catch(error => {
        setError('There was an error fetching roles.');
        console.error(error);
      });

    // Fetch users from the backend
    axios.get('http://localhost:8000/user/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setError('There was an error fetching users.');
        console.error(error);
      });
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleAddUser = () => {
    if (!email || !password || !role) {
      setError('All fields are required.');
      return;
    }

    axios.post('http://localhost:8000/user/register', { email, password, role })
      .then(response => {
        setMessage('User added successfully!');
        setEmail('');
        setPassword('');
        setRole('');
        setError('');
        // Fetch the updated list of users
        return axios.get('http://localhost:8000/user/');
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setError('There was an error adding the user.');
        console.error(error);
      });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add User
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={handleRoleChange}
              label="Role"
            >
              {roles.map((roleName) => (
                <MenuItem key={roleName} value={roleName}>{roleName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {error && (
          <Typography color="error" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="success" sx={{ mb: 3 }}>
            {message}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          fullWidth
        >
          Add User
        </Button>
      </Paper>
      <Typography variant="h5" component="h2" gutterBottom>
        User List
      </Typography>
      <TableContainer component={MuiPaper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddUser;
