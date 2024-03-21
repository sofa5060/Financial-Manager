import { TreasuryBond } from "@/components/Treasury/schema";
import { useTreasuryPaymentBondsColumns } from "@/components/Treasury/TableView/Columns";
import { DataTable } from "@/components/Treasury/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TreasuryPayments = () => {
  const columns = useTreasuryPaymentBondsColumns();
  const navigate = useNavigate();


  const data: TreasuryBond[] = [
    {
      id: 1,
      code: "TB001",
      created_at: "2022-01-01",
      posted_at: "2022-01-02",
      title: "Treasury Bond 1",
      posted_by: "User1",
      amount: 1000,
      currency: "USD",
    },
    {
      id: 2,
      code: "TB002",
      created_at: "2022-02-01",
      posted_at: "2022-02-02",
      title: "Treasury Bond 2",
      posted_by: "User2",
      amount: 2000,
      currency: "EUR",
    },
  ];

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Treasury <span className="text-primary">Payment bonds</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline mr-4">Print Selected</Button>
          <Button className="btn-primary"
            onClick={() => navigate("/treasury-payments/new")}
          >
            <Plus className="mr-2 w-4" />
            New Entry
          </Button>
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};
export default TreasuryPayments;
