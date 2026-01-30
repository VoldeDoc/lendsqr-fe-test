import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/resetPwd.scss";
import { authApi } from "../../../services/api";

const forgotPasswordSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
});

interface ForgotPasswordFormData {
    email: string;
}

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setError(null);
            await authApi.forgotPassword(data.email);
            setSuccess(true);
        } catch (err: any) {
            console.error("Forgot password error:", err);
            setError(err.message || "Failed to send reset link. Please try again.");
        }
    };

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-logo">
                        {/* <img src={logo} alt="Lendsqr Logo" /> */}
                    </div>
                    
                </div>

                <div className="auth-right">
                    <div className="auth-form-container">
                        <div className="success-message">
                            <div className="success-icon">✓</div>
                            <h1>Check Your Email</h1>
                            <p>
                                We've sent a password reset link to your email address.
                                Please check your inbox and follow the instructions.
                            </p>
                            <button
                                className="auth-submit-btn"
                                onClick={() => navigate("/login")}
                            >
                                Back to Login
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
                    {/* <img src={logo} alt="Lendsqr Logo" /> */}
                </div>
                <div className="auth-illustration">
                    
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-form-container">
                    <h1 className="auth-title">Forgot Password?</h1>
                    <p className="auth-subtitle">
                        Enter your email address and we'll send you a link to reset your
                        password.
                    </p>

                    {error && (
                        <div className="auth-error-banner">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                className={errors.email ? "input-error" : ""}
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <p className="error-message">{errors.email.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
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