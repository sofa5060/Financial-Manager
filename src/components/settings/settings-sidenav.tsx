"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Link, useLocation } from "react-router-dom";

interface SettingsSideNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SettingsSideNav({
  className,
  items,
  ...props
}: SettingsSideNavProps) {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex flex-col lg:space-x-0 lg:space-y-1 bg-green-800/5 rounded-md border border-green-700/10",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === item.href
              ? "bg-green-700 hover:bg-green-700 text-white hover:text-white"
              : "hover:bg-transparent hover:underline font-normal",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
