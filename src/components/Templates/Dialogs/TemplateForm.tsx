import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import DynamicTableForm from "@/components/common/DynamicTableForm/DynamicTableForm";
import { NewTemplate, NewTemplateSchema, Template } from "../schema";

type TemplateFormProps = {
  type?: "view" | "edit" | "add";
  template?: Template;
};
const TemplateForm = ({ type = "add", template }: TemplateFormProps) => {
  const HEADERS = {
    view: "View Template",
    edit: "Edit Template",
    add: "Add New Template",
  };

  const form = useForm<NewTemplate>({
    resolver: zodResolver(NewTemplateSchema),
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (data: NewTemplate) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="font-medium text-lg">{HEADERS[type]}</h2>
      <Separator className="my-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex max-w-[50%] gap-4">
            {template && (
              <FormField
                control={form.control}
                name="document_code"
                render={({ field }) => (
                  <FormItem className="flex gap-1 items-start flex-col w-full flex-1">
                    <FormLabel className="whitespace-nowrap">
                      Document Number
                    </FormLabel>
                    <div className="flex-col w-full">
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          disabled
                          defaultValue={template.code}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex gap-1 items-start flex-col w-full flex-1">
                  <FormLabel className="whitespace-nowrap">date</FormLabel>
                  <div className="flex-col w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="Pick a date"
                        type="date"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end flex-1 flex-col items-start gap-1">
              <label htmlFor="type" className="font-medium text-sm">
                Type
              </label>
              <div className="flex-col w-full">
                <Select
                  id="type"
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  // onChange={(val) => {
                  //   form.clearErrors("currency");
                  //   setValue("currency", val.value);
                  // }}
                  className="w-full"
                  options={[
                    { label: "KZ", value: "KZ" },
                    { label: "AB", value: "AB" },
                  ]}
                />
                {errors.currency && (
                  <span className="error-text">{errors.currency.message}</span>
                )}
              </div>
            </div>
            <div className="flex justify-end flex-1 flex-col items-start gap-1">
              <label htmlFor="currency" className="font-medium text-sm">
                Currency
              </label>
              <div className="flex-col w-full">
                <Select
                  id="currency"
                  isSearchable={false}
                  isClearable={false}
                  isDisabled={type === "view"}
                  // onChange={(val) => {
                  //   form.clearErrors("currency");
                  //   setValue("currency", val.value);
                  // }}
                  className="w-full"
                  options={[
                    { label: "USD", value: 0 },
                    { label: "SAR", value: 1 },
                  ]}
                />
                {errors.currency && (
                  <span className="error-text">{errors.currency.message}</span>
                )}
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex gap-1 items-start flex-col max-w-[50%]">
                <FormLabel className="whitespace-nowrap">Title</FormLabel>
                <div className="flex-col w-full">
                  <FormControl>
                    <Input {...field} className="w-full" placeholder="Title" />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex gap-1 items-start flex-col max-w-[50%]">
                <FormLabel className="whitespace-nowrap">Description</FormLabel>
                <div className="flex-col w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Description"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="pt-8">
            <DynamicTableForm />
          </div>
          <FormField
            control={form.control}
            name="created_by"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center max-w-[400px] ms-auto">
                <FormLabel className="whitespace-nowrap font-normal">
                  Signature (Created by):
                </FormLabel>
                <div className="flex-col w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full"
                      placeholder="Created By"
                      disabled
                      defaultValue="Amir Hesham"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4">
            <Button type="button" className="bg-red-500">
              Cancel
            </Button>
            <Button type="submit" className="bg-gray-200 text-black">
              Save As Template
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default TemplateForm;
