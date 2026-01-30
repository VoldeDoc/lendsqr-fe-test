import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthLayout } from "../../../components/Layout/layout";
import { userDetailsTabs } from "../../../constant/data";
import { useUserTab } from "../../../components/UI/tabs";
import { GeneralDetailsTab } from "../../../components/Dashboard/Users/Tools/generalDetailTabs";
import { EmptyTab } from "../../../components/Dashboard/Users/Tools/otherTabs";
import { UserSummaryCard } from "../../../components/Dashboard/Users/Tools/userSummaryCard";
import { BsArrowLeft } from "react-icons/bs";
import { userApi } from "../../../services/api";
import { useUserManagement } from "../../../components/Dashboard/Users/Tools/utils";
import type { User } from "../../../types";
import Loading from "../../../utils/loading";

export default function UserDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { activeTab, setActiveTab } = useUserTab(id || "1");
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const { handleBlacklist, handleActivate } = useUserManagement();

    useEffect(() => {
        if (id) {
            fetchUserDetails();
        }
    }, [id]);

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const data = await userApi.getUserById(id!);
            console.log("Fetched user data:", data);
            const transformedData = {
                ...data,
                image: data.image || "/default-avatar.png",
                name: `${data.name} `,
                uniqueId: data.uniqueId.toString(),
                tier: data.tier || 1,
                bank: data.bank || "N/A",
                accountBalance: data.accountBalance || "₦0.00",
                bvn: data.bvn || "N/A",
            };
            setUserData(transformedData);
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlacklistUser = async () => {
        if (userData) {
            await handleBlacklist(userData as User, fetchUserDetails);
        }
    };

    const handleActivateUser = async () => {
        if (userData) {
            await handleActivate(userData as User, fetchUserDetails);
        }
    };

    const renderTabContent = () => {
        if (!userData) return null;

        switch (activeTab) {
            case "general":
                return <GeneralDetailsTab userData={userData} />;
            case "documents":
                return <EmptyTab message="No documents available" />;
            case "bank":
                return <EmptyTab message="No bank details available" />;
            case "loans":
                return <EmptyTab message="No loans available" />;
            case "savings":
                return <EmptyTab message="No savings available" />;
            case "app":
                return <EmptyTab message="No app and system data available" />;
            default:
                return <EmptyTab message="No data available" />;
        }
    };

    if (loading) {
        return (
            <AuthLayout>
                <Loading message="Loading user details..." />
            </AuthLayout>
        );
    }

    if (!userData) {
        return (
            <AuthLayout>
                <div className="user-details-page">
                    <button className="back-button" onClick={() => navigate("/dashboard/users")}>
                        <BsArrowLeft />
                        <span>Back to Users</span>
                    </button>
                    <div className="error-message">User not found</div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="user-details-page">
                <button className="back-button" onClick={() => navigate("/dashboard/users")}>
                    <BsArrowLeft />
                    <span>Back to Users</span>
                </button>

                <div className="page-header">
                    <h1 className="page-title">User Details</h1>
                    <div className="user-actions">
                        <button className="action-btns action-btns--blacklist" onClick={handleBlacklistUser}>
                            Blacklist User
                        </button>
                        <button className="action-btns action-btns--activate" onClick={handleActivateUser}>
                            Activate User
                        </button>
                    </div>
                </div>

                <UserSummaryCard
                    userData={userData}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabs={userDetailsTabs}
                />

                {renderTabContent()}
            </div>
        </AuthLayout>
    );
}