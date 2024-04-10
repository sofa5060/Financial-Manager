import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { useTreasuryReceiptBondsColumns } from "@/components/Treasury/TableView/Columns";
import { DataTable } from "@/components/Treasury/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TreasuryManager from "@/managers/TreasuryManager";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useNavigate } from "react-router-dom";

const TreasuryReceipts = () => {
  const columns = useTreasuryReceiptBondsColumns();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bonds", "receive", "page", page, "size", size],
    queryFn: () => TreasuryManager.getReceiveTreasuryBonds(page, size),
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
      title: "Failed to fetch entries",
    });
    return <></>;
  }

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Treasury <span className="text-primary">Receive bonds</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline mr-4">Print Selected</Button>
          <Button className="btn-primary"
            onClick={() => navigate("/treasury/receive/new")}
          >
            <Plus className="mr-2 w-4" />
            New Entry
          </Button>
        </div>
      </div>
      <DataTable data={data!.bonds} columns={columns} />
      <PaginationAndSizeFooter
        page={page}
        setPage={setPage}
        totalPages={data!.totalPages}
        size={size}
        setSize={setSize}
      />
    </div>
  );
};
export default TreasuryReceipts;
