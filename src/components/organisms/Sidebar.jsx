import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      name: "Farm Overview",
      href: "/",
      icon: "BarChart3"
    },
    {
      name: "Fields",
      href: "/fields",
      icon: "Map"
    },
    {
      name: "Crops",
      href: "/crops",
      icon: "Wheat"
    },
    {
      name: "Equipment",
      href: "/equipment",
      icon: "Truck"
    },
    {
      name: "Reports",
      href: "/reports",
      icon: "FileText"
    },
    {
      name: "Weather",
      href: "/weather",
      icon: "CloudRain"
    }
  ];

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
      >
        <ApperIcon name="Menu" className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "lg:hidden fixed left-0 top-0 z-50 h-full w-72 bg-gradient-to-b from-white to-gray-50 shadow-xl transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-forest to-fresh-green rounded-lg">
              <ApperIcon name="Sprout" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold font-display text-gray-900">CropView Pro</h1>
          </div>
          <button
            onClick={closeMobileSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-forest to-fresh-green text-white shadow-lg"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:text-gray-900"
                )
              }
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-forest to-fresh-green rounded-xl">
              <ApperIcon name="Sprout" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-gray-900">CropView Pro</h1>
              <p className="text-sm text-gray-600">Farm Management System</p>
            </div>
          </div>
        </div>

        <nav className="p-6 space-y-3">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group transform hover:scale-[1.02]",
                  isActive
                    ? "bg-gradient-to-r from-forest to-fresh-green text-white shadow-lg"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:text-gray-900"
                )
              }
            >
              <ApperIcon name={item.icon} className="w-6 h-6" />
              <span className="font-medium text-base">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;