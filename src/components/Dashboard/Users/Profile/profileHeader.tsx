import { BsPencil, BsCheck, BsX } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

interface ProfileHeaderProps {
    formData: {
        name: string;
        email: string;
        image: string;
    };
    userData: any;
    isEditing: boolean;
    saving: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
    onSaveClick: () => void;
}

export const ProfileHeader = ({
    formData,
    userData,
    isEditing,
    saving,
    onEditClick,
    onCancelClick,
    onSaveClick,
}: ProfileHeaderProps) => {
    return (
        <div className="profile-header">
            <div className="profile-header-left">
                <div className="profile-avatar">
                        <div className="avatar-placeholder">
                            <FaRegUserCircle size={48} />
                        </div>
                </div>
                <div className="profile-header-info">
                    <h1 className="profile-name">{formData.name || "User"}</h1>
                    <p className="profile-email">{formData.email}</p>
                    <span className="profile-status">
                        {userData?.status }
                    </span>
                </div>
            </div>
            <div className="profile-header-actions">
                {!isEditing ? (
                    <button className="btn-edit" onClick={onEditClick}>
                        <BsPencil />
                        Edit Profile
                    </button>
                ) : (
                    <div className="edit-actions">
                        <button
                            className="btn-cancel-edit"
                            onClick={onCancelClick}
                            disabled={saving}
                        >
                            <BsX />
                            Cancel
                        </button>
                        <button
                            className="btn-save-edit"
                            onClick={onSaveClick}
                            disabled={saving}
                        >
                            <BsCheck />
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};