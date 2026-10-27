import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { navLinks } from "./content";

export const LandingNav = () => {
  const { user } = useAuth();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-5 z-20 px-5 md:top-6 md:px-8">
      <div className="pointer-events-auto mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-6 rounded-lg border border-cream/8 bg-ink/94 pr-2.5 pl-[22px] text-cream backdrop-blur-md">
        <a href="#top" aria-label="Kickoff, torna all'inizio" className="transition-colors hover:text-sage">
          <Logo />
        </a>

        <nav aria-label="Principale" className="hidden gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-3 text-[15px] font-medium transition-colors hover:text-sage after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[18px]">
          <Link
            to={user ? "/dashboard" : "/login"}
            className="py-3 text-[15px] font-medium transition-colors hover:text-sage"
          >
            {user ? "Dashboard" : "Accedi"}
          </Link>
          <Button asChild variant="light" size="sm" className="text-[15px]">
            <Link to="/register">
              <span className="hidden md:inline">Registra il tuo campo</span>
              <span className="md:hidden">Registrati</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
