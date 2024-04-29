import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CostCenter, NewCostCenter, NewCostCenterSchema } from "../schema";
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
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CostCentersManager from "@/managers/CostCentersManager";
import { useTranslation } from "react-i18next";

type CostCenterFormProps = {
  level: number;
  type?: "add" | "edit" | "view";
  children?: React.ReactNode;
  parentCostCenter?: CostCenter;
  costCenter?: CostCenter;
};

const CostCenterForm = ({
  children,
  level,
  parentCostCenter,
  costCenter,
  type = "add",
}: CostCenterFormProps) => {
  const { t } = useTranslation("costCenters");

  const { COST_CENTER_PROPERTIES } = useData();
  useEffect(() => {
    form.reset({
      parent_id: parentCostCenter?.id ?? null,
      ...costCenter,
    });
  }, [costCenter]);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<NewCostCenter>({
    resolver: zodResolver(NewCostCenterSchema),
    defaultValues: {
      ...costCenter,
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

  const { mutate: addCostCenterMutate, isPending } = useMutation({
    mutationFn: CostCentersManager.addCostCenter,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["costCenters"] });
      await queryClient.invalidateQueries({ queryKey: ["sub-cost-centers"] });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Failed to add cost center",
        description: error.message,
      });
    },
  });

  const { mutate: updateCostCenterMutate, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: (data: Partial<CostCenter>) =>
        CostCentersManager.updateCostCenter(data, costCenter!.id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["costCenters"] });
        await queryClient.invalidateQueries({ queryKey: ["sub-cost-centers"] });
        setIsOpen(false);
      },
      onError: (error) => {
        console.log(error.message);
        toast({
          variant: "destructive",
          title: "Failed to update cost center",
          description: error.message,
        });
      },
    });

  const onSubmit: SubmitHandler<NewCostCenter> = (data) => {
    if (type === "add") {
      addCostCenterMutate(data);
    } else if (type === "edit") {
      updateCostCenterMutate(data as Partial<CostCenter>);
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
            {parentCostCenter && (
              <FormItem className="flex gap-4 items-center justify-end w-full">
                <FormLabel className="whitespace-nowrap">
                  {t("parentCostCenter")}
                </FormLabel>
                <div className="flex-col w-full max-w-[65%]">
                  <Input
                    disabled
                    className="w-full"
                    value={`${parentCostCenter.name_ar} - ${parentCostCenter.code}`}
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
                  }}
                  defaultValue={COST_CENTER_PROPERTIES.find(
                    (property) => property.value === costCenter?.properties
                  )}
                  className="w-full"
                  options={level === 1 ? [COST_CENTER_PROPERTIES[0]] : COST_CENTER_PROPERTIES}
                />
                {errors.properties && (
                  <span className="error-text">
                    {errors.properties.message}
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
export default CostCenterForm;
