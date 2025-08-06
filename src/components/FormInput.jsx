const FormInput = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-3 sm:mb-4">
      <label className="block text-sm font-medium mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-50 text-white ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormInput; 