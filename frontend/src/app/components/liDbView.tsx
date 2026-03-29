interface LiProps {
  text: string;
  title: string;
}

function liDbView(props: LiProps) {
  return (
    <li className="flex flex-row gap-2">
      <h3 className="font-semibold">{props.title}:</h3>
      <p>{props.text}</p>
    </li>
  );
}

export default liDbView;
