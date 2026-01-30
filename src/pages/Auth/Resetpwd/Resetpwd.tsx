import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { logo } from "../../../../public";
import { useAuth } from "../../../hooks/useAuth";
import "../../../styles/resetPwd.scss";

const resetPasswordSchema = yup.object({
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain uppercase, lowercase, and number"
        )
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { resetPassword } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            return;
        }

        try {
            await resetPassword(token, data.password);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            // Error handled by useAuth hook
        }
    };

    if (!token) {
        return (
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-logo">
                        <img src={logo} alt="Lendsqr Logo" />
                    </div>
                    <div className="auth-illustration">
                        <img src={logo} alt="Error" />
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-form-container">
                        <div className="error-state">
                            <div className="error-icon">✕</div>
                            <h1>Invalid Reset Link</h1>
                            <p>
                                This password reset link is invalid or has expired.
                                Please request a new one.
                            </p>
                            <button
                                className="auth-submit-btn"
                                onClick={() => navigate("/auth/forgot-password")}
                            >
                                Request New Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-logo">
                    <img src={logo} alt="Lendsqr Logo" />
                </div>
                <div className="auth-illustration">
                    <img src={logo} alt="Reset Password" />
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-form-container">
                    <h1 className="auth-title">Reset Password</h1>
                    <p className="auth-subtitle">
                        Enter your new password below. Make sure it's strong and secure.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                        <div className="form-group">
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    {...register("password")}
                                    className={errors.password ? "input-error" : ""}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? "HIDE" : "SHOW"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="error-message">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword")}
                                    className={errors.confirmPassword ? "input-error" : ""}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? "HIDE" : "SHOW"}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="error-message">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="password-requirements">
                            <p>Password must contain:</p>
                            <ul>
                                <li>At least 8 characters</li>
                                <li>One uppercase letter</li>
                                <li>One lowercase letter</li>
                                <li>One number</li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Resetting..." : "Reset Password"}
                        </button>

                        <div className="auth-footer">
                            <button
                                type="button"
                                className="auth-link-btn"
                                onClick={() => navigate("/login")}
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}