import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsArrowLeft } from "react-icons/bs";
import '../../../styles/profile.style.scss'
import type { ProfileFormFields, UserDetails } from "../../../types";
import { authApi, userApi } from "../../../services/api";
import { AuthLayout } from "../../../components/Layout/layout";
import { ProfileHeader } from "../../../components/Dashboard/Users/Profile/profileHeader";
import { PersonalInformation } from "../../../components/Dashboard/Users/Profile/Info";
import { BasicInformation } from "../../../components/Dashboard/Users/Profile/basicINfo";
import { EducationEmployment } from "../../../components/Dashboard/Users/Profile/Education";
import { SocialMedia } from "../../../components/Dashboard/Users/Profile/SocialMedia";
import { profileSchema } from "../../../validation/validationSchema";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<UserDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<ProfileFormFields>({
        resolver: yupResolver(profileSchema) as any,
        defaultValues: {
            name: "",
            username: "",
            email: "",
            phoneNumber: "",
            organization: "",
            image: "",
            personalInfo: {
                fullName: "",
                phoneNumber: "",
                email: "",
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
                officeEmail: "",
                monthlyIncome: "",
                loanRepayment: "",
            },
            socials: {
                twitter: "",
                facebook: "",
                instagram: "",
            },
        }
    });

    const formData = watch();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            const currentUser = authApi.getCurrentUser();

            if (!currentUser || !currentUser.id) {
                navigate("/login");
                return;
            }

            const user: UserDetails = await userApi.getUserById(currentUser.id);

            if (!user) {
                setError("User not found");
                return;
            }

            setUserData(user);
            populateForm(user);
        } catch (error: any) {
            console.error("Failed to fetch profile:", error);
            setError(error.message || "Failed to load profile");

            if (error.message?.includes("Unauthorized") || error.message?.includes("401")) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const populateForm = (user: UserDetails) => {
        reset({
            name: user.personalInfo?.fullName || user.name || "",
            username: user.username || "",
            email: user.email || "",
            organization: user.organization || "",
            image: user.image || "",
            personalInfo: {
                fullName: user.personalInfo?.fullName || user.name || "",
                email: user.personalInfo?.email || user.email || "",
                bvn: user.personalInfo?.bvn || "",
                gender: user.personalInfo?.gender || "",
                maritalStatus: user.personalInfo?.maritalStatus || "",
                children: user.personalInfo?.children || "None",
                typeOfResidence: user.personalInfo?.typeOfResidence || "",
            },
            education: {
                level: user.education?.level || "",
                employmentStatus: user.education?.employmentStatus || "",
                sector: user.education?.sector || "",
                duration: user.education?.duration || "",
                officeEmail: user.education?.officeEmail || user.email || "",
                monthlyIncome: user.education?.monthlyIncome || "",
                loanRepayment: user.education?.loanRepayment || "",
            },
            socials: {
                twitter: user.socials?.twitter || "",
                facebook: user.socials?.facebook || "",
                instagram: user.socials?.instagram || "",
            },
        });
    };

    const onSubmit: SubmitHandler<ProfileFormFields> = async (data) => {
        if (!userData) return;

        setError(null);

        try {
            const updatedUser: UserDetails = {
                ...userData,
                name: data.name,
                username: data.username,
                email: data.email,
                organization: data.organization,
                image: data.image,
                personalInfo: data.personalInfo,
                education: data.education,
                socials: data.socials,
            };

            await userApi.updateUser(userData.id, updatedUser);

            // Update auth data in localStorage
            const authData = JSON.parse(localStorage.getItem("auth") || "{}");
            authData.user = {
                ...authData.user,
                name: data.name,
                username: data.username,
                email: data.email,
            };
            localStorage.setItem("auth", JSON.stringify(authData));

            setUserData(updatedUser);
            setIsEditing(false);
        } catch (error: any) {
            console.error("Failed to update profile:", error);
            setError(error.message || "Failed to update profile");
        }
    };

    const handleCancel = () => {
        if (userData) {
            populateForm(userData);
        }
        setIsEditing(false);
        setError(null);
    };

    if (loading) {
        return (
            <AuthLayout>
                <div className="profile-page">
                    <p>Loading...</p>
                </div>
            </AuthLayout>
        );
    }

    if (error && !userData) {
        return (
            <AuthLayout>
                <div className="profile-page">
                    <button className="back-button" onClick={() => navigate("/dashboard/users")}>
                        <BsArrowLeft />
                        <span>Back to Users</span>
                    </button>
                    <div className="error-message">
                        <h2>Error Loading Profile</h2>
                        <p>{error}</p>
                        <button onClick={fetchUserProfile} className="retry-button">
                            Retry
                        </button>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="profile-page">
                <div className="profile-top-btns">
                    <button className="back-button" onClick={() => navigate("/dashboard/users")}>
                        <BsArrowLeft />
                        <span>Back to Users</span>
                    </button>

                    <button className="guarantor-btn" onClick={() => navigate(`/dashboard/users/${userData?.id}/guarantors`)}>
                      
                        <span>Guarantors page</span>
                    </button>
                </div>

                {error && (
                    <div className="error-banner">
                        {error}
                    </div>
                )}

                <ProfileHeader
                    formData={formData}
                    userData={userData}
                    isEditing={isEditing}
                    saving={isSubmitting}
                    onEditClick={() => setIsEditing(true)}
                    onCancelClick={handleCancel}
                    onSaveClick={handleSubmit(onSubmit)}
                />

                <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
                    <BasicInformation
                        register={register}
                        errors={errors}
                        isEditing={isEditing}
                        saving={isSubmitting}
                    />

                    <PersonalInformation
                        register={register}
                        errors={errors}
                        isEditing={isEditing}
                        saving={isSubmitting}
                    />

                    <EducationEmployment
                        register={register}
                        errors={errors}
                        isEditing={isEditing}
                        saving={isSubmitting}
                    />

                    <SocialMedia
                        register={register}
                        errors={errors}
                        isEditing={isEditing}
                        saving={isSubmitting}
                    />
                </form>
            </div>
        </AuthLayout>
    );
}