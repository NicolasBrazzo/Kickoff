import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await register({ name, email, password });
    if (res.ok) {
      navigate("/dashboard");
    } else {
      setError(res.message);
      console.error("Registration error");
    }
  };

  return (
    <section className="p-10 h-screen">
      <div className="flex items-center justify-center h-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-64">
          <h1 className="text-center">Registrazione</h1>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">Nome</label>
            <Input
              type="text"
              placeholder="Inserisci nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">Email</label>
            <Input
              type="email"
              placeholder="Inserisci email..."
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

          <Link to={"/login"}>
            <p>Login</p>
          </Link>

          {error && <p className="text-danger text-center">{error}</p> }

          <Button>Registrati</Button>
        </form>
      </div>
    </section>
  );
};
