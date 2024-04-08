export const useEntryType = () => {
  const entryTypes = [
    {
      label: "Check",
      value: "check",
    },
    {
      label: "Cash",
      value: "cash",
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
