import BondForm from "@/components/Treasury/Dialogs/BondForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TreasuryManager from "@/managers/TreasuryManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useParams } from "react-router-dom";

const EditTreasuryReceiveBond = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bond", "receive", id],
    queryFn: () => TreasuryManager.getBond(parseInt(id as string)),
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
      title: "Failed to fetch bond",
    });
    return <></>;
  }

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Edit Treasury / <span className="text-primary">Receive Bond</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Entry</Button>
        </div>
      </div>
      <div className="mt-7 ml-2">
        <BondForm type="edit" bondType="receive" bond={data!} />
      </div>
    </div>
  );
};
export default EditTreasuryReceiveBond;
