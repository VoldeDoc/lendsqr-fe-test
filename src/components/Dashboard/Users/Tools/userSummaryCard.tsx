import { MdStarOutline, MdStar } from "react-icons/md";
import type { UserDetails } from "../../../../types";
import { FaRegUserCircle } from "react-icons/fa";


interface UserSummaryCardProps {
    userData: UserDetails;
    activeTab: string;
    onTabChange: (tabId: string) => void;
    tabs: Array<{ id: string; label: string }>;
}

export const UserSummaryCard = ({ userData, activeTab, onTabChange, tabs }: UserSummaryCardProps) => {
    const renderStars = (tier: number) => {
        return (
            <div className="user-tier-stars">
                {[1, 2, 3].map((star) => (
                    <span key={star}>
                        {star <= tier ? (
                            <MdStar className="star-filled" />
                        ) : (
                            <MdStarOutline className="star-outline" />
                        )}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="user-summary-card">
            <div className="user-summary-top">
                <div className="user-profile">
                    <div className="user-avatar">
                            <FaRegUserCircle size={48} />

                    </div>
                    <div className="user-info">
                        <h2 className="user-name">{userData.name}</h2>
                        <p className="user-id">{userData.uniqueId}</p>
                    </div>
                </div>

                <div className="user-divider"></div>

                <div className="user-tier">
                    <p className="tier-label">User's Tier</p>
                    {renderStars(userData.tier)}
                </div>

                <div className="user-divider"></div>

                <div className="user-account">
                    <p className="account-balance">{userData.balance}</p>
                    <p className="account-details">
                        {userData.accountNumber}/{userData.bank}
                    </p>
                </div>
            </div>

            <div className="user-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? "tab-button--active" : ""}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};