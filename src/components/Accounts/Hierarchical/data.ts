import { useTranslation } from "react-i18next";
import z from "zod";

export const AccountPropertiesSchema = z.enum(["main", "sub"]);

export const AccountTypeSchema = z.enum(["debit", "credit"]);

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

  return {
    ACCOUNT_PROPERTIES,
    ACCOUNT_TYPES,
  }
}

export type AccountProperties = z.infer<typeof AccountPropertiesSchema>;
export type AccountType = z.infer<typeof AccountTypeSchema>;