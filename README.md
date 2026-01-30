# Lendsqr Admin Dashboard

## 📋 Project Overview

A comprehensive admin dashboard application for Lendsqr, designed to manage users, loans, savings, and guarantors. The application features authentication, user management, advanced filtering, sorting, pagination, and data persistence using localStorage and Redux state management.

### Key Features

- **Authentication System**: Complete login, signup, forgot password, and reset password functionality
- **User Management**: View, filter, sort, and manage users with detailed profiles
- **Advanced Actions**: Blacklist users, view details, activate/deactivate accounts, view guarantors
- **Data Filtering**: Multi-field filtering with search functionality
- **Sorting System**: Ascending and descending sort for all table columns
- **Pagination**: Navigate through large datasets efficiently
- **User Categories**: Filter users by savings, loans, active status
- **Data Persistence**: Redux + localStorage integration for offline data access
- **Responsive Design**:  with SCSS styling
- **Loading States**: Smooth transitions with animated loading screens
- **Protected Routes**: Secure dashboard routes with authentication guards
- **Toast Notifications**: Real-time feedback for user actions
- **Form Validation**: React Hook Form + Yup validation schema

---

## 🛠️ Tech Stack

### Frontend Framework & Libraries
- **React 18** with TypeScript
- **React Router DOM v6** - Client-side routing
- **Redux Toolkit** - State management
- **React Redux** - Redux bindings for React

### Form & Validation
- **React Hook Form** - Form state management
- **Yup** - Schema validation

### Styling
- **SCSS/Sass** - Advanced CSS preprocessing
- **CSS3** - Custom animations and transitions
- **React Icons** - Icon library

### Development Tools
- **TypeScript** - Type safety
- **JSON Server** - Mock REST API (500 user records)
- **LocalStorage API** - Data persistence

### UI/UX Features
- **React Toastify** - Toast notifications
- **Custom Loading Component** - Page transition animations
- **Floating Animations** - Welcome and signup page effects

---

## Folder Structure

```
lendsqr/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Users/
│   │   │   │   ├── activeUsers.tsx
│   │   │   │   ├── usersWithLoans.tsx
│   │   │   │   ├── userWithSavings.tsx
│   │   │   │   └── guarantors.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── LoginPage/
│   │   │   │   └── loginPage.tsx
│   │   │   ├── SignupPage/
│   │   │   │   └── signupPage.tsx
│   │   │   ├── forgetPwd/
│   │   │   │   └── forgetpwd.tsx
│   │   │   └── Resetpwd/
│   │   │       └── Resetpwd.tsx
│   │   └── dashboard/
│   │       └── users/
│   │           ├── index.tsx
│   │           ├── userDetails.tsx
│   │           └── userProfile.tsx
│   ├── services/
│   │   └── protected-auth.tsx
│   ├── store/
│   │   ├── rootReducer.ts
│   │   ├── store.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       └── userSlice.ts
│   ├── utils/
│   │   ├── loading.tsx
│   │   ├── validation/
│   │   │   ├── loginSchema.ts
│   │   │   ├── signupSchema.ts
│   │   │   └── resetPasswordSchema.ts
│   │   └── ...
│   ├── styles/
│   │   ├── table.scss
│   │   ├── auth.scss
│   │   └── ...
│   ├── types/
│   │   ├── user.types.ts
│   │   └── rootState.types.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── db.json (JSON Server data - 500 users)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd lendsqr
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up JSON Server**
```bash
npm install -g json-server
```

4. **Start JSON Server (Port 3001)**
```bash
json-server --watch db.json --port 3001
```

5. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

6. **Open in browser**
```
http://localhost:5173
```

## Docker Deployment

### Prerequisites
- Docker installed on your system
- Docker Compose (usually included with Docker)

### Quick Start with Docker

1. **Build and run with Docker Compose (Recommended)**
```bash
npm run docker:up
```

2. **Or build manually**
```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run
```

3. **Access the application**
- Frontend: http://localhost:3000
- API: http://localhost:5000

### Docker Commands

```bash
# Build the image
docker build -t lendsqr-app .

# Run the container
docker run -p 3000:3000 -p 5000:5000 lendsqr-app

# Run with Docker Compose
docker-compose up --build

# Stop Docker Compose
docker-compose down
```

### What's Included
- **React App**: Served on port 3000 with production build
- **JSON Server**: Mock API on port 5000 with your `db.json` data
- **Hot Reload**: For development (when using volumes)
- **Multi-stage Build**: Optimized for production

---

## 🧪 Testing Instructions

### Manual Testing

#### Authentication Flow
1. **Signup**: Navigate to `/signup` and create an account
2. **Login**: Use credentials to login at `/login`
3. **Protected Routes**: Try accessing `/dashboard/users` without login (should redirect)
4. **Forgot Password**: Test password recovery flow at `/auth/forgot-password`
5. **Reset Password**: Complete password reset at `/auth/reset-password`

#### Dashboard Features
1. **Users Table**:
   - View all users at `/dashboard/users`
   - Test pagination (navigate through pages)
   - Test sorting (click column headers - A-Z, Z-A)
   - Test filtering (use filter dropdown)
   - Test search functionality

2. **User Actions**:
   - Click three-dot menu on any user
   - **View Details**: Opens user detail page
   - **Blacklist User**: Marks user as blacklisted
   - **Activate User**: Changes status to active
   - **View Guarantors**: Shows user's guarantors

3. **User Categories**:
   - Active Users: `/dashboard/users/active`
   - Users with Loans: `/dashboard/users/loans`
   - Users with Savings: `/dashboard/users/savings`
   - Guarantors: `/dashboard/users/:userId/guarantors`

4. **Data Persistence**:
   - Perform actions (filter, sort, blacklist)
   - Refresh page
   - Verify data persists via localStorage + Redux

#### Responsive Testing
- Test on mobile (< 480px)
- Test on tablet (768px)
- Test on desktop (> 1024px)

---

## 🎯 Key Features Explained

### 1. Authentication System
- **Login**: Email/password validation with Yup schema
- **Signup**: Complete registration with animated welcome screen
- **Forgot Password**: page
- **Reset Password**: page
- **Protected Routes**: HOC wrapper preventing unauthorized access

### 2. User Management

#### Users Table Features
- **Pagination**: Navigate through 500 users (10/25/50/100 per page)
- **Sorting**: Click column headers to sort A-Z or Z-A
- **Filtering**: Multi-field filter with:
  - Organization search
  - Username search
  - Email search
  - Date range selection
  - Phone number search
  - Status filter (Active, Inactive, Pending, Blacklisted)
- **Search**: Real-time search across all fields
- **Actions Dropdown**:
  - View Details
  - Blacklist User
  - Activate User
  - View Guarantors

#### User Detail Page
- **Personal Information**: Full name, phone, email, BVN, gender, marital status
- **Education & Employment**: Level, status, sector, duration, income
- **Socials**: Twitter, Facebook, Instagram handles
- **Guarantors**: List of user's guarantors with contact info

### 3. User Categories

#### Active Users Page (`/dashboard/users/active`)
- Filters and displays only users with "Active" status
- Same table features (sorting, pagination, filtering)
- Shows count of active users

#### Users with Loans (`/dashboard/users/loans`)
- Displays users who have active loans
- Shows loan amount and status
- Filterable by loan status

#### Users with Savings (`/dashboard/users/savings`)
- Lists users with savings accounts
- Displays savings balance
- Sortable by amount

#### Guarantors Page (`/dashboard/users/:userId/guarantors`)
- Shows all guarantors for a specific user
- Displays guarantor contact information
- Relationship to user

### 4. State Management

#### Redux Store Structure
```typescript
store/
├── rootReducer.ts        // Combines all reducers
├── store.ts              // Redux store configuration
└── slices/
    ├── authSlice.ts      // Authentication state
    └── userSlice.ts      // User data state
```

#### RootState Type
```typescript
interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
  };
  users: {
    data: User[];
    filteredUsers: User[];
    selectedUser: User | null;
    filters: FilterState;
    sortConfig: SortConfig;
    pagination: PaginationState;
  };
}
```

#### LocalStorage Integration
- **Persist Redux State**: Automatically saves to localStorage
- **Hydrate on Load**: Restores state from localStorage
- **Clear on Logout**: Removes stored data
- **Keys Used**:
  - `auth_token`
  - `user_data`
  - `filters_state`
  - `blacklisted_users`

### 5. Validation Schemas

#### Login Schema (Yup)
```typescript
const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
```

#### Signup Schema
```typescript
const signupSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
```

#### Reset Password Schema
```typescript
const resetPasswordSchema = yup.object({
  password: yup.string().min(8).required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
```

### 6. JSON Server Configuration

#### Database Structure (db.json)
```json
{
  "users": [
    {
      "id": "1",
      "organization": "Lendsqr",
      "username": "john_doe",
      "email": "john@example.com",
      "phoneNumber": "+234 123 456 7890",
      "dateJoined": "2023-01-15T10:30:00Z",
      "status": "Active",
      "hasLoan": true,
      "hasSavings": true,
      "loanAmount": 50000,
      "savingsBalance": 100000,
      "guarantors": [...],
      ...
    },
    
  ]
}
```

#### API Endpoints
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users?status=Active` - Filter by status
- `GET /users?hasLoan=true` - Filter by loan status
- `PATCH /users/:id` - Update user
- `POST /users` - Create user

### 7. Animations & UX

#### Loading Component
- Displays on route changes
- 1-second delay for smooth transitions
- Animated spinner with message

#### Floating Animations
- **Welcome Page**: Floating SVG elements
- **Signup Page**: Animated form entry
- **CSS Keyframes**: Smooth, performant animations

#### Toast Notifications
- Success: Green toast for successful actions
- Error: Red toast for failed operations
- Info: Blue toast for information
- Warning: Yellow toast for warnings

---

## 🎨 Styling Architecture

### SCSS Structure
- **table.scss**: Complete table styling with responsive breakpoints
- **auth.scss**: Authentication pages styling
- **dashboard.scss**: Dashboard layout and components
- **animations.scss**: Reusable animation keyframes
- **variables.scss**: Color palette, breakpoints, typography

### Responsive Breakpoints
```scss
// Mobile
@media (max-width: 480px) { }

// Tablet
@media (max-width: 768px) { }

// Desktop
@media (min-width: 1024px) { }
```

---

## 🔐 Security Features

1. **Protected Routes**: Authentication guard HOC
2. **XSS Prevention**: Input sanitization

---

## 🌐 Deployment

### Deployment URL
```
https://lendsqr-fe-test-yusuf-murillos-projects.vercel.app
```

### Build Instructions
```bash
npm run build
# or
yarn build
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Lendsqr
```

---

## 📊 API Integration

### User Actions API Calls

#### Blacklist User
```typescript
const blacklistUser = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'Blacklisted' }),
  });
  return response.json();
};
```

#### Activate User
```typescript
const activateUser = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'Active' }),
  });
  return response.json();
};
```

---

## 📱 Available Routes

### Authentication Routes
- `/` - Redirects to login
- `/login` - Login page
- `/signup` - Signup page with floating animations
- `/auth/forgot-password` - Forgot password page
- `/auth/reset-password` - Reset password page (protected)

### Dashboard Routes (All Protected)
- `/dashboard/users` - Main users table
- `/dashboard/users/:id` - User details page
- `/dashboard/profile` - User profile page
- `/dashboard/users/active` - Active users only
- `/dashboard/users/loans` - Users with loans
- `/dashboard/users/savings` - Users with savings
- `/dashboard/users/:userId/guarantors` - User's guarantors list

---

## 🐛 Known Issues & Limitations

1. **JSON Server**: Not suitable for production (use real backend)
2. **LocalStorage**: Limited to 5-10MB storage
3. **No Real Authentication**: Mock JWT tokens
4. **No Image Upload**: Static user avatars
5. **Client-Side Filtering**: Performance issues with large datasets

---

