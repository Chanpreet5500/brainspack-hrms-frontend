import {
  defaultVariantColorsResolver,
  parseThemeColor,
  VariantColorsResolver,
} from "@mantine/core";
export const getLabelByValue = (value: string, data: any) => {
  const profession = data.find((element: any) => element.value === value);
  return profession ? profession.label : "Value not found";
};
export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });
  if (input.variant === "default") {
    return {
      background: "transparent",
      hover: "#dcdcdc",
      color: "black",
      border: "none",
    };
  }

  return defaultResolvedColors;
};
export const DateFormatConvertor = (date: any) => {
  const newDate = new Date(date);
  const formateddate = newDate.getDate();
  const cformateddate = formateddate >= 10 ? formateddate : `0${formateddate}`;
  const formatedMonth = newDate.getMonth() + 1;
  const formatedYear = newDate.getFullYear();
  return `${formatedYear}/${formatedMonth}/${cformateddate}`;
};

// export const StringDateFormatConvertor = (
//   dateString: string,
//   type: string,
//   separator = "/"
// ) => {
//   const newDate = new Date(dateString);
//   const day = newDate.getDate();
//   const month = newDate.getMonth() + 1;
//   const year = newDate.getFullYear();
//   const formattedDay = day >= 10 ? day : `0${day}`;
//   const formattedMonth = month >= 10 ? month : `0${month}`;
//   switch (type) {
//     case "DD/MM/YYYY":
//       return `${formattedDay}${separator}${formattedMonth}${separator}${year}`;
//     case "MM/DD/YYYY":
//       return `${formattedMonth}${separator}${formattedDay}${separator}${year}`;
//     case "YYYY/MM/DD":
//       return `${year}${separator}${formattedMonth}${separator}${formattedDay}`;
//     default:
//       return `${year}${separator}${formattedMonth}${separator}${formattedDay}`;
//   }
// };
export const StringDateFormatConvertor = (
  dateString: string,
  type: string,
  separator = "/"
) => {
  const newDate = new Date(dateString);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  const formattedDay = day >= 10 ? day : `0${day}`;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedMonth = monthNames[month];

  switch (type) {
    case "DD/MMM/YYYY":
      return `${formattedDay}-${formattedMonth}-${year}`;
    case "MM/DD/YYYY":
      return `${formattedMonth}${separator}${formattedDay}${separator}${year}`;
    case "YYYY/MM/DD":
      return `${year}${separator}${formattedMonth}${separator}${formattedDay}`;
    default:
      return `${formattedDay}-${formattedMonth}-${year}`;
  }
};
