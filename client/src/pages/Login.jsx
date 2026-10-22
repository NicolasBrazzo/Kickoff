import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { showSuccess } from "../utils/toast";
import Loader from "../components/Loader";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   showSuccess("AQOOOO");
  // }, [])

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login({ email: email, password: password });
    if (res.ok) {
      showSuccess("Login avvenuto con successo");
      setLoading(false);
      navigate("/dashboard");
    } else {
      setLoading(false);
      setError(res.message);
      console.error("Login error");
    }
  };

  return (
    <section className="p-10 h-screen">
      {loading ?
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      : <div className="flex items-center justify-center h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 min-w-64"
          >
            <h1 className="text-center">Login</h1>

            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="email"
                placeholder="Insersci email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                type="password"
                placeholder="Inserisci password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Link to={"/register"}>
              <p>Registrati</p>
            </Link>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button className="primary-button">Login</button>

            <div className="flex justify-center">
              <button className="primary-button">Verifica prenotazione</button>
            </div>
          </form>
        </div>
      }
    </section>
  );
};
