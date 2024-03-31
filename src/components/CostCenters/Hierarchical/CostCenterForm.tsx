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
import { COST_CENTER_PROPERTIES } from "./data";
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
    add: `Add New Cost Center in Level ${level}`,
    edit: "Edit Cost Center",
    view: "View Cost Center",
  };

  const DESCRIPTIONS = {
    add: "Click save when you're done",
    edit: "Click save when you're done",
    view: "The Record is View Only",
  };

  const { mutate: addCostCenterMutate, isPending } = useMutation({
    mutationFn: CostCentersManager.addCostCenter,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["costCenters"] });
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
            {parentCostCenter && (
              <FormItem className="flex gap-4 items-center justify-end w-full">
                <FormLabel className="whitespace-nowrap">
                  Parent Account
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
                  defaultValue={COST_CENTER_PROPERTIES.find(
                    (property) => property.value === costCenter?.properties
                  )}
                  className="w-full"
                  options={COST_CENTER_PROPERTIES}
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
export default CostCenterForm;
