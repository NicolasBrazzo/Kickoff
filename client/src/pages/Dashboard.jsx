import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>loading...</p>;
  if (!user) return <p>Accesso negato</p>;
  return (
    <div className="mx-10 mt-5">
      <div className="flex justify-between">
        <div>
          <h1>Dashboard</h1>
          <p>Benvenuto {user.name}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => logout()}>Logout</Button>
      </div>

      <div className="flex gap-10 mt-5">
        <Link to="/clients" className="border p-5">
          Clienti
        </Link>
        <Link to="/fields" className="border p-5">
          Campi
        </Link>
          <Link to="/reservations" className="border p-5">
            Prenotazioni
          </Link>
        {user.admin && (
          <Link to="/operators" className="border p-5">
            Operatori
          </Link>
        )}
      </div>
    </div>
  );
};
