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
import {
  Template,
  TemplateType,
  NewTemplate,
  NewTemplateSchema,
} from "../schema";
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
import { useBanksStore } from "@/hooks/useBanksStore";
import { formatDate } from "@/lib/utils";
import TemplatesManager from "@/managers/TemplatesManager";
import { useEntryType } from "@/components/Entries/data";
import { useTranslation } from "react-i18next";

type TemplateFormProps = {
  type?: "view" | "edit" | "apply";
  template?: Template;
};
const TemplateForm = ({ type = "apply", template }: TemplateFormProps) => {
  const { t } = useTranslation("templates");
  const [rate, setRate] = useState<number | undefined>(
    template?.rate ?? undefined
  );
  const name = useAuthStore((state) => state.name);
  const currenciesOptions = useCurrenciesStore(
    (state) => state.currenciesOptions
  );
  const currencies = useCurrenciesStore((state) => state.currencies);
  const defaultCurrency = useCurrenciesStore((state) => state.defaultCurrency);
  const banksOptions = useBanksStore((state) => state.banksOptions);
  const [isDefaultCurrency, setIsDefaultCurrency] = useState(
    template ? template.currency_id === defaultCurrency?.id : true
  );
  const [isCheckPayment, setIsCheckPayment] = useState(
    template ? template.type === "check" : false
  );
  const [transactions, setTransactions] = useState<Transaction[]>(
    template?.transactions || []
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { entryTypes } = useEntryType();

  const { mutate: applyTemplateMutate, isPending } = useMutation({
    mutationFn: AccountingEntriesManager.addEntry,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("apply.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries"] });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast({
        title: t("apply.success"),
      });

      navigate("/accounting-entries/park");
    },
  });

  const { mutate: editTemplateMutate, isPending: isUpdating } = useMutation({
    mutationFn: (data: Template) =>
      TemplatesManager.updateTemplate(data, template!.id),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("edit.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["templates"] });
      await queryClient.invalidateQueries({
        queryKey: ["template", template!.id],
      });

      toast({
        title: t("edit.success"),
      });

      navigate("/accounts/templates");
    },
  });

  const HEADERS = {
    view: t("template.view"),
    edit: t("template.edit"),
    apply: t("template.apply"),
  };

  const form = useForm<NewTemplate>({
    resolver: zodResolver(NewTemplateSchema),
    defaultValues: {
      ...template,
      transactions: [],
    },
  });

  const {
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = (data: NewTemplate) => {
    if (type === "view") return;
    data.transactions = transactions;

    console.log(data);
    if (type === "edit") {
      editTemplateMutate(data as Template);
      return;
    }

    applyTemplateMutate(data);
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
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex gap-1 items-start flex-col w-full flex-1">
                  <FormLabel className="whitespace-nowrap">
                    {t("date")}
                  </FormLabel>
                  <div className="flex-col w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="Pick a date"
                        type="date"
                        defaultValue={template && formatDate(template.date)}
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
                {t("currency")}
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
                    (currency) => currency.value === template?.currency_id
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
                    <FormLabel className="whitespace-nowrap">
                      {t("rate")}
                    </FormLabel>
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
                {t("type")}
              </label>
              <div className="flex-col w-full">
                <Select
                  id="type"
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  onChange={(val) => {
                    form.clearErrors("type");
                    setValue("type", val!.value as TemplateType);
                    setIsCheckPayment(val!.value === "check");
                  }}
                  defaultValue={entryTypes.find(
                    (templateType) => templateType.value === template?.type
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
                        {t("checkNo")}
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
                    {t("bank")}
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
                        (bank) => bank.value === template?.bank_id
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
                <FormLabel className="whitespace-nowrap">
                  {t("title")}
                </FormLabel>
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
                <FormLabel className="whitespace-nowrap">
                  {t("description")}
                </FormLabel>
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
              type={type}
            />
          </div>
          <div className="flex gap-4 items-center max-w-[400px] ms-auto">
            <p className="whitespace-nowrap font-normal text-sm">
              {t("signature")}
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
                  className="bg-gray-200 text-black"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  {t("close")}
                </Button>
                <Button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    navigate(`/accounts/templates/${template!.id}/apply`);
                  }}
                >
                  {t("applyTemplate")}
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
                  {t("cancel")}
                </Button>
                <Button type="submit" disabled={isPending || isUpdating}>
                  {type === "apply" ? t("apply") : t("save")}
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default TemplateForm;
