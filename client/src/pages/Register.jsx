import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

          <div className="flex flex-col gap-1">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Inserisci nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              placeholder="Inserisci email..."
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

          <Link to={"/"}>
            <p>Login</p>
          </Link>

          {error && <p className="text-red-500 text-center">{error}</p> }

          <button className="primary-button">Registrati</button>
        </form>
      </div>
    </section>
  );
};
