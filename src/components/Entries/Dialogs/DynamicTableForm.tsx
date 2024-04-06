import { NewTransaction } from "@/components/Transactions/schema";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_ROW = {
  accountCategory: "",
  account_id: undefined,
  currency_id: 2,
  category_id: null,
  cost_center_id: null,
  f_debit: 0,
  f_credit: 0,
  description: "",
  debit: undefined,
  credit: undefined,
};

type DynamicTableFormProps = {
  transactions: NewTransaction[];
  setTransactions: (transactions: NewTransaction[]) => void;
};

const DynamicTableForm = ({
  transactions,
  setTransactions,
}: DynamicTableFormProps) => {
  const [rows, setRows] = useState<NewTransaction[]>(
    transactions.length > 0 ? transactions : [DEFAULT_ROW]
  );

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    if (field === "debit" || field === "credit" || field === "account_id") {
      updatedRows[index][field] = parseFloat(value);
    } else {
      updatedRows[index][field as keyof (typeof rows)[0]] = value as never;
    }
    setRows(updatedRows);
  };

  const removeRow = (index: number) => {
    if (rows.length === 1) return; // Prevent removing the last row
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const addRowAfter = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index + 1, 0, DEFAULT_ROW);
    setRows(updatedRows);
  };

  useEffect(() => {
    setTransactions(rows);
  }, [rows]);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Account Category
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Account Code
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Account Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Description
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Cost Center
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Debit
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Credit
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <Input
                type="text"
                value={row.accountCategory!}
                onChange={(e) =>
                  handleChange(index, "accountCategory", e.target.value)
                }
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Input
                type="number"
                value={row.account_id}
                onChange={(e) =>
                  handleChange(index, "account_id", e.target.value)
                }
                required
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Input
                type="text"
                // value={row.accountName}
                // onChange={(e) =>
                //   handleChange(index, "accountName", e.target.value)
                // }
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Input
                type="text"
                value={row.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                required
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Input
                type="text"
                // value={row.costCenter}
                // onChange={(e) =>
                //   handleChange(index, "costCenter", e.target.value)
                // }
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Input
                type="number"
                value={row.debit}
                onChange={(e) => handleChange(index, "debit", e.target.value)}
                required
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Input
                type="number"
                value={row.credit}
                onChange={(e) => handleChange(index, "credit", e.target.value)}
                required
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex gap-2">
                <Trash2
                  className="w-5 text-red-500 cursor-pointer"
                  onClick={() => removeRow(index)}
                />
                <PlusCircle
                  className="w-5 text-primary cursor-pointer"
                  onClick={() => addRowAfter(index)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTableForm;
