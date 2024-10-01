export const getLabelByValue = (value: string, data: any) => {
  const profession = data.find((element: any) => element.value === value);
  return profession ? profession.label : "Value not found";
};
