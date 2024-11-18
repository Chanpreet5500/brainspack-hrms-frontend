import {
  IconAddressBook,
  IconArrowBarRight,
  IconBeach,
  IconBowl,
  IconBrandRust,
  IconClock,
  IconHome2,
  IconNews,
  IconSettings,
  IconToolsKitchen,
  IconTransfer,
  IconTrash,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
export const appdroperdata = [
  { id: 1, icon: IconSettings, name: "Profile", link: "/profile" },
];

export const employeeData = [
  { id: "1", label: "Admin", value: "admin" },
  { id: "2", label: "HR", value: "hr" },
  { id: "3", label: "Employee", value: "employee" },
];
export const dangerdroperdata = [
  { id: 0, icon: IconTransfer, name: "Transfer my data" },
  { id: 1, icon: IconTrash, name: "Delete my Account" },
];
export const countAllData = [
  {
    title: "Number of Employee",
    count: 0,
    icon: <IconAddressBook />,
    link: "/employees",
    color: "#c9b7eb",
    iconBgColor: "#b4a4d6",
  },
  {
    title: "On Leave",
    count: 0,
    icon: <IconNews />,
    link: "/leavepolicies/leaves",
    color: "#efd9ce",
    iconBgColor: "#e9ccbd",
  },
  {
    title: "New Joinee",
    count: 200,
    icon: <IconUserPlus />,
    color: "#c9e4ca",
    iconBgColor: "#a8dbaa",
  },
  {
    title: "Upcoming Holiday",
    count: 0,
    icon: <IconBeach />,
    link: "/holidays",
    color: "#cfdee7",
    iconBgColor: "#afccdd",
  },
];
export const memberData = [
  {
    name: "A",
    designation: "Assosiate Software Developer",
  },
  {
    name: "A",
    designation: "Sr. Software Developer",
  },
  {
    name: "A",
    designation: "Flutter Developer",
  },
  {
    name: "A",
    designation: "UI/UX Developer",
  },
];
export const sidebarlinks = [
  {
    id: 0,
    icon: <IconHome2 size={22} stroke={1.5} />,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 1,
    icon: <IconUsers size={22} stroke={1.5} />,
    name: "Employees",
    link: "/employees",
  },
  {
    id: 2,
    icon: <IconArrowBarRight size={22} stroke={1.5} />,
    name: "Leaves Management",
    link: "/leaves",
  },
  {
    id: 3,
    icon: <IconArrowBarRight size={22} stroke={1.5} />,
    name: "Leave Policies",

    submenu: [
      {
        id: 3.1,
        icon: <IconArrowBarRight size={22} stroke={1.5} />,
        name: "Type Policies",
        link: "/typePolicies",
      },
      {
        id: 3.1,
        icon: <IconArrowBarRight size={22} stroke={1.5} />,
        name: "Leave Policies",
        link: "/leavesPolicies",
      },
    ],
  },
];
export const TableHeadiingForLeaves = [
  "Sr. No",
  "Employee Name",
  "Leave Type",
  "Start Date",
  "End Date",
  "Status",
  "Actions",
];
export const TableHeadiingForEmployee = [
  "Sr. No",
  "First Name",
  "Last Name",
  "Email",
  "Role",
  "Department",
  "Status",
  "Action",
];
export const attendancedata = [
  {
    id: 0,
    icon: <IconClock size={40} color="white" />,
    color: "#86efac",
  },
  {
    id: 1,
    icon: <IconBowl size={40} color="white" />,
    color: "#c4b5fd",
  },
  {
    id: 2,
    icon: <IconBrandRust size={40} color="white" />,
    color: "#f0abfc",
  },
  {
    id: 3,
    icon: <IconToolsKitchen size={40} color="white" />,
    color: "#fda4af",
  },
];
export const employeeDepartment = [
  {
    id: 1,
    label: "Human Resource (HR)",
    value: "hr",
  },
  {
    id: 2,
    label: "Software Engineering",
    value: "it",
  },
  {
    id: 3,
    label: "finance",
    value: "finance",
  },
  {
    id: 4,
    label: "marketing",
    value: "marketing",
  },
  {
    id: 4,
    label: "sales",
    value: "sales",
  },
];
export const employeProfetion = [
  {
    id: 1,
    label: "Admin",
    value: "admin",
  },
  { id: 2, label: "HR", value: "hr" },
  { id: 3, label: "Employee", value: "employee" },
];
export const holidayType = [
  { id: 1, label: "National", value: "national" },
  { id: 1, label: "Regional", value: "regional" },
  { id: 1, label: "Event", value: "event" },
];
export const holidayData = [
  { id: "1", label: "Half", value: "half" },
  { id: "2", label: "Full", value: "full" },
];
export const whichHalfData = [
  { id: "1", label: "First Half", value: "first" },
  { id: "2", label: "Secound Half", value: "second" },
];
export const superadminimages = [
  "/images/wolfgang.jpg",
  "/images/milad.jpg",
  "/images/tim.jpg",
  "/images/fotis.jpg",
  "/images/parker.jpg",
  "/images/liana.jpg",
  "/images/boat.jpg",
  "/images/tree.jpg",
  "/images/stairs.jpg",
];
export const baseUrl = "http://localhost:3001/api";
export const tableDataLimit = 10;
export const title = "Brainspack | HRMS";
export const description =
  "A modern, web-based Human Resource Management System (HRMS) designed to streamline employee management, leave tracking, and attendance monitoring with seamless authentication and powerful reporting features.";

export const numberError = "Please Enter 10 Digit Number";

export const firstNameError = "First Name is Required";

export const lastNameError = "Last Name is Required";

export const emailError = "Email Is Required";

export const numberRequiredError = "Phone Number Is Required";

export const roleError = "Role Is Required";

export const departmentError = "Department Is Required";

export const leaveNameError = "Please Select The Leave  Type";

export const descriptionError = "Please Add The Description";

export const holidayTitleError = "Please Add Holiday Title";

export const holidayTypeError = "Select The Holiday Type";

export const projectNameError = "Please Add Project Name";

export const assignedToError = "Please Select Employees";

export const reasonError = "Reason is Required";

export const validNumberError =
  "Please Enter a Valid Number Of Leaves Per Year";

export const postiveNumberError = "Leaves number should Be a positive Number";

export const integerNumberError = "Max leaves per year must be an integer";

export const maxLeavesError = "Max leaves per year is required";

export const minfNameError = "First name must be at least 3 characters";

export const minlNameletter = "Last name must be at least 3 characters";

export const invalidEmailError = "Invalid email format";
