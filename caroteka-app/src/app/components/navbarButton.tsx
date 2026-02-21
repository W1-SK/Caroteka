import { Link } from "react-router";

interface ButtonProps {
  text: string;
  isActive?: boolean;
  to: string;
}
function NavbarButton(props: ButtonProps) {
  return (
    <Link
      to={props.to}
      className={`bg-slate-50 font-action border border-slate-900/20 rounded-b-lg px-3 -mt-px ${
        props.isActive ? "border-t-slate-50" : ""
      }`}
    >
      {props.text}
    </Link>
  );
}

export default NavbarButton;
