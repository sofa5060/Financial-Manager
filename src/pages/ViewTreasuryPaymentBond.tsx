import BondForm from "@/components/Treasury/Dialogs/BondForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TreasuryManager from "@/managers/TreasuryManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useParams } from "react-router-dom";

const ViewTreasuryPaymentBond = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bond", "payment", id],
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
      title: "Failed to fetch template",
    });
    return <></>;
  }

  console.log(data)

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          View Treasury / <span className="text-primary">Payment Bond</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Entry</Button>
        </div>
      </div>
      <div className="mt-7 ml-2">
        <BondForm type="view" bondType="payment" bond={data!} />
      </div>
    </div>
  );
};
export default ViewTreasuryPaymentBond;
