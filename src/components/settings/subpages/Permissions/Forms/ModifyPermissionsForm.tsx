import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  ActionsArr,
  FeaturesArr,
  ModifyPermission,
  ModifyPermissionSchema,
} from "../schema";
import PermissionsManager from "@/managers/PermissionsManager";
import { useState } from "react";
import { useGroupsStore } from "@/hooks/useGroupsStore";
import { useUsersStore } from "@/hooks/useUsersStore";

const ModifyPermissionsForm = () => {
  const [isGroup, setIsGroup] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<ModifyPermission>({
    resolver: zodResolver(ModifyPermissionSchema),
    defaultValues: {
      status: true,
    },
  });

  const {
    formState: { errors },
    setValue,
  } = form;

  const usersOptions = useUsersStore((state) => state.usersOptions);

  const groupsOptions = useGroupsStore((state) => state.groupsOptions);

  const { mutate: modifyPermissionMutate, isPending } = useMutation({
    mutationFn: ({
      feature,
      users,
      groups,
      actions,
      status,
    }: ModifyPermission) =>
      PermissionsManager.modifyPermissions(
        feature,
        actions,
        isGroup ? groups! : users!,
        isGroup ? "group" : "user",
        status
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["permissions"] });
      toast({
        title: "Permissions modified successfully",
      });
      form.reset();
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Failed to fetch permissions",
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<ModifyPermission> = (data) => {
    console.log(data);
    modifyPermissionMutate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-lg font-semibold">Modify Permissions</h2>
          <div className="flex gap-4 items-center justify-end">
            <label htmlFor="isGroup" className="font-medium text-sm">
              Group / User
            </label>
            <div className="flex-col w-full max-w-[65%]">
              <Select
                id="isGroup"
                isSearchable={false}
                isClearable={false}
                onChange={(val) => {
                  setIsGroup(val?.value as boolean);
                  form.setValue("groups", undefined);
                  form.setValue("users", undefined);
                }}
                className="w-full"
                options={[
                  { label: "Group", value: true },
                  { label: "User", value: false },
                ]}
                defaultValue={{ label: "User", value: false }}
              />
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <label htmlFor="id" className="font-medium text-sm">
              Name
            </label>
            <div className="flex-col w-full max-w-[65%]">
              <Select
                id="id"
                key={isGroup ? "groups" : "users"}
                isSearchable={true}
                isClearable={false}
                isMulti
                onChange={(values) => {
                  form.clearErrors(isGroup ? "groups" : "users");
                  setValue(
                    isGroup ? "groups" : "users",
                    values!.map((val) => val!.value)
                  );
                }}
                value={
                  form.getValues(isGroup ? "groups" : "users")?.map((val) => {
                    console.log(val);
                    return isGroup
                      ? groupsOptions.find((option) => option.value === val)
                      : usersOptions.find((option) => option.value === val);
                  }) || []
                }
                className="min-w-48"
                options={isGroup ? groupsOptions : usersOptions}
              />
              {errors.users && (
                <span className="error-text">{errors.users.message}</span>
              )}
              {errors.groups && (
                <span className="error-text">{errors.groups.message}</span>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <label htmlFor="feature" className="font-medium text-sm">
              Feature
            </label>
            <div className="flex-col w-full max-w-[65%]">
              <Select
                id="feature"
                isSearchable={false}
                isClearable={false}
                onChange={(val) => {
                  form.clearErrors("feature");
                  setValue("feature", val!.value);
                }}
                value={
                  form.getValues("feature")
                    ? {
                        value: form.getValues("feature"),
                        label: form.getValues("feature"),
                      }
                    : null
                }
                className="min-w-48"
                options={FeaturesArr.map((feature) => ({
                  label: feature,
                  value: feature,
                }))}
              />
              {errors.feature && (
                <span className="error-text">{errors.feature.message}</span>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <label htmlFor="status" className="font-medium text-sm">
              Actions
            </label>
            <div className="flex-col w-full max-w-[65%]">
              <Select
                id="status"
                isSearchable={false}
                isClearable={false}
                isMulti
                onChange={(values) => {
                  form.clearErrors("actions");
                  setValue(
                    "actions",
                    values!.map((val) => val!.value)
                  );
                }}
                value={
                  form.getValues("actions")?.map((val) => {
                    return {
                      value: val,
                      label: val,
                    };
                  }) || []
                }
                className="min-w-48"
                options={ActionsArr.map((action) => ({
                  label: action,
                  value: action,
                }))}
              />
              {errors.actions && (
                <span className="error-text">{errors.actions.message}</span>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <label htmlFor="status" className="font-medium text-sm">
              Status
            </label>
            <div className="flex-col w-full max-w-[65%]">
              <Select
                id="status"
                isSearchable={false}
                isClearable={false}
                onChange={(val) => {
                  form.clearErrors("status");
                  setValue("status", val!.value);
                }}
                className="min-w-48"
                options={[
                  { label: "Add", value: true },
                  { label: "Remove", value: false },
                ]}
                defaultValue={{ label: "Add", value: true }}
              />
              {errors.status && (
                <span className="error-text">{errors.status.message}</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end mt-2">
            <Button type="submit" disabled={isPending}>
              Apply
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ModifyPermissionsForm;
