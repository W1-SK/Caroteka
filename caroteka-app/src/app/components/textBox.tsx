import "../../index.css";

interface TextBoxProps {
  heading: string;
  text: string;
  color: "primary" | "secondary" | "tertiary";
  side: "left" | "right";
}

const colorClasses = {
  primary: "bg-violet-300/40",
  secondary: "bg-emerald-500/20",
  tertiary: "bg-teal-400/20",
};

const leftOrRight = {
  left: "self-start",
  right: "self-end",
};

function TextBox(props: TextBoxProps) {
  const className = `${colorClasses[props.color]} w-120 p-4 rounded-2xl ${
    leftOrRight[props.side]
  }`;

  return (
    <section className="w-full flex flex-col">
      <div className={className}>
        <h2 className="text-h2 font-title">{props.heading}</h2>
        <p>{props.text}</p>
      </div>
    </section>
  );
}

export default TextBox;
