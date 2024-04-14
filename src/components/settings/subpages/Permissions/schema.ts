import z from "zod";

export const FeaturesArr = [
  "entry",
  "account",
  "permission",
  "category",
  "currency",
  "cost-center",
  "group",
  "register",
  "user",
  "transactions",
  "post",
  "reverse",
  "template",
  "bank",
  "payment",
  "receive",
] as const;

export const ActionsArr = ["create", "update", "show", "delete"] as const;

export const FeaturesEnumSchema = z.enum(FeaturesArr);

export const ActionsEnumSchema = z.enum(ActionsArr);

export type FeaturesList = {
  create: boolean;
  update: boolean;
  show: boolean;
  delete: boolean;
};

export const ModifyPermissionSchema = z
  .object({
    feature: FeaturesEnumSchema,
    actions: z.array(ActionsEnumSchema),
    status: z.boolean(),
    users: z.array(z.number()).optional(),
    groups: z.array(z.number()).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (!data.users && !data.groups) ||
      (data.users && data.users.length === 0) ||
      (data.groups && data.groups.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either users or groups is required",
        path: ["users"],
      });
    }
  });

export const PermissionsListSchema = z
  .object({
    feature: FeaturesEnumSchema,
    // optional user_id or group_id
    user_id: z.number().optional(),
    group_id: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.user_id && !data.group_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either user_id or group_id is required",
        path: ["user_id"],
      });
    }
  });

export type FeaturesEnum = z.infer<typeof FeaturesEnumSchema>;
export type ActionsEnum = z.infer<typeof ActionsEnumSchema>;
export type ModifyPermission = z.infer<typeof ModifyPermissionSchema>;
export type PermissionsList = z.infer<typeof PermissionsListSchema>;
