import { NewTreasuryTransaction } from "@/components/Transactions/schema";
import { Input } from "@/components/ui/input";
import { useCategoriesStore } from "@/hooks/useCategories";
import { useSubAccountsStore } from "@/hooks/useSubAccountsStore";
import { useSubCostCentersStore } from "@/hooks/useSubCostCenters";
import { PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";

type DynamicTableFormProps = {
  transactions: NewTreasuryTransaction[];
  setTransactions: (transactions: NewTreasuryTransaction[]) => void;
  isDefaultCurrency: boolean;
  disabled: boolean;
  rate?: number;
};

const DynamicTableForm = ({
  transactions,
  setTransactions,
  isDefaultCurrency,
  disabled,
  rate,
}: DynamicTableFormProps) => {
  const subAccountOptions = useSubAccountsStore(
    (state) => state.subAccountOptions
  );
  const subAccountCodesOptions = useSubAccountsStore(
    (state) => state.subAccountCodesOptions
  );
  const subCostCentersOptions = useSubCostCentersStore(
    (state) => state.subCostCentersOptions
  );
  const categoriesOptions = useCategoriesStore(
    (state) => state.categoriesOptions
  );

  const [rows, setRows] = useState<NewTreasuryTransaction[]>(
    transactions.length
      ? transactions
      : [
          {
            account_id: undefined,
            category_id: null,
            cost_center_id: null,
            f_amount: 0,
            description: "",
            amount: 0,
          },
        ]
  );

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedRows = [...rows];
    if (field === "amount" || field === "account_id") {
      updatedRows[index][field] =
        value === "" ? undefined : parseFloat(value as string);
    } else if (field === "f_amount") {
      updatedRows[index][field] =
        value === "" ? null : parseFloat(value as string);
    } else {
      updatedRows[index][field as keyof (typeof rows)[0]] = value as never;
    }
    setRows(updatedRows);
  };

  const removeRow = (index: number) => {
    if (disabled) return;
    if (rows.length === 1) return; // Prevent removing the last row
    console.log(index);
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const addRowAfter = (index: number) => {
    if (disabled) return;
    const updatedRows = [...rows];
    updatedRows.splice(index + 1, 0, {
      account_id: undefined,
      category_id: null,
      cost_center_id: null,
      f_amount: 0,
      description: "",
      amount: 0,
    });
    setRows(updatedRows);
  };

  useEffect(() => {
    setTransactions(rows);
  }, [rows]);

  return (
    <div className="w-full pb-16 overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
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
              Amount
            </th>
            {!isDefaultCurrency && (
              <>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount in Foreign Currency
                </th>
              </>
            )}
            {!disabled && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Select
                  id="category_id"
                  isSearchable={false}
                  isClearable={false}
                  onChange={(val) => {
                    handleChange(index, "category_id", val!.value!);
                  }}
                  value={categoriesOptions.find(
                    (option) => option.value === row.account_id
                  )}
                  className="min-w-48"
                  options={categoriesOptions}
                  isDisabled={disabled}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Select
                  id="account_code"
                  isSearchable={false}
                  isClearable={false}
                  onChange={(val) => {
                    console.log(val);
                    handleChange(index, "account_id", val!.value);
                  }}
                  value={subAccountCodesOptions.find(
                    (option) => option.value === row.account_id
                  )}
                  className="min-w-40"
                  options={subAccountCodesOptions}
                  required
                  isDisabled={disabled}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Select
                  id="account_name"
                  isSearchable={false}
                  isClearable={false}
                  onChange={(val) => {
                    console.log(val);
                    handleChange(index, "account_id", val!.value);
                  }}
                  value={subAccountOptions.find(
                    (option) => option.value === row.account_id
                  )}
                  className="min-w-48"
                  options={subAccountOptions}
                  required
                  isDisabled={disabled}
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
                  className="min-w-64"
                  disabled={disabled}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Select
                  id="cost_center_id"
                  isSearchable={false}
                  isClearable={false}
                  onChange={(val) => {
                    handleChange(index, "cost_center_id", val!.value!);
                  }}
                  value={subCostCentersOptions.find(
                    (option) => option.value === row.cost_center_id
                  )}
                  className="min-w-48"
                  options={subCostCentersOptions}
                  isDisabled={disabled}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Input
                  type="number"
                  value={
                    !isDefaultCurrency
                      ? (row.f_amount as number) * rate!
                      : row.amount
                  }
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
                  required
                  className="min-w-32"
                  disabled={!isDefaultCurrency || disabled}
                />
              </td>
              {!isDefaultCurrency && (
                <>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Input
                      type="number"
                      value={row.f_amount as number}
                      onChange={(e) =>
                        handleChange(index, "f_amount", e.target.value)
                      }
                      required
                      className="min-w-32"
                      disabled={disabled}
                    />
                  </td>
                </>
              )}
              {!disabled && (
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTableForm;
