import { Entry } from "@/components/Entries/schema";
import { useParkAccountingEntriesColumns } from "@/components/Entries/TableView/Columns";
import { DataTable } from "@/components/Entries/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ParkAccountingEntries = () => {
  const columns = useParkAccountingEntriesColumns();

  const data: Entry[] = [
    {
      id: 1,
      code: "1",
      status: "park",
      title: "Entry 1",
      currency: "USD",
      posted_by: null,
      posted_by_name: null,
      created_by_name: "User 1",
      amount: 100,
      company_id: 1,
      date: "2022-01-01",
      description: "Entry 1 description",
      created_at: "2022-01-01",
      updated_at: "2022-01-01",
      transactions: [
        {
          id: 1,
          account_id: 1,
          currency_id: 1,
          category_id: 1,
          cost_center_id: null,
          f_debit: 100,
          f_credit: 0,
          debit: 100,
          credit: 0,
          description: "Transaction 1",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Accounting Entries / <span className="text-primary">Park</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline mr-4">Print Selected</Button>
          <Button className="btn-primary">
            <Plus className="mr-2 w-4" />
            New Entry
          </Button>
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};
export default ParkAccountingEntries;
