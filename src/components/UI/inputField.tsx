import React, { useState } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineInfoCircle, AiOutlineCheck } from "react-icons/ai";
import "../../styles/textInput.module.scss"

interface TextinputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  classLabel?: string;
  className?: string;
  classGroup?: string;
  register?: UseFormRegister<any>;
  name?: string;
  readonly?: boolean;
  value?: string;
  error?: FieldError;
  icon?: string;
  disabled?: boolean;
  id?: string;
  horizontal?: boolean;
  validate?: boolean | string;
  isMask?: boolean;
  msgTooltip?: boolean;
  description?: string;
  hasIcon?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  defaultValue?: string;
  [key: string]: any;
}

const Textinput: React.FC<TextinputProps> = ({
  type = "text",
  label,
  placeholder = "--",
  classLabel = "form-label",
  className = "",
  classGroup = "",
  register,
  name,
  readonly,
  value,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  isMask,
  msgTooltip,
  description,
  hasIcon,
  onChange,
  onFocus,
  defaultValue,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`formGroup ${error ? "has-error" : ""} ${
        horizontal ? "horizontal" : ""
      } ${validate ? "is-valid" : ""}`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`form-label ${horizontal ? "horizontal-label" : ""}`}
        >
          {label}
        </label>
      )}
      <div className={`relative ${horizontal ? "horizontal-input" : ""}`}>
        {name && !isMask && (
          <input
            type={type === "password" && open ? "text" : type}
            {...(register && name ? register(name) : {})}
            placeholder={placeholder}
            className={`form-control ${className} ${error ? "has-error" : ""}`}
            readOnly={readonly}
            disabled={disabled}
            id={id}
            onChange={onChange}
            defaultValue={defaultValue}
            {...rest}
          />
        )}
        {!name && !isMask && (
          <input
            type={type === "password" && open ? "text" : type}
            className={`form-control ${className}`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            id={id}
            {...rest}
          />
        )}
        {/* icon */}
        <div className="icon-container">
          {hasIcon && (
            <span className="icon-toggle" onClick={handleOpen}>
              {open && type === "password" ? (
                <FaEye size={15} />
              ) : (
                <FaEyeSlash size={15} />
              )}
            </span>
          )}
          {error && (
            <span className="icon-error">
              <AiOutlineInfoCircle size={15} />
            </span>
          )}
          {validate && (
            <span className="icon-success">
              <AiOutlineCheck size={15} />
            </span>
          )}
        </div>
      </div>
      {/* error and success message */}
      {error && (
        <div
          className={`input-description ${
            msgTooltip ? "tooltip-error" : "text-error"
          }`}
        >
          {error.message}
        </div>
      )}
      {!error && validate && (
        <div
          className={`input-description ${
            msgTooltip ? "tooltip-success" : "text-success"
          }`}
        >
          {validate}
        </div>
      )}
      {description && <span className="input-description">{description}</span>}
    </div>
  );
};

export default Textinput;