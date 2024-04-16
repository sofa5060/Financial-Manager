import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import useSidebarLinks from "./SideBarLinks";
import { UserNav } from "../UserNav/UserNav";
import { useAuthStore } from "@/hooks/useAuthStore";

const SideBar = () => {
  const location = useLocation();
  const name = useAuthStore((state) => state.name);
  const clearUserData = useAuthStore((state) => state.clearUserData);
  const navigate = useNavigate();

  const handleLogOut = () => {
    clearUserData();
    navigate("/login", { replace: true });
  };

  const [isOpen, setIsOpen] = useState(false);

  const { sidebarLinks } = useSidebarLinks();

  if (isOpen) {
    return (
      <div
        className="flex flex-col items-center w-[270px] h-[100vh] overflow-hidden text-green-700  bg-white rounded"
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link className="flex items-center justify-center mt-3" to="/">
          <img src="/images/ayaat_logo.png" className="h-16" alt="logo" />
        </Link>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
            {sidebarLinks.map((link) => {
              const isActive =
                link.href ==
                `/${location.pathname.split("/").slice(1).join("/")}`;

              return (
                <Link
                  key={link.href}
                  className={cn(
                    "hover:text-green-700 hover:no-underline text-start",
                    isActive
                      ? "flex items-center w-full h-12 px-3 mt-2 bg-green-100 rounded"
                      : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-green-50"
                  )}
                  to={link.href}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="ms-2 text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex h-16 mt-auto mb-3">
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-x-2">
              <UserNav />
              <div className="text-gray-700 flex flex-col ms-1">
                <span className="text-sm font-medium">
                  {name ? name : "User"}
                </span>
                {/* <span className="text-xs text-gray-400">{title}</span> */}
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={handleLogOut}
              className="text-gray-500 transition-colors duration-200 rtl:rotate-0 hover:text-green-500 "
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center w-16 h-[100vh] overflow-hidden text-green-700 bg-white rounded"
      onMouseEnter={() => setIsOpen(true)}
    >
      <Link className="flex items-center justify-center mt-3" to="/">
        <img src="/images/logo-mini.webp" className="h-16" alt="logo" />
      </Link>
      <div className="flex flex-col items-center mt-3 border-t border-gray-300">
        {sidebarLinks.map((link) => {
          const isActive =
            link.href == `/${location.pathname.split("/").slice(1).join("/")}`;

          return (
            <Link
              key={link.href}
              className={cn(
                isActive
                  ? "flex items-center justify-center w-12 h-12 mt-2 bg-green-100 rounded"
                  : "flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-green-50"
              )}
              to={link.href}
            >
              <link.icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center w-16 h-16 mt-auto">
        <UserNav />
      </div>
    </div>
  );
};

export default SideBar;
