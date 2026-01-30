import * as yup from 'yup';

export  const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


export const signupSchema = yup.object().shape({
    fullName: yup
        .string()
        .required('Full name is required')
        .min(3, 'Full name must be at least 3 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});


export const profileSchema = yup.object({
    name: yup.string().required('Full name is required'),
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    organization: yup.string().required('Organization is required'),
    image: yup.string(),
    personalInfo: yup.object({
        fullName: yup.string().required('Full name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        bvn: yup.string(),
        gender: yup.string(),
        maritalStatus: yup.string(),
        children: yup.string(),
        typeOfResidence: yup.string(),
    }),
    education: yup.object({
        level: yup.string(),
        employmentStatus: yup.string(),
        sector: yup.string(),
        duration: yup.string(),
        officeEmail: yup.string().email('Invalid email'),
        monthlyIncome: yup.string(),
        loanRepayment: yup.string(),
    }),
    socials: yup.object({
        twitter: yup.string().nullable(),
        facebook: yup.string().nullable(),
        instagram: yup.string().nullable(),
    }),
});