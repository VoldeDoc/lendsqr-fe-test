import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ProfileFormFields } from '../../../../types';

interface PersonalInformationProps {
    register: UseFormRegister<ProfileFormFields>;
    errors: FieldErrors<ProfileFormFields>;
    isEditing: boolean;
    saving: boolean;
}

export const PersonalInformation = ({
    register,
    isEditing,
    saving,
}: PersonalInformationProps) => {
    return (
        <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="info-grid">
                <div className="info-item">
                    <label>Full Name</label>
                    <input
                        type="text"
                        {...register('personalInfo.fullName')}
                        disabled={!isEditing || saving}
                    />
                </div>
                <div className="info-item">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        {...register('personalInfo.phoneNumber')}
                        disabled={!isEditing || saving}
                    />
                </div>
                <div className="info-item">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('personalInfo.email')}
                        disabled={!isEditing || saving}
                    />
                </div>
                <div className="info-item">
                    <label>BVN</label>
                    <input
                        type="text"
                        {...register('personalInfo.bvn')}
                        disabled={!isEditing || saving}
                    />
                </div>
                <div className="info-item">
                    <label>Gender</label>
                    <select
                        {...register('personalInfo.gender')}
                        disabled={!isEditing || saving}
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="info-item">
                    <label>Marital Status</label>
                    <select
                        {...register('personalInfo.maritalStatus')}
                        disabled={!isEditing || saving}
                    >
                        <option value="">Select status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>
                <div className="info-item">
                    <label>Children</label>
                    <input
                        type="text"
                        {...register('personalInfo.children')}
                        disabled={!isEditing || saving}
                    />
                </div>
                <div className="info-item">
                    <label>Type of Residence</label>
                    <input
                        type="text"
                        {...register('personalInfo.typeOfResidence')}
                        disabled={!isEditing || saving}
                    />
                </div>
            </div>
        </div>
    );
};