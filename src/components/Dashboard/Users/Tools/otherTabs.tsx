interface EmptyTabProps {
    message: string;
}

export const EmptyTab = ({ message }: EmptyTabProps) => {
    return (
        <div className="user-details-content">
            <div className="details-section">
                <p className="empty-state">{message}</p>
            </div>
        </div>
    );
};