import { Link } from "react-router-dom";
import "../../styles/card.scss";
import type { StatsCardProps } from "../../types";



export const StatsCard = ({
  icon,
  title,
  value,
  iconColor = "#213f7d",
  iconBgColor = "rgba(223, 24, 255, 0.1)",
  link,
  onClick,
}: StatsCardProps) => {
  const cardContent = (
    <>
      <div
        className="card-icon"
        style={{
          backgroundColor: iconBgColor,
          color: iconColor,
        }}
      >
        {icon}
      </div>
      <p className="card-title">{title}</p>
      <h3 className="card-value">{value}</h3>
    </>
  );

  if (link) {
    return (
      <Link to={link} className="stats-card" onClick={onClick}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="stats-card" onClick={onClick}>
      {cardContent}
    </div>
  );
};