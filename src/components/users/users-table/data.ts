import { ShieldCheck, User } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const types = [
  {
    value: "admin",
    label: "Admin",
    icon: ShieldCheck,
  },
  {
    value: "user",
    label: "User",
    icon: User,
  },
];
