import { Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface BreadCrumbsProps {
  path: string;
}

const BreadCrumbs = ({ path }: BreadCrumbsProps) => {
  const { t } = useTranslation("navbar");

  const PATHS_TITLES: Record<string, string> = {
    tasks: t("tasks"),
    requests: t("requests"),
    stats: t("dashboard"),
    "tasks-archive": t("archive"),
  };

  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap text-sm max-sm:hidden">
      <Link to="" className="text-gray-600 flex items-center">
        <Home className="h-4 w-4 me-4" />
        Home
      </Link>

      <span className="mx-4 text-gray-500 dark:text-gray-300">/</span>

      <Link to={path} className="text-green-700 hover:underline capitalize">
        {path === "/" ? t("tasks") : PATHS_TITLES[path.split("/")[1]]}
      </Link>
    </div>
  );
};

export default BreadCrumbs;
