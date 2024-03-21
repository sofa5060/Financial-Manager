import { Template } from "@/components/Templates/schema";
import { useTemplatesColumns } from "@/components/Templates/TableView/Columns";
import { DataTable } from "@/components/Templates/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountsTemplates = () => {
  const columns = useTemplatesColumns();
  const navigate = useNavigate();


  const data: Template[] = [
    {
      id: 1,
      code: "TB001",
      created_at: "2022-01-01",
      posted_at: "2022-01-02",
      title: "Title 1",
      posted_by: "User1",
      amount: 1000,
      currency: "USD",
    },
    {
      id: 2,
      code: "TB002",
      created_at: "2022-02-01",
      posted_at: "2022-02-02",
      title: "Title 2",
      posted_by: "User2",
      amount: 2000,
      currency: "EUR",
    },
  ];

  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          Accounting <span className="text-primary">Templates</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline mr-4">Print Selected</Button>
          <Button className="btn-primary"
            onClick={() => navigate("/treasury-payments/new")}
          >
            <Plus className="mr-2 w-4" />
            New Template
          </Button>
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};
export default AccountsTemplates;
