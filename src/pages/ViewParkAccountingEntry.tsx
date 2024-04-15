import EntryForm from "@/components/Entries/Dialogs/EntryForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useParams } from "react-router-dom";

const ViewParkAccountEntry = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["entry", id],
    queryFn: () => AccountingEntriesManager.getEntry(parseInt(id as string)),
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
      title: "Failed to fetch entry",
    });
    return <></>;
  }

  console.log(data);

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          View Accounting Entry / <span className="text-primary">Park</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Entry</Button>
        </div>
      </div>
      <div className="mt-7 ms-2">
        <EntryForm type="view" entry={data!} />
      </div>
    </div>
  );
};
export default ViewParkAccountEntry;
