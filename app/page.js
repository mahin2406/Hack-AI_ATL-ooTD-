// app/page.js

"use client"; // Use client-side rendering

import { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import styles from "./page.module.css"; // Keep your existing styles if needed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null); // Reset error message

    // Simple validation (you can replace this with your own logic)
    if (email === 'test@example.com' && password === 'password') {
      alert('Login successful!');
      // Redirect to another page or handle successful login here
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.page}>
      <Container maxWidth="xs" style={{ marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;
