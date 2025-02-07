interface SelectFieldProps {
  label: string;
  id: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  options,
  value,
  onChange,
}) => (
  <div className="flex flex-col w-full sm:w-[30rem]  lg:w-[30rem] md:w-[30rem] xl:w-[30rem]">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="bg-[#e5e7eb] text-gray-400 p-2 rounded-md w-full"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
export default SelectField;
