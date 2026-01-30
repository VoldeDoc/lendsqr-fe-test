interface Field {
    key: string;
    label: string;
}

interface DetailSectionProps {
    title: string;
    data: Record<string, any>;
    fields: Field[];
    gridClass?: string;
}

export const DetailSection = ({ title, data, fields, gridClass = "details-grid--four" }: DetailSectionProps) => {
    return (
        <div className="details-section">
            <h3 className="section-title">{title}</h3>
            <div className={`details-grid ${gridClass}`}>
                {fields.map((field) => (
                    <div key={field.key} className="detail-item">
                        <p className="detail-label">{field.label}</p>
                        <p className="detail-value">{data[field.key] || "N/A"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};