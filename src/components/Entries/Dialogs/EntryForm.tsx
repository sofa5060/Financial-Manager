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
import { useState } from "react";
import { NewTransaction, Transaction } from "@/components/Transactions/schema";
import DynamicTableForm from "./DynamicTableForm";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import { useEntryType } from "../data";
import { useBanksStore } from "@/hooks/useBanksStore";

type EntryFormProps = {
  type?: "view" | "edit" | "add";
  entry?: Entry;
};
const EntryForm = ({ type = "add", entry }: EntryFormProps) => {
  const [isDefaultCurrency, setIsDefaultCurrency] = useState(true);
  const [isCheckPayment, setIsCheckPayment] = useState(false);
  const name = useAuthStore((state) => state.name);
  const currenciesOptions = useCurrenciesStore(
    (state) => state.currenciesOptions
  );
  const defaultCurrency = useCurrenciesStore((state) => state.defaultCurrency);
  const banksOptions = useBanksStore((state) => state.banksOptions);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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

  const HEADERS = {
    view: "View Entry",
    edit: "Edit Entry",
    add: "Add New Entry",
  };

  const form = useForm<NewEntry>({
    resolver: zodResolver(NewEntrySchema),
    defaultValues: {
      transactions: [],
    },
  });

  const {
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = (data: NewEntry) => {
    console.log(data);
    console.log(transactions);
    data.transactions = transactions;
    delete data.created_by;

    console.log(data);
    addEntryMutate(data);
  };

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
                  <FormLabel className="whitespace-nowrap">date</FormLabel>
                  <div className="flex-col w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="Pick a date"
                        type="date"
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
                    <Input {...field} className="w-full" placeholder="Title" />
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
            />
          </div>
          <FormField
            control={form.control}
            name="created_by"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center max-w-[400px] ms-auto">
                <FormLabel className="whitespace-nowrap font-normal">
                  Signature (Created by):
                </FormLabel>
                <div className="flex-col w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Created By"
                      disabled
                      value={name!}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4">
            <Button type="button" className="bg-red-500" disabled={isPending}>
              Cancel
            </Button>
            {type === "view" && (
              <Button
                type="button"
                className="bg-gray-200 text-black"
                disabled={isPending}
              >
                Save As Template
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default EntryForm;
