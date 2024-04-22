import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, NewAccount, NewAccountSchema } from "../schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { useData } from "./data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AccountsManager from "@/managers/AccountsManager";
import { useToast } from "@/components/ui/use-toast";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import { useCategoriesStore } from "@/hooks/useCategories";
import { useTranslation } from "react-i18next";
import { useReportsStore } from "@/hooks/useReportsStore";

type AccountFormProps = {
  level: number;
  type?: "add" | "edit" | "view";
  children?: React.ReactNode;
  parentAccount?: Account;
  account?: Account;
};

const AccountForm = ({
  children,
  level,
  parentAccount,
  account,
  type = "add",
}: AccountFormProps) => {
  const { t, i18n } = useTranslation("accounts");
  const { ACCOUNT_PROPERTIES, ACCOUNT_TYPES } = useData();

  const currenciesOptions = useCurrenciesStore(
    (state) => state.currenciesOptions
  );
  const categoriesOptions = useCategoriesStore(
    (state) => state.categoriesOptions
  );

  const enReportsOptions = useReportsStore((state) => state.enReportsOptions);
  const arReportsOptions = useReportsStore((state) => state.arReportsOptions);

  useEffect(() => {
    form.reset({
      cost_center: false,
      parent_id: parentAccount?.id ?? null,
      ...account,
      currencies: account
        ? account.currencies_ids?.map((currency) => currency.id)
        : [],
      categories: account
        ? account.categories_ids?.map((category) => category.id)
        : [],
      reporting_type: account
        ? account.reports_ids?.map((type) => type.id)
        : [],
    });
  }, [account]);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<NewAccount>({
    resolver: zodResolver(NewAccountSchema),
    defaultValues: {
      cost_center: false,
      parent_id: parentAccount?.id ?? null,
      ...account,
      currencies: account
        ? account.currencies_ids?.map((currency) => currency.id)
        : [],
      categories: account
        ? account.categories_ids?.map((category) => category.id)
        : [],
      reporting_type: account
        ? account.reports_ids?.map((type) => type.id)
        : [],
    },
  });

  const {
    formState: { errors },
    setValue,
  } = form;

  const TITLES = {
    add: t("add.level", { level: level }),
    edit: t("edit"),
    view: t("view"),
  };

  const DESCRIPTIONS = {
    add: t("clickSave"),
    edit: t("clickSave"),
    view: t("viewOnly"),
  };

  const { mutate: addAccountMutate, isPending } = useMutation({
    mutationFn: AccountsManager.addAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["accounts"] });
      await queryClient.invalidateQueries({ queryKey: ["sub-accounts"] });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: t("add.failed"),
        description: error.message,
      });
    },
  });

  const { mutate: updateAccountMutate, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: (data: Partial<Account>) =>
        AccountsManager.updateAccount(data, account!.id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["accounts"] });
        await queryClient.invalidateQueries({ queryKey: ["sub-accounts"] });
        setIsOpen(false);
      },
      onError: (error) => {
        console.log(error.message);
        toast({
          variant: "destructive",
          title: t("update.failed"),
          description: error.message,
        });
      },
    });

  const onSubmit: SubmitHandler<NewAccount> = (data) => {
    console.log(data);
    if (type === "add") {
      addAccountMutate(data);
    } else if (type === "edit") {
      updateAccountMutate(data as Partial<Account>);
    }
  };

  const closeDialog = () => {
    if (isPending || isPendingUpdate) return;
    form.reset();
    setIsOpen(false);
  };

  const openDialog = () => setIsOpen(true);

  console.log(form.formState.errors);

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? closeDialog : openDialog}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TITLES[type]}</DialogTitle>
          <DialogDescription>{DESCRIPTIONS[type]}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name_en"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end">
                  <FormLabel className="whitespace-nowrap">
                    {t("name.english")}
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        disabled={type === "view"}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name_ar"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end w-full">
                  <FormLabel className="whitespace-nowrap">
                    {t("name.arabic")}
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input
                        placeholder="جون دو"
                        disabled={type === "view"}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {parentAccount && (
              <FormItem className="flex gap-4 items-center justify-end w-full">
                <FormLabel className="whitespace-nowrap">
                  {t("parentAccount")}
                </FormLabel>
                <div className="flex-col w-full max-w-[65%]">
                  <Input
                    disabled
                    className="w-full"
                    value={`${parentAccount.name_ar} - ${parentAccount.code}`}
                  />
                </div>
              </FormItem>
            )}
            <div className="flex gap-4 items-center justify-end">
              <label htmlFor="properties" className="font-medium text-sm">
                {t("properties")}
              </label>
              <div className="flex-col w-full max-w-[65%]">
                <Select
                  id="properties"
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  onChange={(val) => {
                    form.clearErrors("properties");
                    setValue("properties", val!.value);
                    if (val!.value === "main") {
                      setValue("categories", []);
                      setValue("cost_center", false);
                      setValue("currencies", []);
                    } else {
                      setValue("cost_center", account?.cost_center || false);
                    }
                  }}
                  defaultValue={ACCOUNT_PROPERTIES.find(
                    (property) => property.value === account?.properties
                  )}
                  className="w-full"
                  options={ACCOUNT_PROPERTIES}
                />
                {errors.properties && (
                  <span className="error-text">
                    {errors.properties.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 items-center justify-end">
              <label htmlFor="type" className="font-medium text-sm">
                {t("type")}
              </label>
              <div className="flex-col w-full max-w-[65%]">
                <Select
                  id="type"
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  onChange={(val) => {
                    form.clearErrors("type");
                    setValue("type", val!.value);
                  }}
                  defaultValue={ACCOUNT_TYPES.find(
                    (type) => type.value === account?.type
                  )}
                  className="w-full"
                  options={ACCOUNT_TYPES}
                />
                {errors.type && (
                  <span className="error-text">{errors.type.message}</span>
                )}
              </div>
            </div>
            <div className="flex gap-4 items-center justify-end">
              <label htmlFor="reporting_type" className="font-medium text-sm">
                {t("reportingType")}
              </label>
              <div className="flex-col w-full max-w-[65%]">
                <Select
                  id="reporting_type"
                  isSearchable={true}
                  isClearable={true}
                  isMulti
                  isDisabled={type === "view"}
                  onChange={(values) => {
                    form.clearErrors("reporting_type");
                    setValue(
                      "reporting_type",
                      values!.map((val) => val.value)
                    );
                  }}
                  defaultValue={
                    i18n.language === "en"
                      ? account?.reports_ids?.map(
                          (type) =>
                            enReportsOptions.find(
                              (option) => option.value === type.id
                            )!
                        )
                      : account?.reports_ids?.map(
                          (type) =>
                            arReportsOptions.find(
                              (option) => option.value === type.id
                            )!
                        )
                  }
                  className="w-full"
                  options={
                    i18n.language === "en" ? enReportsOptions : arReportsOptions
                  }
                />
                {errors.reporting_type && (
                  <span className="error-text">
                    {errors.reporting_type.message}
                  </span>
                )}
              </div>
            </div>
            {form.getValues("properties") === "sub" && (
              <>
                <div className="flex gap-4 items-center justify-end">
                  <label htmlFor="categories" className="font-medium text-sm">
                    {t("categories")}
                  </label>
                  <div className="flex-col w-full max-w-[65%]">
                    <Select
                      id="categories"
                      isMulti
                      isSearchable={false}
                      isClearable={false}
                      isDisabled={type === "view"}
                      onChange={(values) => {
                        form.clearErrors("categories");
                        setValue(
                          "categories",
                          values!.map((val) => val.value)
                        );
                      }}
                      defaultValue={account?.categories_ids?.map(
                        (category) =>
                          categoriesOptions.find(
                            (option) => option.value === category.id
                          )!
                      )}
                      className="w-full"
                      options={categoriesOptions}
                    />
                    {errors.categories && (
                      <span className="error-text">
                        {errors.categories.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-end">
                  <label htmlFor="cost_center" className="font-medium text-sm">
                    {t("costCenter")}
                  </label>
                  <div className="flex-col w-full max-w-[65%]">
                    <Select
                      id="cost_center"
                      isSearchable={false}
                      isClearable={false}
                      isDisabled={type === "view"}
                      onChange={(val) => {
                        form.clearErrors("cost_center");
                        setValue("cost_center", val!.value);
                      }}
                      className="w-full"
                      options={[
                        { label: t("yes"), value: true },
                        { label: t("no"), value: false },
                      ]}
                      defaultValue={
                        account?.cost_center
                          ? { label: t("yes"), value: true }
                          : { label: t("no"), value: false }
                      }
                      value={
                        form.getValues("cost_center") === true
                          ? { label: t("yes"), value: true }
                          : { label: t("no"), value: false }
                      }
                    />
                    {errors.cost_center && (
                      <span className="error-text">
                        {errors.cost_center.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-end">
                  <label htmlFor="currencies" className="font-medium text-sm">
                    {t("currencies")}
                  </label>
                  <div className="flex-col w-full max-w-[65%]">
                    <Select
                      id="currencies"
                      isMulti
                      isSearchable={false}
                      isClearable={false}
                      isDisabled={type === "view"}
                      defaultValue={account?.currencies_ids?.map((currency) =>
                        currenciesOptions.find(
                          (option) => option.value === currency.id
                        )
                      )}
                      onChange={(values) => {
                        form.clearErrors("currencies");
                        setValue(
                          "currencies",
                          values!.map((val) => val!.value)
                        );
                      }}
                      className="w-full"
                      options={currenciesOptions}
                    />
                    {errors.currencies && (
                      <span className="error-text">
                        {errors.currencies.message}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center justify-between mt-2">
              {type === "view" ? (
                <>
                  <Button
                    type="button"
                    className="ms-auto"
                    onClick={closeDialog}
                  >
                    {t("close")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    className="bg-destructive"
                    onClick={closeDialog}
                    disabled={isPending || isPendingUpdate}
                  >
                    {t("cancel")}
                  </Button>
                  <Button type="submit" disabled={isPending || isPendingUpdate}>
                    {t("save")}
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AccountForm;
