import TemplateForm from "@/components/Templates/Dialogs/TemplateForm";
import { Button } from "@/components/ui/button";

const AccountsTemplateForm = () => {
  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          New Account <span className="text-primary">Template</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Template</Button>
        </div>
      </div>
      <div className="mt-7 ml-2">
        <TemplateForm type="add" />
      </div>
    </div>
  );
};
export default AccountsTemplateForm;
