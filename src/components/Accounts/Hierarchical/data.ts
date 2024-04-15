import { useTranslation } from "react-i18next";
import z from "zod";

export const AccountPropertiesSchema = z.enum(["main", "sub"]);

export const AccountTypeSchema = z.enum(["debit", "credit"]);

export const ReportingTypeSchema = z.enum(["balance_sheet", "profit_and_loss"]);

export const useData = () => {
  const { t } = useTranslation("accounts");

  const ACCOUNT_PROPERTIES = [
    {
      label : t("mainAccount"),
      value : AccountPropertiesSchema.Enum.main
    },
    {
      label : t("subAccount"),
      value : AccountPropertiesSchema.Enum.sub
    }
  ];
  
  const ACCOUNT_TYPES = [
    {
      label : t("debit"),
      value : AccountTypeSchema.Enum.debit
    },
    {
      label : t("credit"),
      value : AccountTypeSchema.Enum.credit
    }
  ] as const;
  
  const REPORTING_TYPES = [
    {
      label : t("balance"),
      value : ReportingTypeSchema.Enum.balance_sheet
    },
    {
      label : t("profit"),
      value : ReportingTypeSchema.Enum.profit_and_loss
    }
  ] as const;

  return {
    ACCOUNT_PROPERTIES,
    ACCOUNT_TYPES,
    REPORTING_TYPES
  }
}



// generate readonly array of values
// export const AccountPropertiesValues: readonly [string, ...string[]] = ACCOUNT_PROPERTIES.map((type) => type.value) as unknown as readonly [string, ...string[]];
// export const AccountTypesValues: readonly [string, ...string[]] = ACCOUNT_TYPES.map((type) => type.value) as unknown as readonly [string, ...string[]];
// export const ReportingTypesValues: readonly [string, ...string[]] = REPORTING_TYPES.map((type) => type.value) as unknown as readonly [string, ...string[]];

export type AccountProperties = z.infer<typeof AccountPropertiesSchema>;
export type AccountType = z.infer<typeof AccountTypeSchema>;
export type ReportingType = z.infer<typeof ReportingTypeSchema>;