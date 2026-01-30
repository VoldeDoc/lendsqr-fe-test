import { apiClient } from "./fetch-instance";

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const users = await apiClient.get(`/users?email=${email}`, {
      showErrorToast: true,
    });

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const authData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      token: `token_${user.id}_${Date.now()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    localStorage.setItem("auth", JSON.stringify(authData));
    return authData;
  },

  signup: async (data: {
    fullName: string;
    email: string;
    password: string;
    username?: string;
  }) => {
    const existingUsers = await apiClient.get(`/users?email=${data.email}`, {
    showErrorToast: false,
    });

    
    

    if (existingUsers.length > 0) {
      throw new Error("User with this email already exists");
    }

    const newUser = {
      id: Date.now().toString(),
      name: data.fullName,
      username: data.username || data.email.split("@")[0],
      email: data.email,
      password: data.password,
      organization: "Lendsqr",
      phoneNumber: "",
      dateJoined: new Date().toISOString(),
      status: "Active",
      image: "",
      uniqueId: `LSQ${Math.random().toString(36).substr(2, 9)}`,
      tier: 1,
      balance: "₦0.00",
      accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      bank: "Providus Bank",
      personalInfo: {
        fullName: data.fullName,
        phoneNumber: "",
        email: data.email,
        bvn: "",
        gender: "",
        maritalStatus: "",
        children: "None",
        typeOfResidence: "",
      },
      education: {
        level: "",
        employmentStatus: "",
        sector: "",
        duration: "",
        officeEmail: data.email,
        monthlyIncome: "",
        loanRepayment: "",
      },
      socials: {
        twitter: "",
        facebook: "",
        instagram: "",
      },
      guarantors: [],
    };

    const createdUser = await apiClient.post('/users', newUser, {
      showSuccessToast: true,
      successMessage: 'Account created successfully!',
    });

    const authData = {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        username: createdUser.username,
      },
      token: `token_${createdUser.id}_${Date.now()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    localStorage.setItem("auth", JSON.stringify(authData));
    return authData;
  },

  logout: () => {
    localStorage.removeItem("auth");
    return { success: true };
  },

 

forgotPassword: async (email: string) => {  
    const users = await apiClient.get(`/users?email=${email}`, {
      showErrorToast: false,
    });
    const user = users.find((u: any) => u.email === email);
    
    if (!user) {
      throw new Error("No account found with this email address");
    }
    const resetToken = `reset_${email}_${Date.now()}`;
    console.log(`Password reset link: /reset-password?token=${resetToken}`);
    console.log(`This link would be sent to ${email}`);
    
    return { 
      success: true, 
      message: "Reset link sent successfully",
      token: resetToken 
    };
  },



resetPassword: async (token: string, newPassword: string) => {
    if (!token || token.length < 10) {
      throw new Error("Invalid or expired reset token");
    }
    
    try {
      const tokenParts = token.split('_');
      const email = tokenParts[1]; 
      if (!email) {
        throw new Error("Invalid reset token format");
      }
      
      const users = await apiClient.get(`/users?email=${email}`, { 
        showErrorToast: false 
      }); 
      
      if (users.length === 0) {
        throw new Error("User not found");
      }
      
      const userToUpdate = users[0];   
      
      await apiClient.patch(`/users/${userToUpdate.id}`, 
        { password: newPassword },
        { 
          showSuccessToast: false,
          showErrorToast: true 
        }
      );
      
      return { 
        success: true, 
        message: "Password updated successfully"
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to reset password");
    }
  },




  isAuthenticated: () => {
    const authData = localStorage.getItem("auth");
    if (!authData) return false;

    try {
      const { expiresAt } = JSON.parse(authData);
      return Date.now() < expiresAt;
    } catch {
      return false;
    }
  },

  getCurrentUser: () => {
    const authData = localStorage.getItem("auth");
    if (!authData) return null;

    try {
      const { user, expiresAt } = JSON.parse(authData);
      if (Date.now() > expiresAt) {
        localStorage.removeItem("auth");
        return null;
      }
      return user;
    } catch {
      return null;
    }
  },
};

// User API
export const userApi = {
  getAllUsers: () => 
    apiClient.get('/users', { showErrorToast: true }),

  getUserById: (id: string) => 
    apiClient.get(`/users/${id}`, { showErrorToast: true }),

  updateUser: (id: string, data: any) => 
    apiClient.patch(`/users/${id}`, data, {
      showSuccessToast: true,
      successMessage: 'User updated successfully!',
    }),

  addUser: (data: any) => 
    apiClient.post('/users', data, {
      showSuccessToast: true,
      successMessage: 'User added successfully!',
    }),

  deleteUser: (id: string) => 
    apiClient.delete(`/users/${id}`, {
      showSuccessToast: true,
      successMessage: 'User deleted successfully!',
    }),

  searchUsers: (query: string) => 
    apiClient.get(`/users?q=${query}`, { showErrorToast: false }),

  filterByOrganization: (org: string) => 
    apiClient.get(`/users?organization=${org}`, { showErrorToast: false }),

  filterByStatus: (status: string) => 
    apiClient.get(`/users?status=${status}`, { showErrorToast: false }),
};