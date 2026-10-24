import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { showSuccess } from "../utils/toast";
import Loader from "../components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">Email</label>
              <Input
                type="email"
                placeholder="Insersci email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">Password</label>
              <Input
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

            {error && <p className="text-danger text-center">{error}</p>}

            <Button>Login</Button>

            <div className="flex justify-center">
              <Button variant="ghost">Verifica prenotazione</Button>
            </div>
          </form>
        </div>
      }
    </section>
  );
};
