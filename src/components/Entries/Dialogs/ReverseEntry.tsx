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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { X } from "lucide-react";

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
  const { t, i18n } = useTranslation("entries");
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

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };

  return (
    <>
      <div onClick={openDialog}>{children}</div>
      <Modal disableEnforceFocus open={isOpen} onClose={closeDialog}>
        <Box sx={style}>
          <div
            dir={i18n.dir(i18n.language)}
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
          >
            <div
              onClick={closeDialog}
              className="absolute ltr:right-4 rtl:left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </div>
            <div className="flex flex-col space-y-1.5 text-center sm:text-start">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                {t("reverse.title")}
              </h3>
              <h4 className="text-sm text-muted-foreground">
                {t("reverse.message")}
              </h4>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ReverseEntry;
