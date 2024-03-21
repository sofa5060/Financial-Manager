import { Entry } from "@/components/Entries/schema";
import { usePostAccountingEntriesColumns } from "@/components/Entries/TableView/Columns";
import { DataTable } from "@/components/Entries/TableView/DataTable";
import { Button } from "@/components/ui/button";

const PostAccountingEntries = () => {
  const columns = usePostAccountingEntriesColumns();

  const data: Entry[] = [
    {
      id: 1,
      code: "1",
      status: "post",
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
      transactions: [],
    },
  ];

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Accounting Entries / <span className="text-primary">Post</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Selected</Button>
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};
export default PostAccountingEntries;
