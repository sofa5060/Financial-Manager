import HierarchicalAccounts from "@/components/Accounts/Hierarchical/HierarchicalAccounts";
import { Account } from "@/components/Accounts/shema";

const AccountsCharts = () => {
  const ACCOUNTS: Account[] = [
    {
      id: "1",
      serial: "AA11125",
      name: "Amir Hesham Khalil",
      type: "Main Account",
      children: [
        {
          id: "2",
          serial: "AA11124",
          name: "Sub Account",
          type: "Asset",
          children: [
            {
              id: "4",
              serial: "1.2.1",
              name: "Sub Account",
              type: "Asset",
              children: [
                {
                  id: "4",
                  serial: "1.2.1",
                  name: "Sub Account",
                  type: "Asset",
                  children: [
                    {
                      id: "4",
                      serial: "1.2.1",
                      name: "Sub Account",
                      type: "Asset",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "4",
              serial: "1.2.1",
              name: "Sub Account",
              type: "Asset",
              children: [],
            },
          ],
        },
        {
          id: "3",
          serial: "1.2",
          name: "Sub Account",
          type: "Asset",
          children: [
            {
              id: "4",
              serial: "1.2.1",
              name: "Sub Account",
              type: "Asset",
              children: [
                {
                  id: "4",
                  serial: "1.2.1",
                  name: "Sub Account",
                  type: "Asset",
                  children: [
                    {
                      id: "4",
                      serial: "1.2.1",
                      name: "Sub Account",
                      type: "Asset",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "5",
      serial: "AA11126",
      name: "Amir Hesham Khalil",
      type: "Main Account",
      children: [
        {
          id: "6",
          serial: "2.1",
          name: "Sub Account",
          type: "Asset",
          children: [],
        },
        {
          id: "7",
          serial: "2.2",
          name: "Sub Account",
          type: "Asset",
          children: [],
        },
      ],
    },
  ];

  return (
    <div className="pb-12">
      <h1 className="text-primary text-2xl font-semibold">Chart Of Accounts</h1>
      <HierarchicalAccounts accounts={ACCOUNTS} />
    </div>
  );
};
export default AccountsCharts;
