import { Link } from "react-router";

interface ButtonProps {
  text: string;
  color: "primary" | "secondary" | "tertiary" | "danger" | "success";
  to?: string;
}

const colorClasses = {
  primary: "bg-primary-500 hover:bg-primary-700 focus:bg-primary-700",
  secondary: "bg-secondary-500 hover:bg-secondary-600 focus:bg-secondary-600",
  tertiary: "bg-tertiary-500 hover:bg-tertiary-600 focus:bg-tertiary-600",
  danger: "bg-danger-600 hover:bg-danger-700 focus:bg-danger-700",
  success: "bg-success-500 hover:bg-success-600 focus:bg-success-600",
};

function Button(props: ButtonProps) {
  const className = `${
    colorClasses[props.color]
  } font-action text-button-m rounded-full py-1 px-3 inline-block text-slate-50 cursor-pointer transition-colors`;

  if (props.to) {
    return (
      <Link to={props.to} className={className}>
        {props.text}
      </Link>
    );
  }

  return <button className={className}>{props.text}</button>;
}

export default Button;
