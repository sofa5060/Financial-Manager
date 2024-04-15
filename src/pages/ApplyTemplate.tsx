// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import TemplateForm from "@/components/Templates/Dialogs/TemplateForm";
import { toast } from "@/components/ui/use-toast";
import TemplatesManager from "@/managers/TemplatesManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const ApplyTemplateForm = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["template", id],
    queryFn: () => TemplatesManager.getTemplate(parseInt(id as string)),
    enabled: !!id,
  });

  const cachedData = useMemo(() => {
    if (!data) return data;

    data.transactions.map((transaction) => {
      transaction.debit = 0;
      transaction.credit = 0;
      transaction.f_credit = 0;
      transaction.f_debit = 0;
      delete transaction.company_id;
      delete transaction.created_at;
      delete transaction.entry_templete_id;
      delete transaction.id;
      delete transaction.updated_at;
      return transaction;
    });
    return data;
  }, [data, id]);

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
          Apply Account <span className="text-primary">Template</span>
        </h1>
      </div>
      <div className="mt-7 ms-2">
        <TemplateForm type="apply" template={cachedData!} />
      </div>
    </div>
  );
};
export default ApplyTemplateForm;
