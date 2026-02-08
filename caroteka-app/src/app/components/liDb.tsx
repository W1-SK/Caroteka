interface LiProps {
  text: string;
}

function liDb(props: LiProps) {
  return (
    <li className="flex justify-center items-center py-4 font-action text-h5 bg-slate-50 rounded-md">
      X {props.text}
    </li>
  );
}

export default liDb;
