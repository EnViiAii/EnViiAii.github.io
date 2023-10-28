import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./LoginForm.css";
import { useContext } from "react";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { setUser, setAccessToken, user, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  const handleLogin = async (event) => {
    if (event.key === "Enter" || event.type === "click") {
      setIsLoading(true);

      await axios
        .post("http://localhost:8080/auth", {
          username: username.toLowerCase(),
          password: password.toLowerCase(),
        })
        .then((response) => {
          setIsLoading(false);
          const { username, accessToken, role } = response.data;

          if (accessToken) {
            setAccessToken(accessToken);
            setUser(username);
            setRole(role);
            setMessage("Login Successfully!");
            setIsError(false);

            setTimeout(() => {
              setMessage("");
              navigate("/chatbot");
            }, 1000);
          } else {
            setMessage("Login Failed");
            setIsError(true);
          }
        })
        .catch((error) => {
          setIsLoading(false);

          setMessage("Login Failed.");
          setIsError(true);
        });
    }
  };

  return (
    <div className="page">
      <div className="cover">
        <h1>Login</h1>

        <input
          placeholder="Username / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={handleLogin}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={handleLogin}
        />

        <div className="login-btn">
          <Button onClick={handleLogin}>Login</Button>
        </div>

        <p className="create">
          <Link to="/register">Create new account</Link>
        </p>

        {isLoading && <Loading />}

        <div className="message-container">
          {message && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity={isError ? "error" : "success"}>{message}</Alert>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

const Loading = () => {
  return (
    <div className="loading">
      <span>Loading...</span>
    </div>
  );
};
