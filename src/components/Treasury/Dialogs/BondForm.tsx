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
import { BondType, NewBond, NewBondSchema, TreasuryBond } from "../schema";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  NewTreasuryTransaction,
  TreasuryTransaction,
} from "@/components/Transactions/schema";
import DynamicTableForm from "./DynamicTableForm";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import { useBanksStore } from "@/hooks/useBanksStore";
import TreasuryManager from "@/managers/TreasuryManager";
import { useEntryType } from "@/components/Entries/data";
// import { useSubCostCentersStore } from "@/hooks/useSubCostCenters";
import { useSubAccountsStore } from "@/hooks/useSubAccountsStore";
import { useTranslation } from "react-i18next";
import InputDate from "@/components/common/InputDate/InputDate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Attachment from "./attachment";

type BondFormProps = {
  type?: "view" | "edit" | "add";
  bondType: "receive" | "payment";
  bond?: TreasuryBond;
};

const BondForm = ({ type = "add", bond, bondType }: BondFormProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { t, i18n } = useTranslation("treasury");
  const name = useAuthStore((state) => state.name);
  const [rate, setRate] = useState<number | undefined>(bond?.rate ?? undefined);
  const currenciesOptions = useCurrenciesStore(
    (state) => state.currenciesOptions
  );
  const currencies = useCurrenciesStore((state) => state.currencies);
  const defaultCurrency = useCurrenciesStore((state) => state.defaultCurrency);
  const enBanksOptions = useBanksStore((state) => state.enBanksOptions);
  const arBanksOptions = useBanksStore((state) => state.arBanksOptions);
  // const subCostCentersOptions = useSubCostCentersStore(
  //   (state) => state.subCostCentersOptions
  // );
  const enSubAccountOptions = useSubAccountsStore(
    (state) => state.enSubAccountOptions
  );
  const arSubAccountOptions = useSubAccountsStore(
    (state) => state.arSubAccountOptions
  );
  const [isDefaultCurrency, setIsDefaultCurrency] = useState(
    bond ? bond.currency_id === defaultCurrency?.id : true
  );
  const [isCheckPayment, setIsCheckPayment] = useState(
    bond ? bond.type === "check" : false
  );
  const [transactions, setTransactions] = useState<TreasuryTransaction[]>(
    bond?.transactions || []
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { entryTypes } = useEntryType();

  const { mutate: addBondMutate, isPending } = useMutation({
    mutationFn:
      bondType === "receive"
        ? TreasuryManager.addReceiveTreasuryBond
        : TreasuryManager.addPaymentTreasuryBond,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("add.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bonds"] });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });

      setIsFormSubmitted(false);

      toast({
        title: t("add.success"),
      });

      if (bondType === "receive") {
        navigate("/treasury/receive");
      } else {
        navigate("/treasury/payment");
      }
    },
  });

  const { mutate: editBondMutate, isPending: isUpdating } = useMutation({
    mutationFn: (data: TreasuryBond) =>
      bondType === "receive"
        ? TreasuryManager.updateReceiveTreasuryBond(data, bond!.id)
        : TreasuryManager.updatePaymentTreasuryBond(data, bond!.id),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("edit.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bonds"] });
      await queryClient.invalidateQueries({ queryKey: ["bond", bond!.id] });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast({
        title: t("edit.success"),
      });

      if (bondType === "receive") {
        navigate("/treasury/receive");
      } else {
        navigate("/treasury/payment");
      }
    },
  });

  const HEADERS = {
    view: t("bond.view"),
    edit: t("bond.edit"),
    add: t("bond.add"),
  };

  const form = useForm<NewBond>({
    resolver: zodResolver(NewBondSchema),
    defaultValues: {
      ...bond,
      type: bond?.type ?? "cash",
      transactions: [],
    },
  });

  const {
    setValue,
    register,
    formState: { errors },
  } = form;

  const onSubmit = (data: NewBond) => {
    data.transactions = transactions;

    console.log(data);
    if (type === "edit") {
      setIsFormSubmitted(true);
      editBondMutate(data as TreasuryBond);
      return;
    }
    addBondMutate(data);
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

  console.log(form.formState.errors);

  return (
    <div>
      <h2 className="font-medium text-lg">{HEADERS[type]}</h2>
      <Separator className="my-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Accordion type="single" collapsible defaultValue={"item"}>
            <AccordionItem value="item">
              <AccordionTrigger>
                <h3 className="text-lg font-medium">{t("basicInfo")}</h3>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="flex max-w-[50%] gap-4 max-lg:flex-col max-sm:max-w-full lg:items-center">
                  {bond && (
                    <FormField
                      control={form.control}
                      name="document_code"
                      render={({ field }) => (
                        <FormItem className="flex gap-1 items-start flex-col w-full flex-1">
                          <FormLabel className="whitespace-nowrap">
                            {t("documentNo")}
                          </FormLabel>
                          <div className="flex-col w-full">
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full"
                                disabled
                                defaultValue={bond.code!}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                  <div className="flex justify-end flex-col items-start gap-1">
                    <label
                      htmlFor="currency_id"
                      className="font-medium text-sm"
                    >
                      {t("date")}
                    </label>
                    <div className="flex-col w-full">
                      <InputDate
                        value={form.getValues("date")}
                        onChange={(val) => {
                          setValue("date", val);
                        }}
                        disabled={type === "view"}
                        disableFuture
                      />
                      {errors.date && (
                        <span className="error-text">
                          {errors.date.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end flex-1 flex-col items-start gap-1">
                    <label
                      htmlFor="currency_id"
                      className="font-medium text-sm"
                    >
                      {t("currency")}
                    </label>
                    <div className="flex-col w-full">
                      <Select
                        id="currency_id"
                        isSearchable={true}
                        isClearable={false}
                        isDisabled={type === "view"}
                        onChange={(val) => {
                          form.clearErrors("currency_id");
                          setValue("currency_id", val!.value);
                          setIsDefaultCurrency(
                            val!.value === defaultCurrency?.id
                          );
                        }}
                        defaultValue={currenciesOptions.find(
                          (currency) => currency.value === bond?.currency_id
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
                                value={field.value!}
                                onChange={(e) => {
                                  form.setValue(
                                    "rate",
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : null
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
                <div className="flex items-center max-w-[50%] gap-4 max-sm:max-w-full max-md:flex-col max-md:items-start">
                  <div className="flex justify-end flex-1 flex-col items-start gap-1 w-full">
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
                          setValue("type", val!.value as BondType);
                          setIsCheckPayment(val!.value === "check");
                        }}
                        defaultValue={
                          bond
                            ? entryTypes.find(
                                (entryType) => entryType.value === bond?.type
                              )
                            : entryTypes[0]
                        }
                        className="w-full"
                        options={entryTypes}
                      />
                      {errors.type && (
                        <span className="error-text">
                          {errors.type.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {isCheckPayment ? (
                    <>
                      <FormField
                        control={form.control}
                        name="check_no"
                        render={({ field }) => (
                          <FormItem className="flex justify-end flex-1 flex-col items-start gap-1 w-full">
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
                      <div className="flex justify-end flex-1 flex-col items-start gap-1 w-full">
                        <label
                          htmlFor="bank_id"
                          className="font-medium text-sm"
                        >
                          {t("bank")}
                        </label>
                        <div className="flex-col w-full">
                          <Select
                            id="bank_id"
                            isSearchable={true}
                            isClearable={false}
                            isDisabled={type === "view"}
                            onChange={(val) => {
                              form.clearErrors("bank_id");
                              setValue("bank_id", val!.value);
                            }}
                            defaultValue={
                              bond
                                ? i18n.language === "en"
                                  ? enBanksOptions.find(
                                      (bank) => bank.value === bond?.bank_id
                                    )
                                  : arBanksOptions.find(
                                      (bank) => bank.value === bond?.bank_id
                                    )
                                : undefined
                            }
                            className="w-full"
                            options={
                              i18n.language === "en"
                                ? enBanksOptions
                                : arBanksOptions
                            }
                          />
                          {errors.bank_id && (
                            <span className="error-text">
                              {errors.bank_id.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end flex-1 flex-col items-start gap-1">
                        <label
                          htmlFor="currency_id"
                          className="font-medium text-sm"
                        >
                          {t("checkDate")}
                        </label>
                        <div className="flex-col w-full">
                          <InputDate
                            value={form.getValues("check_date")}
                            onChange={(val) => {
                              setValue("check_date", val);
                            }}
                            disabled={type === "view"}
                          />
                          {errors.check_date && (
                            <span className="error-text">
                              {errors.check_date.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-end flex-1 flex-col items-start gap-1"></div>
                      <div className="flex justify-end flex-1 flex-col items-start gap-1"></div>
                      <div className="flex justify-end flex-1 flex-col items-start gap-1"></div>
                    </>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="ref_no"
                  render={({ field }) => (
                    <FormItem className="flex gap-1 items-start flex-col max-w-[50%] w-full max-sm:max-w-full">
                      <FormLabel className="whitespace-nowrap">
                        {t("refNo")}
                      </FormLabel>
                      <div className="flex-col w-full">
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            placeholder={t("refNo")}
                            disabled={type === "view"}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Attachment
                  register={register}
                  isFormSubmitted={isFormSubmitted}
                  attachments={bond ? bond.attachments : undefined}
                  bondId={bond ? bond.id : undefined}
                  disabled={type === "view"}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex gap-1 items-start flex-col max-w-[50%] w-full max-sm:max-w-full">
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
                    <FormItem className="flex gap-1 items-start flex-col max-w-[50%] w-full max-sm:max-w-full">
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
                <div className="flex items-center max-w-[50%] gap-4  w-full max-sm:max-w-full">
                  <div className="flex justify-end flex-1 flex-col items-start gap-1">
                    <label
                      htmlFor="safe_account_id"
                      className="font-medium text-sm"
                    >
                      {t("safeAccount")}
                    </label>
                    <div className="flex-col w-full">
                      <Select
                        id="safe_account_id"
                        isSearchable={false}
                        isClearable={false}
                        isDisabled={type === "view"}
                        onChange={(val) => {
                          form.clearErrors("safe_account_id");
                          setValue("safe_account_id", val!.value as number);
                        }}
                        defaultValue={
                          i18n.language === "en"
                            ? enSubAccountOptions.find(
                                (account) =>
                                  account.value === bond?.safe_account_id
                              )
                            : arSubAccountOptions.find(
                                (account) =>
                                  account.value === bond?.safe_account_id
                              )
                        }
                        className="w-full"
                        options={
                          i18n.language === "en"
                            ? enSubAccountOptions
                            : arSubAccountOptions
                        }
                      />
                      {errors.safe_account_id && (
                        <span className="error-text">
                          {errors.safe_account_id.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-4">
            <DynamicTableForm
              transactions={transactions}
              setTransactions={
                setTransactions as (
                  transactions: NewTreasuryTransaction[]
                ) => void
              }
              isDefaultCurrency={isDefaultCurrency}
              disabled={type === "view"}
              rate={rate}
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
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  {t("close")}
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
                  {t("save")}
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default BondForm;
