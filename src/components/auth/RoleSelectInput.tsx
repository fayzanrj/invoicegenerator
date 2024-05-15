import { Controller } from "react-hook-form";
import AuthInputLabel from "./AuthInputLabel";

// Props
interface RoleSelectInputProps {
  control: any;
  errors: any;
  disabled: boolean;
}

const RoleSelectInput: React.FC<RoleSelectInputProps> = ({
  control,
  errors,
  disabled,
}) => {
  return (
    <div className="w-full md:max-w-96">
      {/* Label */}
      <AuthInputLabel id={"role"} label={"Role"} errors={errors} />

      <br />
      <Controller
        name={"role"}
        control={control}
        defaultValue={"editor"}
        render={({ field }) => (
          <select
            id={"role"}
            {...field}
            disabled={disabled}
            className="w-full p-2 border-2 border-gray-300 my-1 outline-none rounded-md disabled:opacity-50"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        )}
      />
    </div>
  );
};
export default RoleSelectInput;
