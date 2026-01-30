import {  educationFields, guarantorFields, personalInfoFields,socialFields, } from "../../../../constant/data";
import type { UserDetails } from "../../../../types";
import { DetailSection } from "./detailSection";


interface GeneralDetailsTabProps {
    userData: UserDetails;
}

export const GeneralDetailsTab = ({ userData }: GeneralDetailsTabProps) => {
    return (
        <div className="user-details-content">
            {/* Personal Information */}
            <DetailSection
                title="Personal Information"
                data={userData.personalInfo}
                fields={personalInfoFields}
                gridClass="details-grid--five"
            />

            <div className="section-divider"></div>

            {/* Education and Employment */}
            <DetailSection
                title="Education and Employment"
                data={userData.education}
                fields={educationFields}
            />

            <div className="section-divider"></div>

            {/* Socials */}
            <DetailSection
                title="Socials"
                data={userData.socials}
                fields={socialFields}
            />

            <div className="section-divider"></div>

            {/* Guarantors */}
            {userData.guarantors.map((guarantor, index) => (
                <div key={index}>
                    <DetailSection
                        title="Guarantor"
                        data={guarantor}
                        fields={guarantorFields}
                    />
                    {index < userData.guarantors.length - 1 && <div className="section-divider"></div>}
                </div>
            ))}
        </div>
    );
};