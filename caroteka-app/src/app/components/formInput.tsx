import "../../index.css";

interface FormInputProps {
  label: string;
  color: "primary" | "secondary";
  type: string;
  name: string;
}

const colorClasses = {
  primary: "border-violet-300/80 hover:bg-violet-300/20 focus:bg-violet-300/30",
  secondary:
    "border-emerald-300/70 hover:bg-emerald-300/10 focus:bg-emerald-300/30",
};

function FormInput(props: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="text-text-m font-title">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        required
        className={`h-12 outline-none border-2 p-2 text-text-l rounded-lg ${colorClasses[props.color]}`}
      />
    </div>
  );
}

export default FormInput;
