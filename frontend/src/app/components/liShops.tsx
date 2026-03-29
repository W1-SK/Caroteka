import "../../index.css";
import { Link } from "react-router-dom";

interface liShopsProps {
  text: string;
  color: "primary" | "secondary" | "tertiary";
}

const colorClasses = {
  primary: "border-primary-200/95",
  secondary: "border-secondary-200/95",
  tertiary: "border-tertiary-200/95",
};

function liShops(props: liShopsProps) {
  const className = `rounded-md min-h-28 flex justify-center items-center ${colorClasses[props.color]} border-4 font-action text-h5`;

  return <li className={className}>{props.text}</li>;
}

export default liShops;
