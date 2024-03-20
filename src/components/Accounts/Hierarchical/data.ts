import z from "zod";

export const AccountPropertiesSchema = z.enum(["main", "sub"]);

export const AccountTypeSchema = z.enum(["debit", "credit"]);

export const ReportingTypeSchema = z.enum(["balance_sheet", "profit_and_loss"]);


export const ACCOUNT_PROPERTIES = [
  {
    label : "Main",
    value : AccountPropertiesSchema.Enum.main
  },
  {
    label : "Sub",
    value : AccountPropertiesSchema.Enum.sub
  }
];

export const ACCOUNT_TYPES = [
  {
    label : "Debit",
    value : AccountTypeSchema.Enum.debit
  },
  {
    label : "Credit",
    value : AccountTypeSchema.Enum.credit
  }
] as const;

export const REPORTING_TYPES = [
  {
    label : "Balance Sheet",
    value : ReportingTypeSchema.Enum.balance_sheet
  },
  {
    label : "Profit & Loss",
    value : ReportingTypeSchema.Enum.profit_and_loss
  }
] as const;

export const CURRENCIES = [
  {
    label : "USD",
    value : "usd"
  },
  {
    label : "EUR",
    value : "eur"
  },
  {
    label : "GBP",
    value : "gbp"
  }
] as const;



// generate readonly array of values
// export const AccountPropertiesValues: readonly [string, ...string[]] = ACCOUNT_PROPERTIES.map((type) => type.value) as unknown as readonly [string, ...string[]];
// export const AccountTypesValues: readonly [string, ...string[]] = ACCOUNT_TYPES.map((type) => type.value) as unknown as readonly [string, ...string[]];
// export const ReportingTypesValues: readonly [string, ...string[]] = REPORTING_TYPES.map((type) => type.value) as unknown as readonly [string, ...string[]];

export type AccountProperties = z.infer<typeof AccountPropertiesSchema>;
export type AccountType = z.infer<typeof AccountTypeSchema>;
export type ReportingType = z.infer<typeof ReportingTypeSchema>;