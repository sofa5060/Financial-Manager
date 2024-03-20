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

type ReverseEntryProps = {
  children: React.ReactNode;
  entry: Entry;
};

const ReverseEntrySchema = z.object({
  code: z.string(),
  reason: z.string(),
});

const ReverseEntry = ({ children, entry }: ReverseEntryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof ReverseEntrySchema>>({
    resolver: zodResolver(ReverseEntrySchema),
    defaultValues: {
      code: entry.code,
    },
  });

  const onSubmit = (data: z.infer<typeof ReverseEntrySchema>) => {
    console.log(data);
  };

  const closeDialog = () => {
    setIsOpen(false);
    form.reset();
  };

  const openDialog = () => setIsOpen(true);

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? closeDialog : openDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reverse Entry</DialogTitle>
          <DialogDescription>Click Reverse when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end">
                  <FormLabel className="whitespace-nowrap">
                    Document Code
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
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center justify-end">
                  <FormLabel className="whitespace-nowrap">Reason</FormLabel>
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
              >
                Cancel
              </Button>
              <Button type="submit">Reverse</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ReverseEntry;
