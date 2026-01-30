import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { AuthLayout } from "../../../components/Layout/layout";
import { Table } from "../../../components/UI/Table/table";
import { userTableColumns } from "../../../constant/data";
import { useUserManagement } from "../../../components/Dashboard/Users/Tools/utils";
import { userApi } from "../../../services/api";
import type { User } from "../../../types";
import Loading from "../../../utils/loading";
import "../../../styles/userPage.scss";

export default function ActiveUsersPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const { handleView, handleBlacklist, handleActivate } = useUserManagement();

    useEffect(() => {
        fetchActiveUsers();
    }, []);

    const fetchActiveUsers = async () => {
        try {
            setLoading(true);
            const data = await userApi.getAllUsers();
            const activeUsers = data.filter((user: User) => user.status === "Active");
            setUsers(activeUsers);
        } catch (error) {
            console.error('Failed to fetch active users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlacklistUser = async (user: User) => {
        await handleBlacklist(user, fetchActiveUsers);
    };

    const handleActivateUser = async (user: User) => {
        await handleActivate(user, fetchActiveUsers);
    };

    if (loading) {
        return (
            <AuthLayout>
                <Loading message="Loading active users..." />
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="users-page">
                <button className="back-button" onClick={() => navigate("/dashboard/users")}>
                    <BsArrowLeft />
                    <span>Back to All Users</span>
                </button>

                <h1 className="page-title">Active Users ({users.length})</h1>

                <div className="table-section">
                    <Table
                        columns={userTableColumns}
                        data={users}
                        onView={(row) => handleView(row as User)}
                        onBlacklist={(row) => handleBlacklistUser(row as User)}
                        onActivate={(row) => handleActivateUser(row as User)}
                        itemsPerPage={10}
                    />
                </div>
            </div>
        </AuthLayout>
    );
}