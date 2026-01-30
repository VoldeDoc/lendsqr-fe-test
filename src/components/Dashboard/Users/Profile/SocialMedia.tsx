import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ProfileFormFields } from '../../../../types';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

interface SocialMediaProps {
    register: UseFormRegister<ProfileFormFields>;
    errors: FieldErrors<ProfileFormFields>;
    isEditing: boolean;
    saving: boolean;
}

export const SocialMedia = ({
    register,
    errors,
    isEditing,
    saving,
}: SocialMediaProps) => {
    return (
        <div className="profile-section">
            <h2 className="section-title">Social Media</h2>
            <div className="info-grid">
                <div className="info-item">
                    <label>
                        <FaTwitter style={{ marginRight: '8px', color: '#1DA1F2' }} />
                        Twitter
                    </label>
                    <input
                        type="text"
                        {...register('socials.twitter')}
                        placeholder="https://twitter.com/username"
                        disabled={!isEditing || saving}
                    />
                    {errors.socials?.twitter && (
                        <p className="error">{errors.socials.twitter.message}</p>
                    )}
                </div>
                <div className="info-item">
                    <label>
                        <FaFacebook style={{ marginRight: '8px', color: '#4267B2' }} />
                        Facebook
                    </label>
                    <input
                        type="text"
                        {...register('socials.facebook')}
                        placeholder="https://facebook.com/username"
                        disabled={!isEditing || saving}
                    />
                    {errors.socials?.facebook && (
                        <p className="error">{errors.socials.facebook.message}</p>
                    )}
                </div>
                <div className="info-item">
                    <label>
                        <FaInstagram style={{ marginRight: '8px', color: '#E1306C' }} />
                        Instagram
                    </label>
                    <input
                        type="text"
                        {...register('socials.instagram')}
                        placeholder="https://instagram.com/username"
                        disabled={!isEditing || saving}
                    />
                    {errors.socials?.instagram && (
                        <p className="error">{errors.socials.instagram.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
};