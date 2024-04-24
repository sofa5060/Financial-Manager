import { NewTransaction } from "@/components/Transactions/schema";
import { Input } from "@/components/ui/input";
import { useCategoriesStore } from "@/hooks/useCategories";
import { useSubAccountsStore } from "@/hooks/useSubAccountsStore";
import { useSubCostCentersStore } from "@/hooks/useSubCostCenters";
import { PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

type DynamicTableFormProps = {
  transactions: NewTransaction[];
  setTransactions: (transactions: NewTransaction[]) => void;
  isDefaultCurrency: boolean;
  disabled: boolean;
  rate?: number;
  type: "view" | "edit" | "apply";
};

const DynamicTableForm = ({
  transactions,
  setTransactions,
  isDefaultCurrency,
  disabled,
  rate,
  type,
}: DynamicTableFormProps) => {
  const { t, i18n } = useTranslation("templates");
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

  const [rows, setRows] = useState<NewTransaction[]>(
    transactions.length
      ? transactions.map((transaction) => ({
          account_id: transaction.account_id,
          category_id: transaction.category_id,
          cost_center_id: transaction.cost_center_id,
          f_debit: transaction.f_debit === 0 ? null : transaction.f_debit,
          f_credit: transaction.f_credit === 0 ? null : transaction.f_credit,
          description: transaction.description,
          debit: transaction.debit === 0 ? undefined : transaction.debit,
          credit: transaction.credit === 0 ? undefined : transaction.credit,
        }))
      : [
          {
            account_id: undefined,
            category_id: null,
            cost_center_id: null,
            f_debit: null,
            f_credit: null,
            description: "",
            debit: undefined,
            credit: undefined,
          },
        ]
  );

  const handleChange = (
    index: number,
    field: string,
    value: string | number | null
  ) => {
    const updatedRows = [...rows];
    if (field === "debit" || field === "credit" || field === "account_id") {
      updatedRows[index][field] =
        value === "" ? undefined : parseFloat(value as string);
    } else if (field === "f_debit" || field === "f_credit") {
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
      f_debit: null,
      f_credit: null,
      description: "",
      debit: undefined,
      credit: undefined,
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
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("accountCategory")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("accountCode")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("accountName")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("description")}
            </th>
            {type === "apply" && (
              <>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("debit")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("credit")}
                </th>
                {type === "apply" && !isDefaultCurrency && (
                  <>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("debitInForeignCurrency")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("creditInForeignCurrency")}
                    </th>
                  </>
                )}
              </>
            )}
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("costCenter")}
            </th>
            {!disabled && (
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    i18n.language
                      ? enSubAccountOptions.find(
                          (option) => option.value === row.account_id
                        )
                      : arSubAccountOptions.find(
                          (option) => option.value === row.account_id
                        )
                  }
                  className="min-w-48"
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
              {type === "apply" && (
                <>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Input
                      type="number"
                      value={
                        !isDefaultCurrency
                          ? (row.f_debit as number) * rate!
                          : row.debit
                      }
                      onChange={(e) =>
                        handleChange(index, "debit", e.target.value)
                      }
                      required
                      className="w-36"
                      disabled={
                        row.credit !== undefined ||
                        !isDefaultCurrency ||
                        disabled
                      }
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Input
                      type="number"
                      value={
                        !isDefaultCurrency
                          ? (row.f_credit as number) * rate!
                          : row.credit
                      }
                      onChange={(e) =>
                        handleChange(index, "credit", e.target.value)
                      }
                      required
                      className="w-36"
                      disabled={
                        row.debit !== undefined ||
                        !isDefaultCurrency ||
                        disabled
                      }
                    />
                  </td>
                </>
              )}
              {type === "apply" && !isDefaultCurrency && (
                <>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Input
                      type="number"
                      value={row.f_debit as number}
                      onChange={(e) =>
                        handleChange(index, "f_debit", e.target.value)
                      }
                      required
                      className="w-36"
                      disabled={row.f_credit !== null || disabled}
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Input
                      type="number"
                      value={row.f_credit as number}
                      onChange={(e) =>
                        handleChange(index, "f_credit", e.target.value)
                      }
                      required
                      className="w-36"
                      disabled={row.f_debit !== null || disabled}
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
