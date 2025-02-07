interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-1 w-full sm:w-[20rem]  lg:w-[30rem] md:w-[30rem] xl:w-[30rem]">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      className="bg-[#e5e7eb] placeholder:text-gray-400 w-full px-2 py-4 rounded-md"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);
export default InputField;
