import type { ReactNode } from "react";

export interface LoginDataValues{
    email: string;
    password:string;
}

//sidebar menu item types
type Submenu = {
  name: string;
  path: string;
  icon?: React.ComponentType;
  iconSrc?: string;
};

export type MenuItem = {
  name: string;
  isSection?: boolean;
  icon?: React.ComponentType;
  iconSrc?: string;
  path?: string;
  submenus?: Submenu[];
  isOrganizationSwitcher?: boolean;
  isDashboard?: boolean;
  isLogout?: boolean;
};

//table component types
export interface Column {
    key: string;
    label: string;
    filterable?: boolean;
    sortable?: boolean;
}

export interface TableData {
    id: string | number;
    [key: string]: any;
}

export interface TableProps {
    columns: Column[];
    data: TableData[];
    onView?: (row: TableData) => void;
    onBlacklist?: (row: TableData) => void;
    onActivate?: (row: TableData) => void;
    itemsPerPage?: number;
}

export type SortOrder = "asc" | "desc" | null;

//pagination types
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    perPage: number;
    totalItems: number;
    pageNumbers: (number | string)[];
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
    onNext: () => void;
    onPrevious: () => void;
}


export interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  iconColor?: string;
  iconBgColor?: string;
  link?: string;
  onClick?: () => void;
}

//basic user types
export interface User {
  id: string | number; 
  organization: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  hasLoan?: boolean;
  hasSavings?: boolean;
  image?: string;
  tier?: number;
  bank?: string;
  accountBalance?: string;
  bvn?: string;
}

//detailed user types
export interface UserDetails extends  Omit<User, 'id'> {
    id: string;
    image: string;
    name: string;
    uniqueId: string;
    username: string; 
    tier: number;
    balance: string;
    accountNumber: string;
    bank: string;
    personalInfo: {
        fullName: string;
        phoneNumber: string;
        email: string;
        bvn: string;
        gender: string;
        maritalStatus: string;
        children: string;
        typeOfResidence: string;
    };
    education: {
        level: string;
        employmentStatus: string;
        sector: string;
        duration: string;
        officeEmail: string;
        monthlyIncome: string;
        loanRepayment: string;
    };
    socials: {
        twitter: string;
        facebook: string;
        instagram: string;
    };
    guarantors: Array<{
        fullName: string;
        phoneNumber: string;
        email: string;
        relationship: string;
    }>;
}

//profile form types
export type ProfileFormFields = Pick<UserDetails, 
    'name' | 'username' | 'email' | 'organization' | 'image' | 
    'personalInfo' | 'education' | 'socials'
> & {
    phoneNumber: string;
};

export interface SignupDataValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}