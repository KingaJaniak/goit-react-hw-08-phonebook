// App.jsx
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/contacts");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      {user && <button onClick={handleLogout}>Logout</button>}
      {!user && (
        <>
          <button onClick={() => navigate("/register")}>Register</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
      <Routes>
        <Route path="/" element={<HomePage /> } />
        <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/contacts" element={user ? <ContactsPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
