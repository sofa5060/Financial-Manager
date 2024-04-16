import EntryForm from "@/components/Entries/Dialogs/EntryForm";
import { useTranslation } from "react-i18next";

const NewParkAccountEntry = () => {
  const { t } = useTranslation("entries");
  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          {t("newAccountingEntry")} /{" "}
          <span className="text-primary">{t("park")}</span>
        </h1>
      </div>
      <div className="mt-7 ms-2">
        <EntryForm type="add" />
      </div>
    </div>
  );
};
export default NewParkAccountEntry;
