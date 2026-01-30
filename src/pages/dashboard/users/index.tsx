import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../../components/Layout/layout";
import "../../../styles/userPage.scss";
import { StatsCard } from "../../../components/UI/card";
import { AddUserModal } from "../../../components/Dashboard/Users/Tools/AddUserModal";
import { Table } from "../../../components/UI/Table/table";
import { userTableColumns } from "../../../constant/data";
import { useUserManagement } from "../../../components/Dashboard/Users/Tools/utils";
import { userApi } from "../../../services/api";
import type { User } from "../../../types";
import { FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsFileEarmarkText } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Loading from "../../../utils/loading";

export default function UsersPage() {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const {
        uniqueOrganizations,
        handleView,
        handleBlacklist,
        handleActivate,
        handleAddUser,
    } = useUserManagement();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userApi.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUserSubmit = async (userData: any) => {
        await handleAddUser(userData);
        await fetchUsers(); 
    };

    const handleBlacklistUser = async (user: User) => {
        await handleBlacklist(user, fetchUsers);
    };

    const handleActivateUser = async (user: User) => {
        await handleActivate(user, fetchUsers);
    };

    // Calculate dynamic stats based on fetched users
    const userStatsData = useMemo(() => {
        const totalUsers = users.length;
        const activeUsers = users.filter((user) => user.status === "Active").length;
        const usersWithLoans = users.filter((user) => user.hasLoan === true).length;
        const usersWithSavings = users.filter((user) => user.hasSavings === true).length;

        return [
            {
                icon: <FiUsers />,
                title: "USERS",
                value: totalUsers.toLocaleString(),
                iconColor: "#df18ff",
                iconBgColor: "rgba(223, 24, 255, 0.1)",
                onClick: () => {}, 
            },
            {
                icon: <HiOutlineUserGroup />,
                title: "ACTIVE USERS",
                value: activeUsers.toLocaleString(),
                iconColor: "#5718ff",
                iconBgColor: "rgba(87, 24, 255, 0.1)",
                onClick: () => navigate("/dashboard/users/active"),
            },
            {
                icon: <BsFileEarmarkText />,
                title: "USERS WITH LOANS",
                value: usersWithLoans.toLocaleString(),
                iconColor: "#f55f44",
                iconBgColor: "rgba(245, 95, 68, 0.1)",
                onClick: () => navigate("/dashboard/users/loans"),
            },
            {
                icon: <RiMoneyDollarCircleLine />,
                title: "USERS WITH SAVINGS",
                value: usersWithSavings.toLocaleString(),
                iconColor: "#ff3366",
                iconBgColor: "rgba(255, 51, 102, 0.1)",
                onClick: () => navigate("/dashboard/users/savings"),
            },
        ];
    }, [users, navigate]);

    if (loading) {
        return (
            <AuthLayout>
                <Loading message="Loading users..." />
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="users-page">
                <h1 className="page-title">Users</h1>

                {/* Stats Grid with Dynamic Data */}
                <div className="stats-grid">
                    {userStatsData.map((stat, index) => (
                        <StatsCard
                            key={index}
                            icon={stat.icon}
                            title={stat.title}
                            value={stat.value}
                            iconColor={stat.iconColor}
                            iconBgColor={stat.iconBgColor}
                            onClick={stat.onClick}
                        />
                    ))}
                </div>

                {/* Add User Button */}
                <div className="table-actions-bar">
                    <button className="add-user-btn" onClick={() => setShowAddModal(true)}>
                        + Add New User
                    </button>
                </div>

                {/* Table Component */}
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

                {/* Add User Modal */}
                <AddUserModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddUserSubmit}
                    organizations={uniqueOrganizations}
                />
            </div>
        </AuthLayout>
    );
}