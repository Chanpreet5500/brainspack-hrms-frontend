import {
  IconAddressBook,
  IconBeach,
  IconBowl,
  IconBrandRust,
  IconClock,
  IconGauge,
  IconHome2,
  IconMessageFilled,
  IconNews,
  IconPhotoStar,
  IconSearch,
  IconSettings,
  IconToolsKitchen,
  IconTransfer,
  IconTrash,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";

export const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
  { label: "Employees", icon: IconGauge, link: "/employees" },
  { label: "New dashboard", icon: IconGauge, link: "/newdashboard" },
];

export const appdroperdata = [
  { id: 0, icon: IconSettings, name: "Settings" },
  { id: 1, icon: IconMessageFilled, name: "Messages" },
  { id: 2, icon: IconPhotoStar, name: "Gallery" },
  { id: 3, icon: IconSearch, name: "Search" },
];

export const dangerdroperdata = [
  { id: 0, icon: IconTransfer, name: "Transfer my data" },
  { id: 1, icon: IconTrash, name: "Delete my Account" },
];
export const dummy = [
  {
    title: "Number of Employee",
    count: 450,
    icon: <IconAddressBook />,
    color: "#c9b7eb",
    iconBgColor: "#b4a4d6",
  },
  {
    title: "On Leave",
    count: 20,
    icon: <IconNews />,
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
    count: 4,
    icon: <IconBeach />,
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
    icon: <IconUsers size={22} stroke={1.5} />,
    name: "Register",
    link: "/register",
  },
  {
    id: 2,
    icon: <IconUsers size={22} stroke={1.5} />,
    name: "Leaves Management",
    link: "/leaves",
  },
];

export const TableRenderData = [
  {
    id: 1,
    fname: "Athena",
    lname: "Weissnat",
    email: "Elouise.Prohaska@yahoo.com",
    role: "Admin",
    department: "Software Engineer",
  },
  {
    id: 2,
    fname: "Athena",
    lname: "Weissnat",
    email: "Elouise.Prohaska@yahoo.com",
    role: "Admin",
    department: "Software Engineer",
  },
  {
    id: 3,
    fname: "Athena",
    lname: "Weissnat",
    email: "Elouise.Prohaska@yahoo.com",
    role: "Admin",
    department: "Software Engineer",
  },
];

export const TableHeadiingForLeaves = [
  "Sr. No",
  "Employee Name",
  "Leave Type",
  "Start Date",
  "End Date",
  "Status",
  "Actions"
];

export const TableHeadiingForEmployee = [
  "Sr. No",
  "First Name",
  "Last Name",
  "Email",
  "Role",
  "Department",
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
export const employeedata = [
  {
    // id: 1,
    fname: "Athena",
    lname: "Weissnat",
    email: "Elouise.Prohaska@yahoo.com",
    role: "admin",
    department: "software engineering",
  },
  {
    // id: 2,
    fname: "Athena",
    lname: "Weissnat",
    email: "Elouise.Prohaska@yahoo.com",
    role: "admin",
    department: "software engineering",
  },
  {
    // id: 3,
    fname: "Athena",
    lname: "Weissnat",
    email: "Elouise.Prohaska@yahoo.com",
    role: "admin",
    department: "software engineering",
  },
];
export const employeeDepartment = [
  {
    id: 1,
    label: "Human Resource (HR)",
    value: "human resource (HR)",
  },
  {
    id: 2,
    label: "Software Engineering",
    value: "software engineering",
  },
  {
    id: 3,
    label: "User Experience (UX)",
    value: "user experience (UX)",
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

export const leavedata = [
  {
    name: 'Athena Weissnat',
    leavetype: 'Casual Leave',
    startdate: "12/43/2022",
    enddate: "13/67/7809",
    status: 'Pending',
  },
  {
    name: 'Asif Ali',
    leavetype: 'Sick Leave',
    startdate: "12/43/2022",
    enddate: "13/67/7809",
    status: 'Pending',
  },
  {
    name: 'Shubham Kaushal',
    leavetype: 'Casual Leave',
    startdate: "12/43/2022",
    enddate: "13/67/7809",
    status: 'Pending',
  },
  {
    name: 'Sagar Rana',
    leavetype: 'Sick Leave',
    startdate: "12/43/2022",
    enddate: "13/67/7809",
    status: 'Approved',
  },
  {
    name: 'Gourav Kashyap',
    leavetype: 'Sick Leave',
    startdate: "12/43/2022",
    enddate: "13/67/7809",
    status: 'Approved',
  },
  {
    name: 'Nisha Arora',
    leavetype: 'Sick Leave',
    startdate: "12/43/2022",
    enddate: "13/67/7809",
    status: 'Approved',
  },
]
export const leaveTypes = [
  {
    id: 1,
    label: "Sick Leave",
    value: "sick-leave",
  },
  { id: 2, label: "Casual Leave", value: "casual-leave" },
  { id: 3, label: "Emergency Leave", value: "emergency-leave" }
]