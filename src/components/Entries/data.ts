import { useTranslation } from "react-i18next";

export const useEntryType = () => {
  const { t } = useTranslation("entries");
  const entryTypes = [
    {
      label: t("cash"),
      value: "cash",
    },
    {
      label: t("check"),                
      value: "check",
    },
  ];
  return { entryTypes };
};

export const useEntryStatus = () => {
  const entryStatuses = [
    {
      label: "Park",
      value: "park",
    },
    {
      label: "Post",
      value: "post",
    },
  ];
  return { entryStatuses };
};
