import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
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
import { useToast } from "@/components/ui/use-toast";
import CurrenciesManager from "@/managers/CurrenciesManager";
import { Currency, NewCurrency, NewCurrencySchema } from "../schema";

type CurrencyFormProps = {
  type?: "add" | "edit";
  children?: React.ReactNode;
  currency?: Currency;
};

const CurrencyFormDialog = ({
  children,
  currency,
  type = "add",
}: CurrencyFormProps) => {
  useEffect(() => {
    form.reset({
      functional_currency: false,
      ...currency,
    });
  }, [currency]);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<NewCurrency>({
    resolver: zodResolver(NewCurrencySchema),
    defaultValues: {
      functional_currency: false,
      ...currency,
    },
  });

  const {
    formState: { errors },
    setValue,
  } = form;

  const TITLES = {
    add: "Add New Currency",
    edit: "Edit Currency",
  };

  const DESCRIPTIONS = {
    add: "Click save when you're done",
    edit: "Click save when you're done",
  };

  const { mutate: addCurrencyMutate, isPending } = useMutation({
    mutationFn: CurrenciesManager.createCurrency,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currencies"] });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Failed to add currency",
        description: error.message,
      });
    },
  });

  const { mutate: updateCurrencyMutate, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: (data: NewCurrency) =>
        CurrenciesManager.updateCurrency(data, currency!.id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["currencies"] });
        form.reset();
        setIsOpen(false);
      },
      onError: (error) => {
        console.log(error.message);
        toast({
          variant: "destructive",
          title: "Failed to update currency",
          description: error.message,
        });
      },
    });

  const onSubmit: SubmitHandler<NewCurrency> = (data) => {
    if (type === "add") {
      addCurrencyMutate(data);
    } else if (type === "edit") {
      updateCurrencyMutate(data);
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
              name="currency"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end">
                  <FormLabel className="whitespace-nowrap">Currency</FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input
                        placeholder="Egyption Pound"
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
              name="appreviation"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end w-full">
                  <FormLabel className="whitespace-nowrap">
                    Abbreviation
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input placeholder="LE" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="default_rate"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end w-full">
                  <FormLabel className="whitespace-nowrap">
                    Default Rate
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input
                        placeholder="1"
                        {...field}
                        className="w-full"
                        type="number"
                        value={field.value!}
                        onChange={(e) => {
                          form.setValue(
                            "default_rate",
                            parseFloat(e.target.value)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
              <label
                htmlFor="functional_currency"
                className="font-medium text-sm"
              >
                Functional Currency
              </label>
              <div className="flex-col w-full max-w-[65%]">
                <Select
                  id="functional_currency"
                  isSearchable={false}
                  isClearable={false}
                  onChange={(val) => {
                    form.clearErrors("functional_currency");
                    setValue("functional_currency", val!.value);
                  }}
                  className="w-full"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                  defaultValue={
                    currency?.functional_currency
                      ? { label: "Yes", value: true }
                      : { label: "No", value: false }
                  }
                />
                {errors.functional_currency && (
                  <span className="error-text">
                    {errors.functional_currency.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button
                type="button"
                className="bg-destructive"
                onClick={closeDialog}
                disabled={isPending || isPendingUpdate}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || isPendingUpdate}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CurrencyFormDialog;
