import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import type { SignupDataValues } from '../../types';
import { signupSchema } from '../../validation/validationSchema';
import { useToggle } from '../../hooks/useToggle';
import { useAuth } from '../../hooks/useAuth';
import Button from '../UI/button';

export default function SignupForm() {
    const [showPassword, togglePasswordVisibility] = useToggle(false);
    const [showConfirmPassword, toggleConfirmPasswordVisibility] = useToggle(false);
    const navigate = useNavigate();
    const { signup, loading } = useAuth();
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignupDataValues>({
        resolver: yupResolver(signupSchema),
    });

    const onSubmit = async (data: SignupDataValues) => {
        try {
            await signup({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
            });
            navigate('/dashboard/users');
        } catch (err) {
            console.error('Signup error:', err);
        }
    };

    return (
        <div className="form-section">
            <h1>Join Us!</h1>
            <p className="loginText">Create your account to get started</p>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="inputGroup">
                    <input
                        type="text"
                        id="fullName"
                        {...register('fullName')}
                        className="input"
                        placeholder="Full Name"
                    />
                    {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                </div>

                <div className="inputGroup">
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="inputGroup">
                    <div className="passwordContainer">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            {...register('password')}
                            className="passwordInput"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            className="togglePassword"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>

                <div className="inputGroup">
                    <div className="passwordContainer">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            {...register('confirmPassword')}
                            className="passwordInput"
                            placeholder="Confirm Password"
                        />
                        <button
                            type="button"
                            className="togglePassword"
                            onClick={toggleConfirmPasswordVisibility}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                </div>

                <Button
                    type="submit"
                    text="Sign Up"
                    className="button"
                    isLoading={loading}
                    disabled={loading}
                />

                <p className="switchText">
                    Already have an account?{' '}
                    <a href="/login" className="switchLink">
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
}