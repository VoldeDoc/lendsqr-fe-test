import type { ReactNode } from "react";
import type { MenuItem} from "../types";
import { 
  MdPeople, 
  MdBusiness, 
  MdSettings,
  MdCorporateFare,
  MdTune,
  MdLogout
} from "react-icons/md";
import { PiHandshake } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsFileEarmarkText } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";


export const floatersData = {
    greetings: ['Hi!', 'Hello', 'Hey', 'Welcome'],
    dotsCount: 8,
    besideGreetings: ['Hey!', 'Hi', 'Hello'],
    besideDotsCount: 4,
};

//meny items for sidebar
export const MENU_ITEMS: MenuItem[] = [
  {
    name: "Switch Organization",
    isSection: true,
    isOrganizationSwitcher: true,
    iconSrc: "/assets/images/dashboard/users/organization.svg",
    submenus: [
      { name: "Organization 1", path: "#", icon: MdCorporateFare },
      { name: "Organization 2", path: "#", icon: MdCorporateFare },
      { name: "Organization 3", path: "#", icon: MdCorporateFare },
    ],
  },
  {
    name: "Dashboard",
    isDashboard: true,
    iconSrc: "/assets/images/dashboard/users/dashboard.svg",
  },
  {
    name: "CUSTOMERS",
    isSection: true,
    icon: MdPeople,
    submenus: [
      { name: "Users", path: "/dashboard/users", iconSrc: '/assets/images/dashboard/users/user-friends 1.svg' },
      { name: "Guarantors", path: "#", iconSrc: '/assets/images/dashboard/users/users.svg' },
      { name: "Loans", path: "/dashboard/users/loans", iconSrc: '/assets/images/dashboard/users/loan.svg' },
      { name: "Decision Models", path: "#", icon: PiHandshake },
      { name: "Savings", path: "/dashboard/users/savings", iconSrc: '/assets/images/dashboard/users/piggy-bank 1.svg' },
      { name: "Loan Requests", path: "#", iconSrc: '/assets/images/dashboard/users/loan.svg' },
      { name: "Whitelist", path: "#", iconSrc: '/assets/images/dashboard/users/user-check 1.svg' },
      { name: "Karma", path: "#", iconSrc: '/assets/images/dashboard/users/user-cog 1.svg' },
    ],
  },
  {
    name: "BUSINESSES",
    isSection: true,
    icon: MdBusiness,
    submenus: [
      { name: "Organization", path: "#", iconSrc: "/assets/images/dashboard/users/organization.svg" },
      { name: "Loan Products", path: "#", iconSrc: "/assets/images/dashboard/users/loan.svg" },
      { name: "Savings Products", path: "#", iconSrc: "/assets/images/dashboard/users/bank.svg" },
      { name: "Fees and Charges", path: "#", iconSrc: "/assets/images/dashboard/users/charges.svg" },
      { name: "Transactions", path: "#", iconSrc: "/assets/images/dashboard/users/transactions.svg" },
      { name: "Services", path: "#", iconSrc: "/assets/images/dashboard/users/services.svg" },
      { name: "Service Account", path: "#", iconSrc: "/assets/images/dashboard/users/user-cog 1.svg" },
      { name: "Settlements", path: "#", iconSrc: "/assets/images/dashboard/users/settlement.svg" },
      { name: "Reports", path: "#", iconSrc: "/assets/images/dashboard/users/report.svg" },
      { name: "Preferences", path: "#", icon: MdTune },
    ],
  },
  {
    name: "SETTINGS",
    isSection: true,
    icon: MdSettings,
    submenus: [
      { name: "Preferences", path: "#", icon: MdTune },
      { name: "Fees and Pricing", path: "#", iconSrc: "/assets/images/dashboard/users/fees.svg" },
      { name: "Audit Logs", path: "#", iconSrc: "/assets/images/dashboard/users/audit.svg" },
    ],
  },
  {
    name: "Logout",
    isLogout: true,
    icon :MdLogout
  }
  
];

import type { Column } from "../types";

//columns for user table
export const userTableColumns: Column[] = [
    { key: "organization", label: "Organization", filterable: true, sortable: true },
    { key: "username", label: "Username", filterable: true, sortable: true },
    { key: "email", label: "Email", filterable: true, sortable: true },
    { key: "phoneNumber", label: "Phone Number", filterable: true, sortable: true },
    { key: "dateJoined", label: "Date Joined", filterable: true, sortable: true },
    { key: "status", label: "Status", filterable: true, sortable: true },
];


//data type for user stats cards
export interface StatData {
    icon: ReactNode;
    title: string;
    value: string;
    iconColor: string;
    iconBgColor: string;
    link: string;
}

//data for user stats cards
export const userStatsData: StatData[] = [
    {
        icon: <FiUsers />,
        title: "Users",
        value: "2,453",
        iconColor: "#df18ff",
        iconBgColor: "rgba(223, 24, 255, 0.1)",
        link: "/dashboard/users/all",
    },
    {
        icon: <HiOutlineUserGroup />,
        title: "Active Users",
        value: "2,453",
        iconColor: "#5718ff",
        iconBgColor: "rgba(87, 24, 255, 0.1)",
        link: "/dashboard/users/active",
    },
    {
        icon: <BsFileEarmarkText />,
        title: "Users with Loans",
        value: "12,453",
        iconColor: "#f55f44",
        iconBgColor: "rgba(245, 95, 68, 0.1)",
        link: "/dashboard/users/loans",
    },
    {
        icon: <RiMoneyDollarCircleLine />,
        title: "Users with Savings",
        value: "102,453",
        iconColor: "#ff3366",
        iconBgColor: "rgba(255, 51, 102, 0.1)",
        link: "/dashboard/users/savings",
    },
];


//tabs for user details page
export const userDetailsTabs = [
    { id: "general", label: "General Details" },
    { id: "documents", label: "Documents" },
    { id: "bank", label: "Bank Details" },
    { id: "loans", label: "Loans" },
    { id: "savings", label: "Savings" },
    { id: "app", label: "App and System" },
];

export const personalInfoFields = [
    { key: "fullName", label: "Full Name" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email Address" },
    { key: "bvn", label: "Bvn" },
    { key: "gender", label: "Gender" },
    { key: "maritalStatus", label: "Marital Status" },
    { key: "children", label: "Children" },
    { key: "typeOfResidence", label: "Type of Residence" },
];

export const educationFields = [
    { key: "level", label: "Level of Education" },
    { key: "employmentStatus", label: "Employment Status" },
    { key: "sector", label: "Sector of Employment" },
    { key: "duration", label: "Duration of Employment" },
    { key: "officeEmail", label: "Office Email" },
    { key: "monthlyIncome", label: "Monthly Income" },
    { key: "loanRepayment", label: "Loan Repayment" },
];

export const socialFields = [
    { key: "twitter", label: "Twitter" },
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
];

export const guarantorFields = [
    { key: "fullName", label: "Full Name" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email Address" },
    { key: "relationship", label: "Relationship" },
];