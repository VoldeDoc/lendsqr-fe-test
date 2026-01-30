import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import type { LoginDataValues } from '../../types';
import { loginSchema } from '../../validation/validationSchema';
import { useToggle } from '../../hooks/useToggle';
import { useAuth } from '../../hooks/useAuth';
import Button from '../UI/button';

export default function LoginForm() {
    const [showPassword, togglePasswordVisibility] = useToggle(false);
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    
    const { register, handleSubmit, formState: { errors } } = useForm<LoginDataValues>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginDataValues) => {
        try {
            await login(data.email, data.password);
            navigate('/dashboard/users');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className="form-section">
            <h1>Welcome!</h1>
            <p className="loginText">Enter details to login</p>


            <form className="form" onSubmit={handleSubmit(onSubmit)}>
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

                <a href="/auth/forgot-password" className="forgotPassword">Forgot Password?</a>

                <Button
                    type="submit"
                    text="Login"
                    className="button"
                    isLoading={loading}
                    disabled={loading}
                />

                <p className="switchText">
                    Don't have an account?{' '}
                    <a href="/signup" className="switchLink">
                        Sign up here
                    </a>
                </p>
            </form>
        </div>
    );
}