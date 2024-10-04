export const getLabelByValue = (value: string, employeProfetion: any) => {
  const profession = employeProfetion.find(
    (profetion: any) => profetion.value === value
  );
  return profession ? profession.label : "Value not found";
};

export const DateFormatConvertor = (date: any) => {
  const newDate = new Date(date)

  const formateddate = newDate.getDate();
  const cformateddate = formateddate >= 10 ? formateddate : `0${formateddate}`
  const formatedMonth = newDate.getMonth() + 1;
  const formatedYear = newDate.getFullYear();
  return `${formatedYear}/${formatedMonth}/${cformateddate}`
}