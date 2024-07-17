import React from "react";

interface AuthInputLabelProps {
  label: string;
  errors: any;
  id: string;
}
const AuthInputLabel: React.FC<AuthInputLabelProps> = ({
  errors,
  id,
  label,
}) => {
  return (
    <label htmlFor={id} className="text-sm font-semibold">
      {label} {/* Error message */}
      {errors[id]?.message && (
        <span className="text-xs text-red-700">({errors[id].message})</span>
      )}
    </label>
  );
};

export default AuthInputLabel;
