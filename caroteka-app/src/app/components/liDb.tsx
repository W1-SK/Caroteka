import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface LiProps {
  text: string;
  icon: LucideIcon;
  to: string;
}

function liDb(props: LiProps) {
  const Icon = props.icon;

  return (
    <Link to={props.to}>
      <li className="flex justify-center items-center gap-2 py-4 font-action text-h5 bg-slate-50 rounded-md hover:cursor-pointer hover:text-slate-500 hover:bg-slate-100">
        <Icon className="w-8 h-8" />
        {props.text}
      </li>
    </Link>
  );
}

export default liDb;
