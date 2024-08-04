// src/components/OktaForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, FormControlLabel, Switch } from '@mui/material';

const OktaForm = () => {
  const [formValues, setFormValues] = useState({
    oktaDomain: '',
    oktaClientId: '',
    oktaClientSecret: '',
    oktaRedirectUri: ''
  });
  
  const [isOktaEnabled, setIsOktaEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', formValues);
    console.log('Okta enabled:', isOktaEnabled);
  };

  const handleToggle = () => {
    setIsOktaEnabled(!isOktaEnabled);
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Typography variant="h4" gutterBottom>
        Okta Integration Settings
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={isOktaEnabled}
            onChange={handleToggle}
            color="primary"
          />
        }
        label={isOktaEnabled ? "Okta Enabled" : "Okta Disabled"}
        className="mb-6"
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Okta Domain"
          name="oktaDomain"
          value={formValues.oktaDomain}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          disabled={!isOktaEnabled}
        />
        <TextField
          label="Client ID"
          name="oktaClientId"
          value={formValues.oktaClientId}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          disabled={!isOktaEnabled}
        />
        <TextField
          label="Client Secret"
          name="oktaClientSecret"
          value={formValues.oktaClientSecret}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          type="password"
          required
          disabled={!isOktaEnabled}
        />
        <TextField
          label="Redirect URI"
          name="oktaRedirectUri"
          value={formValues.oktaRedirectUri}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          disabled={!isOktaEnabled}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isOktaEnabled}
        >
          Save Settings
        </Button>
      </form>
    </Container>
  );
};

export default OktaForm;
