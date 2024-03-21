import { Transaction } from "@/components/Transactions/schema";
import { useParkAccountTransactionsColumns } from "@/components/Transactions/TableView/Columns";
import { DataTable } from "@/components/Transactions/TableView/DataTable";
import { Button } from "@/components/ui/button";

const ParkAccountsTransactions = () => {
  const columns = useParkAccountTransactionsColumns();

  const data: Transaction[] = [
    {
      id: 1,
      code: "TR001",
      created_at: "2022-01-01",
      posted_by: "User1",
      posted_by_id: 1,
      type: "Supplier",
      description: "Transaction 1",
      cost_center: true,
      debit: 1000,
      credit: 0,
      currency: "USD",
    },
    {
      id: 2,
      code: "TR002",
      created_at: "2022-02-01",
      posted_by: "User2",
      posted_by_id: 2,
      type: "Treasury",
      description: "Transaction 2",
      cost_center: false,
      debit: 0,
      credit: 2000,
      currency: "EUR",
    },
  ];

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Accounting Entries<span className="text-primary"> / Park</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Selected</Button>
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};
export default ParkAccountsTransactions;
