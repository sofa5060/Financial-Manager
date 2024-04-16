import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  FeaturesArr,
  FeaturesList,
  PermissionsList,
  PermissionsListSchema,
} from "../schema";
import PermissionsManager from "@/managers/PermissionsManager";
import { useState } from "react";
import { useGroupsStore } from "@/hooks/useGroupsStore";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CircleCheck, CircleX } from "lucide-react";
import { capitalizeString, cn } from "@/lib/utils";
import { useUsersStore } from "@/hooks/useUsersStore";
import { useTranslation } from "react-i18next";

const ViewPermissionsForm = () => {
  const { t } = useTranslation("settings");
  const [isGroup, setIsGroup] = useState(false);
  const [searchResult, setSearchResult] = useState<FeaturesList | null>();
  const [searchResultName, setSearchResultName] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<PermissionsList>({
    resolver: zodResolver(PermissionsListSchema),
  });

  const {
    formState: { errors },
    setValue,
  } = form;

  const usersOptions = useUsersStore((state) => state.usersOptions);

  const groupsOptions = useGroupsStore((state) => state.groupsOptions);

  const { mutate: viewPermissionMutate, isPending } = useMutation({
    mutationFn: ({ feature, user_id, group_id }: PermissionsList) =>
      PermissionsManager.getPermissionsList(
        feature,
        isGroup ? group_id! : user_id!,
        isGroup ? "group" : "user"
      ),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["permissions"] });
      setSearchResult(data!);
      setSearchResultName(
        isGroup
          ? groupsOptions!.find(
              (option) => option.value === form.getValues("group_id")
            )!.label!
          : usersOptions!.find(
              (option) => option.value === form.getValues("user_id")
            )!.label!
      );
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: t("permissions.failed"),
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<PermissionsList> = (data) => {
    console.log(data);
    viewPermissionMutate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-lg font-semibold">View Permissions</h2>
          <div className="flex gap-4 items-center justify-end">
            <label htmlFor="isGroup" className="font-medium text-sm">
              {t("group")} / {t("user")}
            </label>
            <div className="flex-col w-full max-w-[65%]">
              <Select
                id="isGroup"
                isSearchable={false}
                isClearable={false}
                onChange={(val) => {
                  setIsGroup(val?.value as boolean);
                  form.reset();
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
              {t("name")}
            </label>
            <div className="flex-col w-full max-w-[65%]">
              <Select
                id="id"
                key={isGroup ? "group_id" : "user_id"}
                isSearchable={true}
                isClearable={false}
                onChange={(val) => {
                  form.clearErrors(isGroup ? "group_id" : "user_id");
                  setValue(isGroup ? "group_id" : "user_id", val!.value);
                }}
                value={
                  isGroup
                    ? groupsOptions.find(
                        (option) => option.value === form.getValues("group_id")
                      )
                    : usersOptions.find(
                        (option) => option.value === form.getValues("user_id")
                      )
                }
                className="min-w-48"
                options={isGroup ? groupsOptions : usersOptions}
              />
              {errors.user_id && (
                <span className="error-text">{errors.user_id.message}</span>
              )}
              {errors.group_id && (
                <span className="error-text">{errors.group_id.message}</span>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <label htmlFor="feature" className="font-medium text-sm">
              {t("feature")}
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
          <div className="flex items-center justify-end mt-2">
            <Button type="submit" disabled={isPending}>
              {t("search")}
            </Button>
          </div>
        </form>
      </Form>
      {searchResult && (
        <div className="space-y-4">
          <Separator />
          <h2 className="text-lg font-semibold">{t("searchResult")}:</h2>
          <div className="flex justify-between">
            <div className="flex flex-col items-start">
              <h3 className="font-semibold mb-2">{t("name")}</h3>
              <p>{searchResultName}</p>
            </div>
            <div className="flex-flex-col">
              <h3 className="font-semibold mb-2">{t("actions")}</h3>
              {Object.keys(searchResult).map((key: string) => (
                <div
                  key={key as string}
                  className={cn("flex gap-2 items-center mb-2", {
                    "text-green-500": searchResult[key as keyof FeaturesList],
                    "text-red-500": !searchResult[key as keyof FeaturesList],
                  })}
                >
                  {searchResult[key as keyof FeaturesList] ? (
                    <CircleCheck className="w-6 h-6 text-green-500" />
                  ) : (
                    <CircleX className="w-6 h-6 text-red-500" />
                  )}
                  <p>{capitalizeString(key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewPermissionsForm;
