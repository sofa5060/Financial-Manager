import BondForm from "@/components/Treasury/Dialogs/BondForm";
import { TreasuryBond } from "@/components/Treasury/schema";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TreasuryManager from "@/managers/TreasuryManager";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useParams } from "react-router-dom";

const EditTreasuryReceiveBond = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bond", id, "receive"],
    queryFn: () => TreasuryManager.getBond(parseInt(id as string)),
    enabled: !!id,
  });

  const fixedData = useMemo(() => {
    if (!data) return null;
    console.log(data)
    const fixed: TreasuryBond = {
      ...data,
      transactions: data.transactions.map((transaction) => ({
        ...transaction,
        amount:
          transaction.debit && transaction.debit > 0
            ? transaction.debit
            : transaction.credit!,
        f_amount:
          transaction.f_debit && transaction.f_debit > 0
            ? transaction.f_debit
            : transaction.f_credit!,
      })),
    };
    
    // drop last element
    fixed.transactions.pop();

    return fixed;
  }, [data]);

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

  console.log(fixedData)

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
        <BondForm type="edit" bondType="receive" bond={fixedData!} />
      </div>
    </div>
  );
};
export default EditTreasuryReceiveBond;
