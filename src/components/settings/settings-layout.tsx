import { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { SettingsSideNav } from "./settings-sidenav";
import { useTranslation } from "react-i18next";
import "../../i18n";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation("settings");

  const sidebarNavItems = [
    {
      title: t("settings.sidebar.general"),
      href: "/settings",
    },
    {
      title: t("settings.sidebar.categories"),
      href: "/settings/taskcat",
    },
    {
      title: t("settings.sidebar.subCategories"),
      href: "/settings/tasksubcat",
    },
    {
      title: t("settings.sidebar.jobTitles"),
      href: "/settings/orgtitles",
    },
    {
      title: t("settings.sidebar.departments"),
      href: "/settings/orgdep",
    },
  ];

  return (
    <div>
      <div className="space-y-6 p-10 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {t("settings.title")}
          </h2>
          <p className="text-muted-foreground">{t("settings.description")}</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:gap-8 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SettingsSideNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
