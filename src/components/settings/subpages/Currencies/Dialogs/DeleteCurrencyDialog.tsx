import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import CurrenciesManager from "@/managers/CurrenciesManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type DeleteCurrencyDialogProps = {
  currencyId: number;
  children?: React.ReactNode;
};

const DeleteCurrencyDialog = ({
  children,
  currencyId,
}: DeleteCurrencyDialogProps) => {
  const { t } = useTranslation("settings");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteCurrencyMutate, isPending } = useMutation({
    mutationFn: CurrenciesManager.deleteCurrency,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("currency.delete.failed"),
        description: error.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currencies"] });
      toast({
        title: t("currency.delete.success"),
      });
      closeDialog();
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("currency.delete.title")}</DialogTitle>
          <DialogDescription>{t("currency.delete.message")}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 mt-4 justify-between">
          <Button
            onClick={() => {
              closeDialog();
            }}
            className="bg-white text-black ring-1 ring-gray-300"
            disabled={isPending}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              deleteCurrencyMutate(currencyId);
            }}
            className="bg-red-500"
            disabled={isPending}
          >
            <Trash className="w-4 h-4 me-2" />
            {t("currency.delete.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteCurrencyDialog;
