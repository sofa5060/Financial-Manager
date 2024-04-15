import BondForm from "@/components/Treasury/Dialogs/BondForm";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const NewTreasuryReceiveBond = () => {
  const { t } = useTranslation("treasury");
  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          {t("newTreasury")} / <span className="text-primary">{t("receiveBond")}</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">{t("printBond")}</Button>
        </div>
      </div>
      <div className="mt-7 ms-2">
        <BondForm type="add" bondType="receive" />
      </div>
    </div>
  );
};
export default NewTreasuryReceiveBond;
