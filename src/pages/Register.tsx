import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(form);
    await axios.post("http://localhost:3000/api/auth/register", form);
    navigate("/login");
  };

  const loginPage = async () => {
    console.log(form);
    await axios.post("http://localhost:3000/api/auth/login", form);
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Register</Typography>
      <TextField
        fullWidth
        label="Username"
        name="username"
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        margin="normal"
      />
      
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        <Button variant="contained" onClick={handleSubmit}>
          Sign Up
        </Button>
        </Grid>
        <Grid item>
        <nav>
          
          <Link to="/login">Login</Link>
        </nav>
        </Grid>
      </Grid>
    </Container>
  );
}
