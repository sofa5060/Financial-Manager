import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import { useSubAccountsStore } from "@/hooks/useSubAccountsStore";
import AccountsManager from "@/managers/AccountsManager";
import CurrenciesManager from "@/managers/CurrenciesManager";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type initialDataProviderProps = {
  children?: React.ReactNode;
};
const InitialDataProvider = ({ children }: initialDataProviderProps) => {
  const setCurrencies = useCurrenciesStore((state) => state.setCurrencies);
  const setAccounts = useSubAccountsStore((state) => state.setSubAccounts);

  // fetch currencies
  const { data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: CurrenciesManager.getCurrencies,
  });

  // store currencies
  useEffect(() => {
    if (currencies) {
      setCurrencies(currencies);
    }
  }, [currencies, setCurrencies]);

  // fetch accounts
  const { data: accounts } = useQuery({
    queryKey: ["sub-accounts"],
    queryFn: () => AccountsManager.getSubAccounts(1, 1000),
  });

  // store accounts
  useEffect(() => {
    if (accounts) {
      setAccounts(accounts);
    }
  }, [accounts, setAccounts]);

  return <div>{children}</div>;
};
export default InitialDataProvider;
