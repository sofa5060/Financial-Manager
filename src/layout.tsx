import { Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBar from "./components/common/SideBar/SideBar";
import AppBar from "./components/common/AppBar/AppBar";
import { useAuthStore } from "./hooks/useAuthStore";
// import ChatBubble from "./components/common/chat-bubble";

const PageLayout = () => {
  const token = useAuthStore((state) => state.token);
  const { i18n } = useTranslation();
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return (
    <div lang={i18n.language} dir={i18n.dir(i18n.language)}>
      <div className="hidden md:block border-r rtl:border-r-0 rtl:border-l fixed z-20 shadow-lg -mt-16">
        <SideBar />
      </div>
      <div className="md:ms-16">
        <div className="fixed w-full z-10 top-0">
          <AppBar />
        </div>
        <div className="mt-16 w-full px-12 py-12">
          <Outlet />
        </div>
      </div>
      {/* <ChatBubble /> */}
    </div>
  );
};

export default PageLayout;
