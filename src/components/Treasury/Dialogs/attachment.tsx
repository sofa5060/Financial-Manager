import { X } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { badgeVariants } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import AccountingEntriesManager from "@/managers/AccountingEntriesManager";
import { NewBond } from "../schema";
import { useTranslation } from "react-i18next";

type AttachmentProps = {
  register: UseFormRegister<NewBond>;
  isFormSubmitted?: boolean;
  attachments?: string[] | null;
  bondId?: number;
  disabled?: boolean;
};
const Attachment = ({
  register,
  attachments,
  bondId,
  isFormSubmitted,
  disabled,
}: AttachmentProps) => {
  const { t } = useTranslation("entries");
  const [attachmentsClone, setAttachmentsClone] = useState<
    string[] | undefined
  >(attachments || undefined);

  const [attachmentsToDelete, setAttachmentsToDelete] = useState<string[]>([]);

  const deleteAttachment = (attachment: string) => {
    if (!bondId || disabled) return;
    setAttachmentsToDelete((prev) => prev.concat(attachment));

    // delete local file (optimistic update)
    setAttachmentsClone((prev) => prev?.filter((a) => a !== attachment));
  };

  const deleteAttachments = useCallback(async () => {
    if (!attachmentsClone || !bondId || attachmentsToDelete.length === 0)
      return;

    try {
      await AccountingEntriesManager.deleteAttachments(
        bondId,
        attachmentsToDelete.map(
          (attachment) => attachment.split("/").slice(-1)[0]
        )
      );
      toast({
        description: "Attachment deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh no! Something went wrong",
        description: "Failed to delete attachment",
      });
      setAttachmentsClone(attachments || undefined);
    }
    setAttachmentsToDelete([]);
  }, [attachmentsClone, attachmentsToDelete, bondId, attachments]);

  useEffect(() => {
    if (isFormSubmitted) {
      console.log(attachmentsToDelete);
      deleteAttachments();
    }
  }, [isFormSubmitted, deleteAttachments]);

  return (
    <div className="flex justify-end flex-1 flex-col items-start gap-1 w-full">
      <label htmlFor="attachments" className="font-medium text-sm">
        {t("attachments")}
      </label>
      <div className="flex-col w-full">
        <div className="grid gap-2 max-w-[50%]">
          <div className="grid gap-2">
            <div className="field">
              <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <Input
                  id="file"
                  type="file"
                  multiple
                  {...register("files")}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {attachmentsClone?.map((attachment, index) => (
              <div key={index}>
                <Link
                  to={attachment}
                  className={cn(
                    badgeVariants({ variant: "outline" }),
                    "flex items-center gap-4 py-2 hover:no-underline hover:text-primary"
                  )}
                  target="_blank"
                >
                  <span className="hover:underline hover:text-blue-400">
                    {attachment.split("/").slice(-1)[0]}
                  </span>
                  {!disabled && (
                    <X
                      className="w-4 h-4 text-black hover:text-destructive hover:ring-destructive rounded-full bg-white ring-1 ring-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteAttachment(attachment);
                      }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Attachment;
