import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ProfileFormFields } from '../../../../types';

interface EducationEmploymentProps {
    register: UseFormRegister<ProfileFormFields>;
    errors: FieldErrors<ProfileFormFields>;
    isEditing: boolean;
    saving: boolean;
}

export const EducationEmployment = ({
    register,
    errors,
    isEditing,
    saving,
}: EducationEmploymentProps) => {
    return (
        <div className="profile-section">
            <h2 className="section-title">Education and Employment</h2>
            <div className="info-grid">
                <div className="info-item">
                    <label>Education Level</label>
                    <select
                        {...register('education.level')}
                        disabled={!isEditing || saving}
                    >
                        <option value="">Select level</option>
                        <option value="High School">High School</option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="PhD">PhD</option>
                    </select>
                </div>
                <div className="info-item">
                    <label>Employment Status</label>
                    <select
                        {...register('education.employmentStatus')}
                        disabled={!isEditing || saving}
                    >
                        <option value="">Select status</option>
                        <option value="Employed">Employed</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Student">Student</option>
                    </select>
                </div>
                <div className="info-item">
                    <label>Sector of Employment</label>
                    <input
                        type="text"
                        {...register('education.sector')}
                        disabled={!isEditing || saving}
                    />
                </div>
                <div className="info-item">
                    <label>Duration of Employment</label>
                    <input
                        type="text"
                        {...register('education.duration')}
                        placeholder="e.g., 2 years"
                        disabled={!isEditing || saving}
                    />
                </div>
                <div className="info-item">
                    <label>Office Email</label>
                    <input
                        type="email"
                        {...register('education.officeEmail')}
                        disabled={!isEditing || saving}
                    />
                    {errors.education?.officeEmail && (
                        <p className="error">{errors.education.officeEmail.message}</p>
                    )}
                </div>
                <div className="info-item">
                    <label>Monthly Income</label>
                    <input
                        type="text"
                        {...register('education.monthlyIncome')}
                        placeholder="e.g., ₦200,000"
                        disabled={!isEditing || saving}
                    />
                </div>
                <div className="info-item">
                    <label>Loan Repayment</label>
                    <input
                        type="text"
                        {...register('education.loanRepayment')}
                        placeholder="e.g., ₦50,000"
                        disabled={!isEditing || saving}
                    />
                </div>
            </div>
        </div>
    );
};