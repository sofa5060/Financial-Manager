import { Currency } from "@/managers/CurrenciesManager";
import { create } from "zustand";

type State = {
  currencies: Currency[];
  defaultCurrency: Currency | null;
  currenciesOptions: { value: number; label: string }[];
};

type Actions = {
  setCurrencies: (currencies: Currency[]) => void;
};

export const useCurrenciesStore = create<State & Actions>((set) => ({
  currencies: [],
  defaultCurrency: null,
  currenciesOptions: [],
  setCurrencies: (currencies) =>
    set({
      currencies,
      defaultCurrency: currencies.find(
        (currency) => currency.functional_currency
      ),
      currenciesOptions: currencies.map((currency) => ({
        value: currency.id,
        label: currency.functional_currency ? "Default" : currency.currency,
      })),
    }),
}));
