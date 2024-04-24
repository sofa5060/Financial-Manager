import { NewTreasuryTransaction } from "@/components/Transactions/schema";
import { Input } from "@/components/ui/input";
import { useCategoriesStore } from "@/hooks/useCategories";
import { useSubAccountsStore } from "@/hooks/useSubAccountsStore";
import { useSubCostCentersStore } from "@/hooks/useSubCostCenters";
import { PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation("treasury");
  const enSubAccountOptions = useSubAccountsStore(
    (state) => state.enSubAccountOptions
  );
  const arSubAccountOptions = useSubAccountsStore(
    (state) => state.arSubAccountOptions
  );
  const subAccounts = useSubAccountsStore((state) => state.subAccounts);
  const subAccountCodesOptions = useSubAccountsStore(
    (state) => state.subAccountCodesOptions
  );
  const enSubCostCentersOptions = useSubCostCentersStore(
    (state) => state.enSubCostCentersOptions
  );
  const arSubCostCentersOptions = useSubCostCentersStore(
    (state) => state.arSubCostCentersOptions
  );
  const arCategoriesOptions = useCategoriesStore(
    (state) => state.arCategoriesOptions
  );
  const enCategoriesOptions = useCategoriesStore(
    (state) => state.enCategoriesOptions
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
    value: string | number | null
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
    <div className="w-full pb-44 overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("accountCategory")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("accountCode")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("accountName")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("description")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("amount")}
            </th>
            {!isDefaultCurrency && (
              <>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("amountInForeignCurrency")}
                </th>
              </>
            )}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("costCenter")}
            </th>
            {!disabled && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {t("actions")}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-3 py-4 whitespace-nowrap">
                <Select
                  id="category_id"
                  isSearchable={true}
                  isClearable={true}
                  onChange={(val) => {
                    handleChange(index, "category_id", val!.value!);
                  }}
                  value={
                    row.category_id === null
                      ? null
                      : i18n.language === "en"
                      ? enCategoriesOptions.find(
                          (option) => option.value === row.category_id
                        )
                      : arCategoriesOptions.find(
                          (option) => option.value === row.category_id
                        )
                  }
                  className="min-w-48"
                  maxMenuHeight={180}
                  options={
                    i18n.language === "en"
                      ? enCategoriesOptions
                      : arCategoriesOptions
                  }
                  isDisabled={disabled}
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <Select
                  id="account_code"
                  isSearchable={true}
                  isClearable={false}
                  onChange={(val) => {
                    console.log(val);
                    handleChange(index, "account_id", val!.value);
                    handleChange(index, "cost_center_id", null);
                  }}
                  value={subAccountCodesOptions.find(
                    (option) => option.value === row.account_id
                  )}
                  className="min-w-40"
                  maxMenuHeight={180}
                  options={subAccountCodesOptions}
                  required
                  isDisabled={disabled}
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <Select
                  id="account_name"
                  isSearchable={true}
                  isClearable={false}
                  onChange={(val) => {
                    console.log(val);
                    handleChange(index, "account_id", val!.value);
                    handleChange(index, "cost_center_id", null);
                  }}
                  value={
                    i18n.language === "en"
                      ? enSubAccountOptions.find(
                          (option) => option.value === row.account_id
                        )
                      : arSubAccountOptions.find(
                          (option) => option.value === row.account_id
                        )
                  }
                  className="min-w-48"
                  maxMenuHeight={180}
                  options={
                    i18n.language === "en"
                      ? enSubAccountOptions
                      : arSubAccountOptions
                  }
                  required
                  isDisabled={disabled}
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
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
              <td className="px-3 py-4 whitespace-nowrap">
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
                  className="w-36"
                  disabled={!isDefaultCurrency || disabled}
                />
              </td>
              {!isDefaultCurrency && (
                <>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Input
                      type="number"
                      value={row.f_amount as number}
                      onChange={(e) =>
                        handleChange(index, "f_amount", e.target.value)
                      }
                      required
                      className="w-36"
                      disabled={disabled}
                    />
                  </td>
                </>
              )}
              {row.account_id &&
              subAccounts.find((acc) => acc.id === row.account_id)
                ?.cost_center ? (
                <td className="px-3 py-4 whitespace-nowrap">
                  <Select
                    id="cost_center_id"
                    isSearchable={true}
                    isClearable={false}
                    onChange={(val) => {
                      handleChange(index, "cost_center_id", val!.value!);
                    }}
                    value={
                      i18n.language === "en"
                        ? enSubCostCentersOptions.find(
                            (option) => option.value === row.cost_center_id
                          )
                        : arSubCostCentersOptions.find(
                            (option) => option.value === row.cost_center_id
                          )
                    }
                    className="min-w-48"
                  maxMenuHeight={180}
                    options={
                      i18n.language === "en"
                        ? enSubCostCentersOptions
                        : arSubCostCentersOptions
                    }
                    isDisabled={disabled}
                  />
                </td>
              ) : (
                <td className="px-3 py-4 whitespace-nowrap"></td>
              )}
              {!disabled && (
                <td className="px-3 py-4 whitespace-nowrap">
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
