import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entry, EntryType, NewEntry, NewEntrySchema } from "../schema";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewTransaction, Transaction } from "@/components/Transactions/schema";
import DynamicTableForm from "./DynamicTableForm";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import { useEntryType } from "../data";
import { useBanksStore } from "@/hooks/useBanksStore";
import { formatDate } from "@/lib/utils";

type EntryFormProps = {
  type?: "view" | "edit" | "add";
  entry?: Entry;
};
const EntryForm = ({ type = "add", entry }: EntryFormProps) => {
  const [rate, setRate] = useState<number | undefined>(
    entry?.rate ?? undefined
  );
  const name = useAuthStore((state) => state.name);
  const currenciesOptions = useCurrenciesStore(
    (state) => state.currenciesOptions
  );
  const currencies = useCurrenciesStore((state) => state.currencies);
  const defaultCurrency = useCurrenciesStore((state) => state.defaultCurrency);
  const banksOptions = useBanksStore((state) => state.banksOptions);
  const [isDefaultCurrency, setIsDefaultCurrency] = useState(
    entry ? entry.currency_id === defaultCurrency?.id : true
  );
  const [isCheckPayment, setIsCheckPayment] = useState(
    entry ? entry.type === "check" : false
  );
  const [transactions, setTransactions] = useState<Transaction[]>(
    entry?.transactions || []
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { entryTypes } = useEntryType();

  const { mutate: addEntryMutate, isPending } = useMutation({
    mutationFn: AccountingEntriesManager.addEntry,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to add entry",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries"] });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast({
        title: "Entry added successfully",
      });

      navigate("/accounting-entries/park");
    },
  });

  const { mutate: editEntryMutate, isPending: isUpdating } = useMutation({
    mutationFn: (data: Entry) =>
      AccountingEntriesManager.updateEntry(data, entry!.id),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to edit entry",
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries"] });
      await queryClient.invalidateQueries({ queryKey: ["entry", entry!.id] });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast({
        title: "Entry edited successfully",
      });

      navigate("/accounting-entries/park");
    },
  });

  const HEADERS = {
    view: "View Entry",
    edit: "Edit Entry",
    add: "Add New Entry",
  };

  const form = useForm<NewEntry>({
    resolver: zodResolver(NewEntrySchema),
    defaultValues: {
      ...entry,
      transactions: [],
    },
  });

  const {
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = (data: NewEntry) => {
    data.transactions = transactions;

    console.log(data);
    if (type === "edit") {
      editEntryMutate(data as Entry);
      return;
    }
    addEntryMutate(data);
  };

  useEffect(() => {
    const value = form.getValues("rate");
    if (value) {
      setRate(value);
    } else {
      setRate(
        currencies.find(
          (currency) => currency.id === form.getValues("currency_id")
        )?.default_rate
      );
    }
  }, [form.watch("rate"), form.watch("currency_id"), currencies]);

  return (
    <div>
      <h2 className="font-medium text-lg">{HEADERS[type]}</h2>
      <Separator className="my-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex max-w-[50%] gap-4">
            {entry && (
              <FormField
                control={form.control}
                name="document_code"
                render={({ field }) => (
                  <FormItem className="flex gap-1 items-start flex-col w-full flex-1">
                    <FormLabel className="whitespace-nowrap">
                      Document Number
                    </FormLabel>
                    <div className="flex-col w-full">
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          disabled
                          defaultValue={entry.code}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex gap-1 items-start flex-col w-full flex-1">
                  <FormLabel className="whitespace-nowrap">Date</FormLabel>
                  <div className="flex-col w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="Pick a date"
                        type="date"
                        defaultValue={entry && formatDate(entry.date)}
                        disabled={type === "view"}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end flex-1 flex-col items-start gap-1">
              <label htmlFor="currency_id" className="font-medium text-sm">
                Currency
              </label>
              <div className="flex-col w-full">
                <Select
                  id="currency_id"
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  onChange={(val) => {
                    form.clearErrors("currency_id");
                    setValue("currency_id", val!.value);
                    setIsDefaultCurrency(val!.value === defaultCurrency?.id);
                  }}
                  defaultValue={currenciesOptions.find(
                    (currency) => currency.value === entry?.currency_id
                  )}
                  className="w-full"
                  options={currenciesOptions}
                />
                {errors.currency_id && (
                  <span className="error-text">
                    {errors.currency_id.message}
                  </span>
                )}
              </div>
            </div>
            {!isDefaultCurrency ? (
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem className="flex justify-end flex-1 flex-col items-start gap-1">
                    <FormLabel className="whitespace-nowrap">rate</FormLabel>
                    <div className="flex-col w-full">
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          placeholder="Rate (Optional)"
                          type="number"
                          value={field.value}
                          onChange={(e) => {
                            form.setValue(
                              "rate",
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            );
                          }}
                          disabled={type === "view"}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex justify-end flex-1 flex-col items-start gap-1">
                {/* Temp to keep design consistent */}
              </div>
            )}
          </div>
          <div className="flex items-center max-w-[50%] gap-4">
            <div className="flex justify-end flex-1 flex-col items-start gap-1">
              <label htmlFor="type" className="font-medium text-sm">
                Type
              </label>
              <div className="flex-col w-full">
                <Select
                  id="type"
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  onChange={(val) => {
                    form.clearErrors("type");
                    setValue("type", val!.value as EntryType);
                    setIsCheckPayment(val!.value === "check");
                  }}
                  defaultValue={entryTypes.find(
                    (entryType) => entryType.value === entry?.type
                  )}
                  className="w-full"
                  options={entryTypes}
                />
                {errors.type && (
                  <span className="error-text">{errors.type.message}</span>
                )}
              </div>
            </div>
            {isCheckPayment ? (
              <>
                <FormField
                  control={form.control}
                  name="check_no"
                  render={({ field }) => (
                    <FormItem className="flex justify-end flex-1 flex-col items-start gap-1">
                      <FormLabel className="whitespace-nowrap">
                        Check No
                      </FormLabel>
                      <div className="flex-col w-full">
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            placeholder="Check No"
                            type="text"
                            disabled={type === "view"}
                            value={field.value ?? undefined}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end flex-1 flex-col items-start gap-1">
                  <label htmlFor="bank_id" className="font-medium text-sm">
                    Bank
                  </label>
                  <div className="flex-col w-full">
                    <Select
                      id="currency_id"
                      isSearchable={false}
                      isClearable={false}
                      isDisabled={type === "view"}
                      onChange={(val) => {
                        form.clearErrors("bank_id");
                        setValue("bank_id", val!.value);
                      }}
                      defaultValue={banksOptions.find(
                        (bank) => bank.value === entry?.bank_id
                      )}
                      className="w-full"
                      options={banksOptions}
                    />
                    {errors.bank_id && (
                      <span className="error-text">
                        {errors.bank_id.message}
                      </span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-end flex-1 flex-col items-start gap-1"></div>
                <div className="flex justify-end flex-1 flex-col items-start gap-1"></div>
              </>
            )}
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex gap-1 items-start flex-col max-w-[50%]">
                <FormLabel className="whitespace-nowrap">Title</FormLabel>
                <div className="flex-col w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Title"
                      disabled={type === "view"}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex gap-1 items-start flex-col max-w-[50%]">
                <FormLabel className="whitespace-nowrap">Description</FormLabel>
                <div className="flex-col w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Description"
                      disabled={type === "view"}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="mt-4">
            <DynamicTableForm
              transactions={transactions}
              setTransactions={
                setTransactions as (transactions: NewTransaction[]) => void
              }
              isDefaultCurrency={isDefaultCurrency}
              disabled={type === "view"}
              rate={rate}
            />
          </div>
          <div className="flex gap-4 items-center max-w-[400px] ms-auto">
            <p className="whitespace-nowrap font-normal text-sm">
              Signature (Created by):
            </p>
            <Input
              className="w-full"
              placeholder="Created By"
              disabled
              value={name!}
            />
          </div>
          <div className="flex justify-end gap-4">
            {type === "view" ? (
              <>
                <Button
                  type="button"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  className="bg-gray-200 text-black"
                  disabled={isPending}
                >
                  Save As Template
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  className="bg-red-500"
                  disabled={isPending || isUpdating}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending || isUpdating}>
                  Save
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default EntryForm;
