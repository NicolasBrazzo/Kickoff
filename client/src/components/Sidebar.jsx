import { useState } from "react";
import { Users, Grid, TrendingUp, CreditCard, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    { icon: Grid, label: "Projects", path: "/projects" },
    { icon: Users, label: "Team", path: "/team" },
    { icon: Grid, label: "Integrations", path: "/integrations" },
    { icon: TrendingUp, label: "Usage", path: "/usage" },
    { icon: CreditCard, label: "Billing", path: "/billing" },
    { icon: Settings, label: "Organization settings", path: "/settings" },
  ];

  return (
    <div className="h-screen bg-gray-900 w-16">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-800 transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "w-64" : "w-16"
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            {isOpen && (
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  test-brazzo-nicolas
                </span>
                <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded whitespace-nowrap">
                  FREE
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="py-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setActiveItem(index)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                activeItem === index ?
                  "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isOpen && (
                <span className="text-sm whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
