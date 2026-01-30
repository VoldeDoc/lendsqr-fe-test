import { useState } from "react";
import "../../../../styles/table.scss";

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: any) => Promise<void>;
    organizations: string[];
}

export const AddUserModal = ({
    isOpen,
    onClose,
    onSubmit,
    organizations,
}: AddUserModalProps) => {
    const [formData, setFormData] = useState({
        organization: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "Pending" as "Active" | "Pending" | "Inactive" | "Blacklisted",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const newUser = {
                id: Date.now().toString(),
                name: `${formData.firstName} ${formData.lastName}`,
                username: formData.email.split("@")[0],
                email: formData.email,
                password: "defaultPassword123",
                organization: formData.organization,
                phoneNumber: formData.phone,
                dateJoined: new Date().toISOString(),
                status: formData.status,
                image: "",
                uniqueId: `LSQ${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                tier: 1,
                balance: "₦0.00",
                accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
                bank: "Providus Bank",
                hasLoan: false,
                hasSavings: false,
                personalInfo: {
                    fullName: `${formData.firstName} ${formData.lastName}`,
                    phoneNumber: formData.phone,
                    email: formData.email,
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
                    officeEmail: formData.email,
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

            await onSubmit(newUser);

            // Reset form
            setFormData({
                organization: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                status: "Pending",
            });
            onClose();
        } catch (error) {
            console.error("Failed to add user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New User</h2>
                    <button className="modal-close" onClick={onClose} type="button">
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Organization *</label>
                        <select
                            value={formData.organization}
                            onChange={(e) =>
                                setFormData({ ...formData, organization: e.target.value })
                            }
                            required
                            disabled={isSubmitting}
                        >
                            <option value="">Select organization</option>
                            {organizations.length > 0 ? (
                                organizations.map((org) => (
                                    <option key={org} value={org}>
                                        {org}
                                    </option>
                                ))
                            ) : (
                                <option value="Lendsqr">Lendsqr</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>First Name *</label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({ ...formData, firstName: e.target.value })
                            }
                            required
                            placeholder="Enter first name"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name *</label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({ ...formData, lastName: e.target.value })
                            }
                            required
                            placeholder="Enter last name"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                            placeholder="Enter email address"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            required
                            placeholder="Enter phone number"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value as any,
                                })
                            }
                            disabled={isSubmitting}
                        >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Blacklisted">Blacklisted</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Adding..." : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};