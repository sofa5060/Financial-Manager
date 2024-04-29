import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Entry } from "../schema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { useTranslation } from "react-i18next";
import InputDate from "@/components/common/InputDate/InputDate";

type ReverseEntryProps = {
  children: React.ReactNode;
  entry: Entry;
};

const ReverseEntrySchema = z.object({
  code: z.string(),
  reason: z.string(),
  date: z.string().refine((val) => {
    const date = new Date(val);
    // Check if the date is not in the future
    return date <= new Date();
  }, "Date cannot be in the future"),
});

const ReverseEntry = ({ children, entry }: ReverseEntryProps) => {
  const { t } = useTranslation("entries");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const closeDialog = () => {
    setIsOpen(false);
  };

  const { mutate: reverseEntryMutate, isPending } = useMutation({
    mutationFn: ({ reason, date }: { reason: string; date: string }) =>
      AccountingEntriesManager.reverseEntry(entry.id, reason, date),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("reverse.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries"] });
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast({
        title: t("reverse.success"),
      });
      closeDialog();
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof ReverseEntrySchema>>({
    resolver: zodResolver(ReverseEntrySchema),
    defaultValues: {
      code: entry.code,
    },
  });

  const {
    formState: { errors },
    setValue,
  } = form;

  const onSubmit = (data: z.infer<typeof ReverseEntrySchema>) => {
    console.log(data);
    reverseEntryMutate({ reason: data.reason, date: data.date });
  };

  const openDialog = () => setIsOpen(true);

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? closeDialog : openDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("reverse.title")}</DialogTitle>
          <DialogDescription>{t("reverse.message")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end">
                  <FormLabel className="whitespace-nowrap">
                    {t("documentCode")}
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input disabled {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end z-50">
              <label htmlFor="date" className="font-medium text-sm">
                {t("date")}
              </label>
              <div className="flex flex-col w-full max-w-[65%]">
                <InputDate
                  value={form.getValues("date")}
                  onChange={(val) => {
                    setValue("date", val);
                  }}
                  disableFuture
                />
                {errors.date && (
                  <span className="error-text">{errors.date.message}</span>
                )}
              </div>
            </div>
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end">
                  <FormLabel className="whitespace-nowrap">
                    {t("reason")}
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-4">
              <Button
                type="button"
                className="bg-destructive"
                onClick={closeDialog}
                disabled={isPending}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isPending}>
                {t("reverse")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ReverseEntry;
