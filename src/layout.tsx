import { Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBar from "./components/common/SideBar/SideBar";
import AppBar from "./components/common/AppBar/AppBar";
import { useAuthStore } from "./hooks/useAuthStore";
import { Toaster } from "@/components/ui/toaster";
import InitialDataProvider from "./providers/initialDataProvider";
import axios from "axios";
// import ChatBubble from "./components/common/chat-bubble";

const PageLayout = () => {
  const token = useAuthStore((state) => state.token);
  const setLoginData = useAuthStore((state) => state.setLoginData);
  const clearUserData = useAuthStore((state) => state.clearUserData);
  const { i18n } = useTranslation();
  if (!token) {

    // fetch user data from local storage
    const token = localStorage.getItem("FM_token");
    const name = localStorage.getItem("FM_name");
    const id = localStorage.getItem("FM_id");
    const type = localStorage.getItem("FM_type");

    
    if(!token || !name || !id || !type){
      // clear user data from store
      clearUserData();
      
      // redirect to login page
      return <Navigate to="/login" />;
    }
    
    // set axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // set user data to store
    setLoginData(token, name, id, type);
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
        <div className="mt-16 w-full px-12 py-12 max-sm:px-4">
          <InitialDataProvider>
            <Outlet />
            <Toaster />
          </InitialDataProvider>
        </div>
      </div>
      {/* <ChatBubble /> */}
    </div>
  );
};

export default PageLayout;
