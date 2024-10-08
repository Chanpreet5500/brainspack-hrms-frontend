export const getLabelByValue = (value: string, data: any) => {
  const profession = data.find((element: any) => element.value === value);
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