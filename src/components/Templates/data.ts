export const useTemplateType = () => {
  const templateTypes = [
    {
      label: "Check",
      value: "check",
    },
    {
      label: "Cash",
      value: "cash",
    },
  ];
  return { templateTypes };
};

export const useTemplateStatus = () => {
  const templateStatus = [
    {
      label: "Park",
      value: "park",
    },
    {
      label: "Post",
      value: "post",
    },
  ];
  return { templateStatus };
};
