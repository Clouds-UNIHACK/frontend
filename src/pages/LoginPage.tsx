import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import restClient from "../api/client";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await restClient.post("api/v1/auth/register", {
        data: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });
      console.log(response);
      if (response?.data) {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await restClient.post("api/v1/auth/login", {
        data: {
          username: formData.username,
          password: formData.password,
        },
      });
      console.log(response);

      if (response?.access_token) {
        localStorage.setItem("accessToken", response.access_token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: "24px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          mt: 4,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#fff",
            padding: "24px 32px 0",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 800,
              color: "#39FF14",
              marginBottom: "16px",
              textShadow: "0 0 10px rgba(57, 255, 20, 0.3)",
            }}
          >
            SWAPP
          </Typography>
        </Box>

        <Box sx={{ padding: "16px 32px 32px" }}>
          {isLogin ? (
            <>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ fontSize: "0.7rem", opacity: 0.6 }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#39FF14",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  padding: "10px",
                  borderRadius: "8px",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 8px rgba(57, 255, 20, 0.3)",
                  "&:hover": {
                    bgcolor: "#2bcc0f",
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 12px rgba(57, 255, 20, 0.5)",
                  },
                  "&:active": {
                    transform: "translateY(1px)",
                    boxShadow: "0 2px 4px rgba(57, 255, 20, 0.3)",
                  },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link
                    href="#"
                    sx={{ color: "#39FF14" }}
                    onClick={toggleAuthMode}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ fontSize: "0.7rem", opacity: 0.6 }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#39FF14",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  padding: "10px",
                  borderRadius: "8px",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 8px rgba(57, 255, 20, 0.3)",
                  "&:hover": {
                    bgcolor: "#2bcc0f",
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 12px rgba(57, 255, 20, 0.5)",
                  },
                  "&:active": {
                    transform: "translateY(1px)",
                    boxShadow: "0 2px 4px rgba(57, 255, 20, 0.3)",
                  },
                }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    href="#"
                    sx={{ color: "#39FF14" }}
                    onClick={toggleAuthMode}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
