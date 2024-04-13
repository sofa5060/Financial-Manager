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
import Select from "react-select";
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
import { Group, NewGroup, NewGroupSchema } from "../schema";
import GroupsManager from "@/managers/GroupsManager";
import { useUsersStore } from "@/hooks/useUsersStore";

type GroupFormProps = {
  type?: "add" | "edit";
  children?: React.ReactNode;
  group?: Group;
};

const GroupFormDialog = ({ children, group, type = "add" }: GroupFormProps) => {
  useEffect(() => {
    form.reset({
      ...group,
    });
  }, [group]);

  const usersOptions = useUsersStore((state) => state.usersOptions);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<NewGroup>({
    resolver: zodResolver(NewGroupSchema),
    defaultValues: {
      ...group,
    },
  });

  const {
    setValue,
    formState: { errors },
  } = form;

  const TITLES = {
    add: "Add New Group",
    edit: "Edit Group",
  };

  const DESCRIPTIONS = {
    add: "Click save when you're done",
    edit: "Click save when you're done",
  };

  const { mutate: addGroupMutate, isPending } = useMutation({
    mutationFn: GroupsManager.createGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Failed to add group",
        description: error.message,
      });
    },
  });

  const { mutate: updateGroupMutate, isPending: isPendingUpdate } = useMutation(
    {
      mutationFn: (data: NewGroup) =>
        GroupsManager.updateGroup(data, group!.id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["groups"] });
        setIsOpen(false);
      },
      onError: (error) => {
        console.log(error.message);
        toast({
          variant: "destructive",
          title: "Failed to update group",
          description: error.message,
        });
      },
    }
  );

  const onSubmit: SubmitHandler<NewGroup> = (data) => {
    if (type === "add") {
      addGroupMutate(data);
    } else if (type === "edit") {
      updateGroupMutate(data);
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
                        placeholder="Group 1"
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
                        placeholder="المجموعة 1"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
              <label htmlFor="members" className="font-medium text-sm">
                Members
              </label>
              <div className="flex-col w-full max-w-[65%]">
                <Select
                  id="members"
                  isMulti
                  isSearchable={true}
                  isClearable={false}
                  defaultValue={group?.users?.map((user) =>
                    usersOptions.find((option) => option.value === user.id)
                  )}
                  onChange={(values) => {
                    form.clearErrors("members");
                    setValue(
                      "members",
                      values!.map((val) => val!.value)
                    );
                  }}
                  className="w-full"
                  options={usersOptions}
                />
                {errors.members && (
                  <span className="error-text">
                    {errors.members.message}
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
export default GroupFormDialog;
