import { EXTERNAL_LINKS } from "@/lib/external_links";
import {
  BarChartHorizontalBig,
  Calculator,
  LucideIcon,
  MessagesSquare,
  Settings,
  // Table,
  Table2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export type SidebarLink = {
  label: string;
  href?: string;
  icon: LucideIcon;
  children?: SidebarLink[];
};

const useSidebarLinks = () => {
  const { t } = useTranslation("sidebar");

  const sidebarLinks: SidebarLink[] = [
    {
      label: t("chartsOfAccounts"),
      href: "/",
      icon: BarChartHorizontalBig,
    },
    {
      label: t("costCenters"),
      href: "/cost-centers",
      icon: Calculator,
    },
    {
      label: t("entries"),
      icon: Table2,
      children: [
        {
          label: t("park"),
          href: "/accounting-entries/park",
          icon: Table2,
        },
        {
          label: t("post"),
          href: "/accounting-entries/post",
          icon: Table2,
        },
      ],
    },
    // {
    //   label: t("parkAccountingTransactions"),
    //   href: "/transactions/park",
    //   icon: Table,
    // },
    // {
    //   label: t("postAccountingTransactions"),
    //   href: "/transactions/post",
    //   icon: Table,
    // },
    {
      label: t("treasury"),
      icon: Table2,
      children: [
        {
          label: t("receive"),
          href: "/treasury/receive",
          icon: Table2,
        },
        {
          label: t("payment"),
          href: "/treasury/payment",
          icon: Table2,
        },
      ],
    },
    {
      label: t("templates"),
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
