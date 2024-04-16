import EntryForm from "@/components/Entries/Dialogs/EntryForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const EditParkAccountEntry = () => {
  const { t } = useTranslation("entries");
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["entry", id],
    queryFn: () => AccountingEntriesManager.getEntry(parseInt(id as string)),
    enabled: !!id,
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
      title: t("entry.failed"),
    });
    return <></>;
  }

  console.log(data);

  return (
    <div>
      <div className="flex gap-5 justify-between max-sm:flex-col">
        <h1 className="font-semibold text-2xl">
          {t("editAccountingEntry")} /{" "}
          <span className="text-primary">{t("park")}</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">{t("printEntry")}</Button>
        </div>
      </div>
      <div className="mt-7 ms-2">
        <EntryForm type="edit" entry={data!} />
      </div>
    </div>
  );
};
export default EditParkAccountEntry;
