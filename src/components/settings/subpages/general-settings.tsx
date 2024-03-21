import { Input } from "@/components/ui/input";
import SettingsLayout from "../settings-layout";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

const GeneralSettingsPage = () => {
  const { t } = useTranslation("settings");
  return (
    <SettingsLayout>
      <div className="space-y-4">
        <div>
          <Label htmlFor="version">
            {t("settings.general.softwareVersion")}
          </Label>
          <Input id="version" value="0.0.1" disabled />
        </div>
        <div>
          <Label htmlFor="version">{t("settings.general.lastUpdated")}</Label>
          <Input id="version" value="29 January 2024" disabled />
        </div>
        <div>
          <Label htmlFor="owner">{t("settings.general.softwareOwner")}</Label>
          <Input id="owner" value="Ayatt Charity Association" disabled />
        </div>
        <div>
          <Label htmlFor="developer">{t("settings.general.developedBy")}</Label>
          <Input id="developer" value="Ersaa IT" disabled />
        </div>
      </div>
    </SettingsLayout>
  );
};

export default GeneralSettingsPage;
