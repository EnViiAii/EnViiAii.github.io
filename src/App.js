import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import HomePage from "./pages/Home/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Manager from "./pages/Manager/Manager";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/chatbot";

  return (
    <div className="container">
      {isHomePage && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/chatbot" element={<HomePage />} />
        <Route path="/manager" element={<Manager />} />

      </Routes>
    </div>
  );
}

export default App;
