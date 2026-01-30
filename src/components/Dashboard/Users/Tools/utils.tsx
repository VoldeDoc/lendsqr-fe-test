import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../../types";
import { userApi } from "../../../../services/api";

export const useUserManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);

    // Get unique organizations from users data
    const uniqueOrganizations = useMemo(
        () => Array.from(new Set(users.map((user) => user.organization))),
        [users]
    );

    const handleView = useCallback((row: User) => {
        console.log("View:", row);
        navigate(`/dashboard/users/${row.id}`);
    }, [navigate]);

    const handleBlacklist = useCallback(async (row: User, onSuccess?: () => void) => {
        try {
            await userApi.updateUser(String(row.id), { ...row, status: "Blacklisted" });
            console.log("Blacklisted:", row);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error("Failed to blacklist user:", error);
        }
    }, []);

    const handleActivate = useCallback(async (row: User, onSuccess?: () => void) => {
        try {
            await userApi.updateUser(String(row.id), { ...row, status: "Active" });
            console.log("Activated:", row);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error("Failed to activate user:", error);
        }
    }, []);

    const handleAddUser = useCallback(async (newUser: Omit<User, "id">) => {
        try {
            const createdUser = await userApi.addUser(newUser);
            console.log("New user added:", createdUser);
            return createdUser;
        } catch (error) {
            console.error("Failed to add user:", error);
            throw error;
        }
    }, []);

    return {
        users,
        setUsers,
        uniqueOrganizations,
        handleView,
        handleBlacklist,
        handleActivate,
        handleAddUser,
    };
};