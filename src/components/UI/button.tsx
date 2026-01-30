import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface ButtonProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  icon?: IconType;
  loadingClass?: string;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  link?: string;
  onClick?: () => void;
  div?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  isLoading,
  disabled,
  className,
  children,
  icon: Icon,
  loadingClass = "loading-icon",
  iconPosition = "left",
  iconClassName = "icon",
  link,
  onClick,
  div,
}) => {
  const renderContent = () => (
    <>
      {children && !isLoading && children}

      {!children && !isLoading && (
        <span className="button-content">
          {Icon && (
            <span
              className={`icon-container ${
                iconPosition === "right" ? "icon-right" : "icon-left"
              } ${iconClassName}`}
            >
              <Icon />
            </span>
          )}
          <span>{text}</span>
        </span>
      )}

      {isLoading && (
        <div className="loading-container">
          <svg
            className={`loading-spinner ${loadingClass}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="loading-circle"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="loading-path"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      )}
    </>
  );

  const commonClasses = `button ${
    isLoading ? "button-loading" : ""
  } ${disabled ? "button-disabled" : ""} ${className}`;

  if (link) {
    return (
      <a href={link} className={commonClasses} onClick={onClick}>
        {renderContent()}
      </a>
    );
  }

  if (div) {
    return (
      <div className={commonClasses} onClick={onClick}>
        {renderContent()}
      </div>
    );
  }

  return (
    <button type={type} onClick={onClick} className={commonClasses} disabled={disabled}>
      {renderContent()}
    </button>
  );
};

export default Button;