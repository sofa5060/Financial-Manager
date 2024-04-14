import { Separator } from "@/components/ui/separator";
import SettingsLayout from "../../settings-layout";
import ViewPermissionsForm from "./Forms/ViewPermissionsForm";
import ModifyPermissionsForm from "./Forms/ModifyPermissionsForm";

const PermissionsPage = () => {
  return (
    <SettingsLayout>
      <div className="max-w-xl mx-auto space-y-16">
        <ViewPermissionsForm />
        <Separator />
        <ModifyPermissionsForm />
      </div>
    </SettingsLayout>
  );
};

export default PermissionsPage;
