import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
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

  const handleRegister = async (event) => {
    if (event.key === "Enter") {
      setIsLoading(true);

      if (!username || !email || !password) {
        setIsLoading(false);
        setMessage("Please fill out all fields.");
        setIsError(true);
        return;
      }

      await axios
        .post("http://localhost:8080/register", {
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: password.toLowerCase(),
          role: "user",
        })
        .then((response) => {
          setIsLoading(false);

          if (response.data.message === "User has been successfully created.") {
            setMessage("Account successfully created!");
            setIsError(false);

            setTimeout(() => {
              setMessage("");
              navigate("/login");
            }, 1000);
          } else {
            if (response.data.error) {
              setMessage(response.data.error);
            } else {
              setMessage("Account creation failed");
            }
            setIsError(true);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setMessage("Connection server failed");
          setIsError(true);
        });
    }
  };

  return (
    <div className="page">
      <div className="cover">
        <h1>CREATE ACCOUNT</h1>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={handleRegister}
        />
        <div className="login-btn">
          <Button onClick={handleRegister}>Login</Button>
        </div>

        <p className="create">
          <Link to="/login">Login account</Link>
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

export default RegisterForm;

const Loading = () => {
  return (
    <div className="loading">
      <span>Loading...</span>
    </div>
  );
};
