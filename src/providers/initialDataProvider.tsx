import { useBanksStore } from "@/hooks/useBanksStore";
import { useCategoriesStore } from "@/hooks/useCategories";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import { useSubAccountsStore } from "@/hooks/useSubAccountsStore";
import { useSubCostCentersStore } from "@/hooks/useSubCostCenters";
import { useUsersStore } from "@/hooks/useUsersStore";
import AccountsManager from "@/managers/AccountsManager";
import BanksManager from "@/managers/BanksManager";
import CategoriesManager from "@/managers/CategoriesManager";
import CostCentersManager from "@/managers/CostCentersManager";
import CurrenciesManager from "@/managers/CurrenciesManager";
import UsersManager from "@/managers/UsersManager";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type initialDataProviderProps = {
  children?: React.ReactNode;
};
const InitialDataProvider = ({ children }: initialDataProviderProps) => {
  const setCurrencies = useCurrenciesStore((state) => state.setCurrencies);
  const setAccounts = useSubAccountsStore((state) => state.setSubAccounts);
  const setSubCostCenters = useSubCostCentersStore(
    (state) => state.setSubCostCenters
  );
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const setBanks = useBanksStore((state) => state.setBanks);
  const setUsers = useUsersStore((state) => state.setUsers);

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

  // fetch sub cost centers
  const { data: subCostCenters } = useQuery({
    queryKey: ["sub-cost-centers"],
    queryFn: () => CostCentersManager.getSubCostCenters(1, 1000),
  });

  // store sub cost centers
  useEffect(() => {
    if (subCostCenters) {
      setSubCostCenters(subCostCenters);
    }
  }, [subCostCenters, setSubCostCenters]);

  // fetch categories
  const { data: categories } = useQuery({
    queryKey: ["categories", "page", 1, "size", 1000],
    queryFn: () => CategoriesManager.getCategories(1, 1000),
  });

  // store categories
  useEffect(() => {
    if (categories) {
      setCategories(categories.categories);
    }
  }, [categories, setCategories]);

  // fetch banks
  const { data: banks } = useQuery({
    queryKey: ["banks"],
    queryFn: BanksManager.getBanks,
  });

  // store banks
  useEffect(() => {
    if (banks) {
      setBanks(banks);
    }
  }, [banks, setBanks]);

  // fetch users
  const { data: usersResponse } = useQuery({
    queryKey: ["users"],
    queryFn: () => UsersManager.getUsers(1, 1000),
  });

  // store users
  useEffect(() => {
    if (usersResponse) {
      setUsers(usersResponse.users);
    }
  }, [usersResponse, setUsers]);

  return <div>{children}</div>;
};
export default InitialDataProvider;
