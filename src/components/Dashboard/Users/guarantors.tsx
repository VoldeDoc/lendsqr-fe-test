import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { AuthLayout } from "../../../components/Layout/layout";
import { userApi } from "../../../services/api";
import type { UserDetails } from "../../../types";
import Loading from "../../../utils/loading";
import "../../../styles/guarantors.scss";

interface Guarantor {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
}

export default function GuarantorsPage() {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const [guarantors, setGuarantors] = useState<Guarantor[]>([]);
    const [userName, setUserName] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            fetchGuarantors();
        }
    }, [userId]);

    const fetchGuarantors = async () => {
        try {
            setLoading(true);
            setError(null);

            const user: UserDetails = await userApi.getUserById(userId!);

            if (!user) {
                setError("User not found");
                return;
            }

            setUserName(user.name || user.personalInfo?.fullName || "User");
            setGuarantors(user.guarantors || []);
        } catch (error: any) {
            console.error("Failed to fetch guarantors:", error);
            setError(error.message || "Failed to load guarantors");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AuthLayout>
                <Loading message="Loading guarantors..." />
            </AuthLayout>
        );
    }

    if (error) {
        return (
            <AuthLayout>
                <div className="guarantors-page">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <BsArrowLeft />
                        <span>Back</span>
                    </button>
                    <div className="error-message">
                        <h2>Error</h2>
                        <p>{error}</p>
                        <button onClick={fetchGuarantors} className="retry-button">
                            Retry
                        </button>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="guarantors-page">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <BsArrowLeft />
                    <span>Back to Profile</span>
                </button>

                <h1 className="page-title">Guarantors for {userName}</h1>

                {guarantors.length === 0 ? (
                    <div className="no-guarantors">
                        <p>No guarantors found for this user.</p>
                    </div>
                ) : (
                    <div className="guarantors-grid">
                        {guarantors.map((guarantor, index) => (
                            <div key={index} className="guarantor-card">
                                <div className="guarantor-header">
                                    <div className="guarantor-avatar">
                                        {guarantor.fullName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="guarantor-info">
                                        <h3>{guarantor.fullName}</h3>
                                        <span className="relationship-badge">
                                            {guarantor.relationship}
                                        </span>
                                    </div>
                                </div>
                                <div className="guarantor-details">
                                    <div className="detail-item">
                                        <label>Phone Number</label>
                                        <p>{guarantor.phoneNumber}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Email Address</label>
                                        <p>{guarantor.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}