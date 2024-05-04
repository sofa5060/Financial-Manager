import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { useTemplatesColumns } from "@/components/Templates/TableView/Columns";
import { DataTable } from "@/components/Templates/TableView/DataTable";
import { toast } from "@/components/ui/use-toast";
import TemplatesManager from "@/managers/TemplatesManager";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useTranslation } from "react-i18next";

const AccountsTemplates = () => {
  const { t } = useTranslation("templates");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const columns = useTemplatesColumns(page, size);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["templates", "page", page, "size", size],
    queryFn: () => TemplatesManager.getTemplates(page, size),
  });

  if (isLoading)
    return (
      <div className="grid place-items-center w-full h-full min-h-screen">
        <FlowerSpinner color="green" size={100} />
      </div>
    );

  if (isError) {
    toast({
      variant: "destructive",
      title: t("templates.failed"),
    });
    return <></>;
  }

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          {t("accounting")} <span className="text-primary">{t("templates")}</span>
        </h1>
      </div>
      <DataTable data={data!.templates} columns={columns} />
      <PaginationAndSizeFooter
        page={page}
        setPage={setPage}
        totalPages={data!.totalPages}
        size={size}
        setSize={setSize}
      />
    </div>
  );
};
export default AccountsTemplates;
