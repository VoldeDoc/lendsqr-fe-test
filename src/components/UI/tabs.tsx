import { useLocalStorage } from "../../hooks/useLocalStorage";
import  '../../styles/userDetails.scss'
interface Tab {
    id: string;
    label: string;
}

interface UserTabsProps {
    tabs: Tab[];
    userId: string;
}

export const UserTabs = ({ tabs, userId }: UserTabsProps) => {
    const storageKey = `user-details-tab-${userId}`;
    const [activeTab, setActiveTab] = useLocalStorage(storageKey, tabs[0].id);

    return (
        <div className="user-tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? "tab-button--active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export const useUserTab = (userId: string, defaultTab: string = "general") => {
    const storageKey = `user-details-tab-${userId}`;
    const [activeTab, setActiveTab] = useLocalStorage(storageKey, defaultTab);

    return { activeTab, setActiveTab };
};