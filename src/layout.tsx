import { Outlet } from "react-router-dom";
// import Appbar from "./components/common/AppBar/appbar";
// import { useAuth } from "./providers/auth-provider";
// import { useTranslation } from "react-i18next";
import SideBar from "./components/common/SideBar/SideBar";
// import ChatBubble from "./components/common/chat-bubble";

const PageLayout = () => {
  // const { token } = useAuth();
  // const { i18n } = useTranslation();
  // if (!token) {
  //   // If not authenticated, redirect to the login page
  //   return <Navigate to="/login" />;
  // }

  return (
    // <div lang={i18n.language} dir={i18n.dir(i18n.language)}>
    <div>
      <div className="hidden md:block border-r rtl:border-r-0 rtl:border-l fixed z-20 shadow-lg -mt-16">
        <SideBar />
      </div>
      <div className="md:ms-16">
        <div className="fixed w-full z-10 top-0">{/* <Appbar /> */}</div>
        <div className="mt-16 w-full px-12">
          <Outlet />
        </div>
      </div>
      {/* <ChatBubble /> */}
    </div>
  );
};

export default PageLayout;
