import { EXTERNAL_LINKS } from "@/lib/external_links";
import {
  BarChartHorizontalBig,
  Calculator,
  LucideIcon,
  MessagesSquare,
  PenBox,
  Settings,
  Table,
  Table2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const useSidebarLinks = () => {
  const { t } = useTranslation("sidebar");

  const sidebarLinks: SidebarLink[] = [
    {
      label: "Charts of accounts",
      href: "/",
      icon: BarChartHorizontalBig,
    },
    {
      label: "Cost centers",
      href: "/cost-centers",
      icon: Calculator,
    },
    {
      label: "Accounting Entries (Park)",
      href: "/accounting-entries/park",
      icon: Table2,
    },
    {
      label: "Accounting Transactions (Park)",
      href: "/transactions/park",
      icon: Table,
    },
    {
      label: "Accounting Entries (Post)",
      href: "/accounting-entries/post",
      icon: Table2,
    },
    {
      label: "Accounting Transactions (Post)",
      href: "/transactions/post",
      icon: Table,
    },
    {
      label: "Treasury Receipts",
      href: "/treasury-receipts",
      icon: Table2,
    },
    {
      label: "Add Treasury Receipt",
      href: "/treasury-receipts/new",
      icon: PenBox,
    },
    {
      label: "Treasury Payments",
      href: "/treasury-payments",
      icon: Table2,
    },
    {
      label: "Add Treasury Payment",
      href: "/treasury-payments/new",
      icon: PenBox,
    },
    {
      label: "Account Templates",
      href: "/accounts/templates",
      icon: Table2,
    },
    {
      label: t("sidebar.chat"),
      href: EXTERNAL_LINKS.CHAT,
      icon: MessagesSquare,
    },
    {
      label: t("sidebar.settings"),
      href: "/settings",
      icon: Settings,
    },
  ];

  return { sidebarLinks };
};

export default useSidebarLinks;
