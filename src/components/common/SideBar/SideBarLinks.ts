import { EXTERNAL_LINKS } from "@/lib/external_links";
import {
  Archive,
  AreaChart,
  CheckSquare,
  LucideIcon,
  MailQuestion,
  MessagesSquare,
  Settings,
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
      label: t("sidebar.tasks"),
      href: "/",
      icon: CheckSquare,
    },
    {
      label: t("sidebar.requests"),
      href: "/requests",
      icon: MailQuestion,
    },
    {
      label: t("sidebar.archive"),
      href: "/tasks-archive",
      icon: Archive,
    },
    {
      label: t("sidebar.home"),
      href: "/stats",
      icon: AreaChart,
    },
    {
      label: t("sidebar.chat"),
      href: EXTERNAL_LINKS.CHAT,
      icon: MessagesSquare,
    },
    {
      label: t("sidebar.settings"),
      href: EXTERNAL_LINKS.CONTROL_PANEL,
      icon: Settings,
    },
  ];

  return { sidebarLinks };
};

export default useSidebarLinks;
