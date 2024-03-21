import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import SideBar from "./SideBar";

export function MobileSidebar() {
  const { i18n } = useTranslation();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-gray-400 hover:text-green-700 transition cursor-pointer block md:hidden" />
      </SheetTrigger>
      <SheetContent
        side={i18n.language === "ar" ? "right" : "left"}
        className="w-auto px-1"
      >
        <SideBar />
      </SheetContent>
    </Sheet>
  );
}
