import { Button } from "@/components/ui/button";
import AuthManager from "@/managers/AuthManager";
import { FieldValues, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/hooks/useAuthStore";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation("login");
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const setLoginData = useAuthStore((state) => state.setLoginData);
  const clearUserData = useAuthStore((state) => state.clearUserData);

  useEffect(() => {
    localStorage.removeItem("FM_token");
    localStorage.removeItem("FM_name");
    localStorage.removeItem("FM_id");
    localStorage.removeItem("FM_type");

    clearUserData();
  }, []);


  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (data.email && data.password) {
      try {
        setIsLoading(true);
        const loginResponse = await AuthManager.login(
          data.email,
          data.password
        );
        setLoginData(
          loginResponse.token,
          loginResponse.data.name,
          loginResponse.data.user_id,
          loginResponse.data.type
        );

        // store in local storage
        localStorage.setItem("FM_token", loginResponse.token);
        localStorage.setItem("FM_name", loginResponse.data.name);
        localStorage.setItem("FM_id", loginResponse.data.user_id);
        localStorage.setItem("FM_type", loginResponse.data.type);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${loginResponse.token}`;

        navigate("/", { replace: true });
        toast({
          title: `Ahlan, ${loginResponse.data.name}`,
          description: loginResponse.message,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-gray-100 min-h-screen"
      dir={i18n.dir(i18n.language)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl bg-white "
      >
        <div className="hidden bg-cover lg:block lg:w-1/2">
          <img className="" src="/images/login.png" alt="" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-12 sm:h-20"
              src="/images/ayaat_logo.png"
              alt=""
            />
          </div>

          <div className="flex items-center justify-between mt-12">
            <span className="w-1/5 border-b lg:w-1/4"></span>

            <p className="text-xs text-center text-gray-500 uppercase">
              {t("login.title")}
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 text-start"
              htmlFor="LoggingEmailAddress"
            >
              {t("login.form.email")}
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email ? (
              <p className="text-xs px-2 pt-2 text-red-500">
                {errors.email.message as string}
              </p>
            ) : null}
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="loggingPassword"
              >
                {t("login.form.password")}
              </label>
              <a href="#" className="text-xs text-gray-500 hover:underline">
                {t("login.form.password.forgot")}
              </a>
            </div>

            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password ? (
              <p className="text-xs px-2 pt-2 text-red-500">
                {errors.password.message as string}
              </p>
            ) : null}
          </div>

          <div className="mt-6">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-800 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              {t("login.form.button")}
            </Button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <a
              href="#"
              className="text-xs text-gray-500 uppercase hover:underline"
            >
              {t("login.form.help")}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
