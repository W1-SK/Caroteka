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
      className={`font-action border border-slate-900/20 rounded-full lg:rounded-none lg:rounded-b-lg px-3 -mt-px hover:bg-tertiary-100 lg:hover:bg-slate-50 lg:bg-transparent ${
        props.isActive
          ? "lg:border-t-slate-50 bg-secondary-100 lg:bg-slate-50"
          : "lg:border-t-0"
      }`}
    >
      {props.text}
    </Link>
  );
}

export default NavbarButton;
