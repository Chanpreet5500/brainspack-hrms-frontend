export const getLabelByValue = (value: string, employeProfetion: any) => {
  const profession = employeProfetion.find(
    (profetion: any) => profetion.value === value
  );
  return profession ? profession.label : "Value not found";
};
