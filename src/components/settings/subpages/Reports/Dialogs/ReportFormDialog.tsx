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
import { Report, NewReport, NewReportSchema } from "../schema";
import ReportsManager from "@/managers/ReportsManager";
import { useTranslation } from "react-i18next";

type ReportFormProps = {
  type?: "add" | "edit";
  children?: React.ReactNode;
  report?: Report;
};

const ReportFormDialog = ({ children, report, type = "add" }: ReportFormProps) => {
  const { t } = useTranslation("settings");
  useEffect(() => {
    form.reset({
      ...report,
    });
  }, [report]);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<NewReport>({
    resolver: zodResolver(NewReportSchema),
    defaultValues: {
      ...report,
    },
  });

  const TITLES = {
    add: t("addReport"),
    edit: t("editReport"),
  };

  const DESCRIPTIONS = {
    add: t("form.message"),
    edit: t("form.message"),
  };

  const { mutate: addReportMutate, isPending } = useMutation({
    mutationFn: ReportsManager.createReport,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reports"] });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: t("report.add.failed"),
        description: error.message,
      });
    },
  });

  const { mutate: updateReportMutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: (data: NewReport) => ReportsManager.updateReport(data, report!.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reports"] });
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: t("report.edit.failed"),
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<NewReport> = (data) => {
    if (type === "add") {
      addReportMutate(data);
    } else if (type === "edit") {
      updateReportMutate(data);
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
                    {t("nameEnglish")}
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input
                        placeholder="Report 1"
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
                    {t("nameArabic")}
                  </FormLabel>
                  <div className="flex-col w-full max-w-[65%]">
                    <FormControl>
                      <Input
                        placeholder="تقرير 1"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mt-2">
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
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ReportFormDialog;
