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
      className={`bg-slate-50 font-action border-b border-l border-r border-slate-900/20 rounded-b-lg px-3 ${props.isActive ? "shadow-[0_-2px_0_-1px_theme(colors.slate-50)]" : ""}`}
    >
      {props.text}
    </Link>
  );
}

export default NavbarButton;
