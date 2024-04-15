import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { useTreasuryPaymentBondsColumns } from "@/components/Treasury/TableView/Columns";
import { DataTable } from "@/components/Treasury/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TreasuryManager from "@/managers/TreasuryManager";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useNavigate, useSearchParams } from "react-router-dom";

const TreasuryPayments = () => {
  const [searchParams] = useSearchParams();
  const columns = useTreasuryPaymentBondsColumns();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "bonds",
      "payment",
      "page",
      page,
      "size",
      size,
      "search",
      searchParams.toString(),
    ],
    queryFn: () =>
      TreasuryManager.getPaymentTreasuryBonds(
        page,
        size,
        searchParams.toString()
      ),
  });

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");

    setPage(page);
    setSize(size);
  }, [searchParams]);

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
          Treasury <span className="text-primary">Payment bonds</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline me-4">Print Selected</Button>
          <Button
            className="btn-primary"
            onClick={() => navigate("/treasury/payment/new")}
          >
            <Plus className="me-2 w-4" />
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
export default TreasuryPayments;
