import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Register from "./Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/api/auth/login", form);
    login(res.data.token);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
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
      {/* <Button variant="contained" onClick={handleSubmit}>Login</Button>
        <nav>

            <Link to="/register">Register</Link>

      </nav> */}
      {/* <Grid container spacing={2}>
        <div className="container">
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <nav>
            <Link to="/register">Register</Link>
          </nav>
        </div>
      </Grid> */}
      <Grid container spacing={2} alignItems="center">
  <Grid item>
    <Button variant="contained" onClick={handleSubmit}>
      Login
    </Button>
  </Grid>

  <Grid item>
  <nav>
            <Link to="/register">Register</Link>
          </nav>
  </Grid>
</Grid>

      {/* </BrowserRouter> */}
    </Container>
  );
}
