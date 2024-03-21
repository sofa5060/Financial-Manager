import { ShieldCheck, User } from "lucide-react";
import { useTranslation } from "react-i18next";

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

export const useTypes = () => {
  const { t } = useTranslation("orgchart");
  const types = [
    {
      value: "admin",
      label: t("orgChart.admin"),
      icon: ShieldCheck,
    },
    {
      value: "user",
      label: t("orgChart.user"),
      icon: User,
    },
  ];

  return { types };
};
