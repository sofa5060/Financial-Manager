import AccountForm from "@/components/Accounts/Hierarchical/AccountForm";
import Filter from "@/components/Accounts/Hierarchical/Filter";
import HierarchicalAccounts from "@/components/Accounts/Hierarchical/HierarchicalAccounts";
import { Account } from "@/components/Accounts/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const AccountsCharts = () => {
  const ACCOUNTS: Account[] = [
    {
      id: "1",
      code: "001",
      name_en: "Account 1",
      name_ar: "حساب 1",
      properties: "main",
      type: "debit",
      reporting_type: "balance_sheet",
      cost_center: true,
      parentId: undefined,
      categories: [1, 2, 3],
      currencies: [0],
      children: [
        {
          id: "2",
          code: "001.1",
          children: [
            {
              id: "3",
              code: "001.1",
              children: [],
              name_en: "Account 1.1",
              name_ar: "حساب 1.1",
              properties: "sub",
              type: "debit",
              reporting_type: "balance_sheet",
              cost_center: true,
              parentId: "1",
              categories: [1, 2, 3],
              currencies: [0, 1],
            },
            {
              id: "3",
              code: "001.1",
              children: [],
              name_en: "Account 1.1",
              name_ar: "حساب 1.1",
              properties: "sub",
              type: "debit",
              reporting_type: "balance_sheet",
              cost_center: true,
              parentId: "1",
              categories: [1, 2, 3],
              currencies: [0, 1],
            },
          ],
          name_en: "Account 1.1",
          name_ar: "حساب 1.1",
          properties: "sub",
          type: "debit",
          reporting_type: "balance_sheet",
          cost_center: true,
          parentId: "1",
          categories: [1, 2, 3],
          currencies: [0, 1],
        },
      ],
    },
    {
      id: "1",
      code: "001",
      name_en: "Account 1",
      name_ar: "حساب 1",
      properties: "main",
      type: "debit",
      reporting_type: "balance_sheet",
      cost_center: true,
      parentId: undefined,
      categories: [1, 2, 3],
      currencies: [0],
      children: [
        {
          id: "2",
          code: "001.1",
          children: [
            {
              id: "3",
              code: "001.1",
              children: [],
              name_en: "Account 1.1",
              name_ar: "حساب 1.1",
              properties: "sub",
              type: "debit",
              reporting_type: "balance_sheet",
              cost_center: true,
              parentId: "1",
              categories: [1, 2, 3],
              currencies: [0, 1],
            },
          ],
          name_en: "Account 1.1",
          name_ar: "حساب 1.1",
          properties: "sub",
          type: "debit",
          reporting_type: "balance_sheet",
          cost_center: true,
          parentId: "1",
          categories: [1, 2, 3],
          currencies: [0, 1],
        },
      ],
    },
  ];

  return (
    <div className="pb-12">
      <div className="flex justify-between">
        <h1 className="text-primary text-3xl font-semibold">
          Chart Of Accounts
        </h1>
        <Button className="btn-outline">Download Excel File</Button>
      </div>
      <div className="flex mb-4 mt-8 justify-between gap-16">
        <Input placeholder="Search by code or name" className="max-w-2xl" />
        <div className="flex gap-4">
          <Filter
            title="Filter 1"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
          />
          <Filter
            title="Filter 2"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            defaultSelected={["1"]}
          />
          <Filter
            title="Filter 3"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            defaultSelected={["1", "2"]}
          />
        </div>
      </div>
      <Separator />
      <HierarchicalAccounts accounts={ACCOUNTS} />
      <div className="fixed bottom-16 right-32">
        <AccountForm level={1}>
          <Button className="btn btn-primary">
            <Plus className="w-6 h-6 mr-2" />
            Create New Account in Level 1
          </Button>
        </AccountForm>
      </div>
    </div>
  );
};
export default AccountsCharts;
