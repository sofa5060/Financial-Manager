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
import { ACCOUNT_PROPERTIES, ACCOUNT_TYPES, REPORTING_TYPES } from "./data";
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
  const currenciesOptions = useCurrenciesStore(
    (state) => state.currenciesOptions
  );

  useEffect(() => {
    form.reset({
      currencies: [],
      categories: [],
      cost_center: false,
      parent_id: parentAccount?.id ?? null,
      ...account,
    });
  }, [account]);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<NewAccount>({
    resolver: zodResolver(NewAccountSchema),
    defaultValues: {
      currencies: [],
      categories: [],
      cost_center: false,
      parent_id: parentAccount?.id ?? null,
      ...account,
    },
  });

  const {
    formState: { errors },
    setValue,
  } = form;

  const TITLES = {
    add: `Add New Account in Level ${level}`,
    edit: "Edit Account",
    view: "View Account",
  };

  const DESCRIPTIONS = {
    add: "Click save when you're done",
    edit: "Click save when you're done",
    view: "The Record is View Only",
  };

  const { mutate: addAccountMutate, isPending } = useMutation({
    mutationFn: AccountsManager.addAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["accounts"] });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Failed to add account",
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
        setIsOpen(false);
      },
      onError: (error) => {
        console.log(error.message);
        toast({
          variant: "destructive",
          title: "Failed to update account",
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

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? closeDialog : openDialog}>
      <DialogTrigger>{children}</DialogTrigger>
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
                    Name (English)
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
                    Name (Arabic)
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
                  Parent Account
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
                Properties
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
                Type
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
                Reporting Type
              </label>
              <div className="flex-col w-full max-w-[65%]">
                <Select
                  id="reporting_type"
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  onChange={(val) => {
                    form.clearErrors("reporting_type");
                    setValue("reporting_type", val!.value);
                  }}
                  defaultValue={REPORTING_TYPES.find(
                    (reportingType) =>
                      reportingType.value === account?.reporting_type
                  )}
                  className="w-full"
                  options={REPORTING_TYPES}
                />
                {errors.reporting_type && (
                  <span className="error-text">
                    {errors.reporting_type.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 items-center justify-end">
              <label htmlFor="categories" className="font-medium text-sm">
                Category
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
                  className="w-full"
                  options={[
                    { label: "Tax", value: 0 },
                    { label: "Non-Tax", value: 1 },
                  ]}
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
                Cost Center
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
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                  defaultValue={
                    account?.cost_center
                      ? { label: "Yes", value: true }
                      : { label: "No", value: false }
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
                Currencies
              </label>
              <div className="flex-col w-full max-w-[65%]">
                <Select
                  id="currencies"
                  isMulti
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  defaultValue={account?.currencies?.map((currency) =>
                    currenciesOptions.find(
                      (option) => option.value === currency
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
            <div className="flex items-center justify-between mt-2">
              {type === "view" ? (
                <>
                  <Button
                    type="button"
                    className="ms-auto"
                    onClick={closeDialog}
                  >
                    Close
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
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending || isPendingUpdate}>
                    Save changes
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
