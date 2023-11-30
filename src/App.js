import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import useStorage from "./hooks/useStorage";
import AuthContext from "./context/AuthContext";
import ToolBar from "./components/ToolBar";
import Aside from "./components/Aside";
import "./App.css";

function App() {
  const Storage = (key, value) => useStorage(key, value);
  const [token, setToken] = useState(Storage("tokenNeto"));
  const [profile, setProfile] = useState(Storage("profileNeto"));
  const navigate = useNavigate();
  const history = useLocation();

  useEffect(() => {
    navigate(history.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnChangeForm = async ({ login, password }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_AUTH_URL}auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }
      const { token } = await response.json();
      const responseProfile = await fetch(
        `${process.env.REACT_APP_AUTH_URL}private/me`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      if (!responseProfile.ok) {
        throw new Error("Профиль не найден");
      }
      const profile = await responseProfile.json();
      Storage("tokenNeto", token);
      Storage("profileNeto", profile);
      setToken(token);
      setProfile(profile);
      navigate("/news");
    } catch {
      Storage("tokenNeto", "delete");
      Storage("profileNeto", "delete");
      setToken(null);
      setProfile(null);
      navigate("/");
    }
  };

  const logOut = () => {
    localStorage.removeItem("tokenNeto");
    localStorage.removeItem("profileNeto");
    setToken(null);
    setProfile(null);
    navigate("/");
  };

  return (
    <div className="containier">
      <AuthContext.Provider value={{ token, profile, btnChangeForm, logOut }}>
        <ToolBar />
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Aside />
              </>
            }
          />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
