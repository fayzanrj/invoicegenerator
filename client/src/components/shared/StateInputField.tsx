import React from "react";

// Base props
interface StateFieldBaseProps {
  label: string;
  srOnly?: boolean;
  id: string;
  value: string;
  placeholder: string;
  required?: boolean;
  className?: string;
}

// Prps for read only input field
interface StateFieldReadOnlyProps extends StateFieldBaseProps {
  readOnly?: boolean;
}

// Props for changeable input field
interface StateFieldChangeProps extends StateFieldBaseProps {
  onChange: (text: string) => void;
}

// Props
type StateInputFieldProps = StateFieldReadOnlyProps | StateFieldChangeProps;

const StateInputField: React.FC<StateInputFieldProps> = ({
  label,
  id,
  placeholder,
  value,
  srOnly = false,
  required = false,
  className = "",
  ...props
}) => {
  // Extracting props
  const onChange = (props as StateFieldChangeProps).onChange;
  const readOnly = (props as StateFieldReadOnlyProps).readOnly || false;

  return (
    <div className={className}>
      {/* LABEL */}
      <label
        htmlFor={id}
        className={`text-sm font-semibold float-right ${
          srOnly ? "sr-only" : ""
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        type={"text"}
        required={required}
        className="w-full p-2 border-2 border-gray-300 mb-1 mt-3 outline-none rounded-md disabled:opacity-50 text-right"
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default StateInputField;
