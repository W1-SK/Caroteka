interface FormInputProps {
  label: string;
  color: "primary" | "secondary";
  type: string;
  name: string;
}

const colorClasses = {
  primary:
    "border-primary-300 hover:bg-primary-100/50 focus:bg-primary-200/50 focus:border-3",
  secondary:
    "border-secondary-300 hover:bg-secondary-100/50 focus:bg-secondary-200/50 focus:border-3",
};

function FormInput(props: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="font-title text-h6">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        required
        className={`h-12 outline-none border-2 px-3 text-m rounded-lg ${colorClasses[props.color]}`}
      />
    </div>
  );
}

export default FormInput;
