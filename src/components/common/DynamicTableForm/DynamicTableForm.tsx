import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

const DynamicTableForm = () => {
  const [rows, setRows] = useState([
    {
      accountCategory: "",
      accountCode: "",
      accountName: "",
      description: "",
      costCenter: "",
      debit: "",
      credit: "",
    },
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field as keyof (typeof rows)[0]] = value;
    setRows(updatedRows);

    // Add a new row if the last row is being edited
    if (index === rows.length - 1) {
      setRows([
        ...updatedRows,
        {
          accountCategory: "",
          accountCode: "",
          accountName: "",
          description: "",
          costCenter: "",
          debit: "",
          credit: "",
        },
      ]);
    }
  };

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const addRowAfter = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index + 1, 0, {
      accountCategory: "",
      accountCode: "",
      accountName: "",
      description: "",
      costCenter: "",
      debit: "",
      credit: "",
    });
    setRows(updatedRows);
  };

  return (
    <form>
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
                  value={row.accountCategory}
                  onChange={(e) =>
                    handleChange(index, "accountCategory", e.target.value)
                  }
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Input
                  type="text"
                  value={row.accountCode}
                  onChange={(e) =>
                    handleChange(index, "accountCode", e.target.value)
                  }
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Input
                  type="text"
                  value={row.accountName}
                  onChange={(e) =>
                    handleChange(index, "accountName", e.target.value)
                  }
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Input
                  type="text"
                  value={row.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Input
                  type="text"
                  value={row.costCenter}
                  onChange={(e) =>
                    handleChange(index, "costCenter", e.target.value)
                  }
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Input
                  type="text"
                  value={row.debit}
                  onChange={(e) => handleChange(index, "debit", e.target.value)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Input
                  type="text"
                  value={row.credit}
                  onChange={(e) =>
                    handleChange(index, "credit", e.target.value)
                  }
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
    </form>
  );
};

export default DynamicTableForm;
