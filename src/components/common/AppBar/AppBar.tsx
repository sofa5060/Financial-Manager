// import { UserNav } from "../user-nav/user-nav";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import NotificationsList from "@/components/notifications/notifications-list";
// import useNotificationsStore from "@/hooks/notifications/use-notifications-store";
import { Badge } from "@/components/ui/badge";
// import BreadCrumbs from "./BreadCrumbs";
import { MobileSidebar } from "../SideBar/MobileSideBar";
import { UserNav } from "../UserNav/UserNav";

const AppBar = () => {
  // const location = useLocation();
  // const [currentPath, setCurrentPath] = useState("/");
  const { i18n, t } = useTranslation("navbar");
  // const { unSeenNotificationsNumber } = useNotificationsStore();

  const changeWebsiteLanguage = () => {
    const currentLanguage = localStorage.getItem("i18nextLng");
    if (currentLanguage === "ar") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
    }
  };

  // useEffect(() => {
  //   setCurrentPath(location.pathname);
  // }, [location]);

  return (
    <div className="border-b bg-white flex h-16 items-center px-8 md:pe-24">
      <div className="flex items-center gap-5">
        <MobileSidebar />
        {/* <BreadCrumbs path={currentPath} /> */}
      </div>
      <div className="ms-auto flex items-center gap-5">
        {/* <DropdownMenu dir={i18n.dir(i18n.language)}>
          <DropdownMenuTrigger asChild className="outline-0">
            <Button variant="link" className="p-0 relative outline-0">
              {unSeenNotificationsNumber > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs absolute -top-1 -right-1 outline-0">
                  {unSeenNotificationsNumber}
                </span>
              )}
              <Bell className="h-5 w-5 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 mx-20">
            <NotificationsList />
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Badge className="bg-red-500 hover:bg-red-500 py-2 rounded-md">
          {t("underDevelopment")}
        </Badge>
        <Button variant="link" className="p-0" onClick={changeWebsiteLanguage}>
          <Globe className="h-5 w-5 text-gray-500" />
        </Button>
        <UserNav />
      </div>
    </div>
  );
};

export default AppBar;
