import TemplateForm from "@/components/Templates/Dialogs/TemplateForm";
import { toast } from "@/components/ui/use-toast";
import TemplatesManager from "@/managers/TemplatesManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useParams } from "react-router-dom";

const EditTemplateForm = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["template", id],
    queryFn: () => TemplatesManager.getTemplate(parseInt(id as string)),
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
      title: "Failed to fetch template",
    });
    return <></>;
  }

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Edit Account <span className="text-primary">Template</span>
        </h1>
      </div>
      <div className="mt-7 ml-2">
        <TemplateForm type="edit" template={data!} />
      </div>
    </div>
  );
};
export default EditTemplateForm;
