import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ProfileFormFields } from '../../../../types';

interface BasicInformationProps {
    register: UseFormRegister<ProfileFormFields>;
    errors: FieldErrors<ProfileFormFields>;
    isEditing: boolean;
    saving: boolean;
}

export const BasicInformation = ({
    register,
    errors,
    isEditing,
    saving,
}: BasicInformationProps) => {
    return (
        <div className="profile-section">
            <h2 className="section-title">Basic Information</h2>
            <div className="info-grid">
                <div className="info-item">
                    <label>Full Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        disabled={!isEditing || saving}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>
                <div className="info-item">
                    <label>Username</label>
                    <input
                        type="text"
                        {...register('username')}
                        disabled={!isEditing || saving}
                    />
                    {errors.username && <p className="error">{errors.username.message}</p>}
                </div>
                <div className="info-item">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        disabled={!isEditing || saving}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="info-item">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        {...register('phoneNumber')}
                        disabled={!isEditing || saving}
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
                </div>
                <div className="info-item">
                    <label>Organization</label>
                    <input
                        type="text"
                        {...register('organization')}
                        disabled={!isEditing || saving}
                    />
                    {errors.organization && <p className="error">{errors.organization.message}</p>}
                </div>
            </div>
        </div>
    );
};