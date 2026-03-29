interface tabButtonProps {
  text: string;
  isActive?: boolean;
  color: "primary" | "secondary" | "tertiary";
}

const colorClasses = {
  primary: "bg-primary-500 hover:bg-primary-700 focus:bg-primary-700",
  secondary: "bg-secondary-500 hover:bg-secondary-600 focus:bg-secondary-600",
  tertiary: "bg-tertiary-500 hover:bg-tertiary-600 focus:bg-tertiary-600",
};

function TabButton(props: tabButtonProps) {
  return (
    <button
      className={`${props.color} bg-slate-50 font-action border border-slate-900/20 rounded-t-lg ${
        props.isActive ? "border-b-slate-50" : ""
      }`}
    >
      {props.text}
    </button>
  );
}

export default TabButton;
