import { useEffect, useState } from "react";
import api from "../api/client";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me");

      if (res.data?.ok && res.data.user) {
        const { sub, name, surname, email, admin } = res.data.user;
        setUser({
          id: sub,
          name,
          surname,
          email,
          admin,
        });
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("token");
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const register = async (credentials) => {
    try {
      const res = await api.post("/auth/register", credentials);

      if (res.data?.ok && res.data.token) {
        localStorage.setItem("token", res.data.token);
        await checkAuth();
        return { ok: true };
      }

      return {
        ok: false,
        message: res.data?.error || "Registrazione fallita",
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message || "Registrazione fallita",
      };
    }
  };

  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);

      if (res.data?.ok && res.data.token) {
        localStorage.setItem("token", res.data.token);
        await checkAuth();
        return { ok: true, message: "Login avvenuto con successo" };
      }

      return {
        ok: false,
        message: res.data?.error || "Login fallito",
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message || "Login fallito",
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
