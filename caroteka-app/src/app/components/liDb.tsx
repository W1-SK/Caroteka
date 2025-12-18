import '../../index.css'

interface LiProps {
    text: string
}

function liDb(props: LiProps) {
    return(
        <li className="font-action bg-slate-50 text-action-h6 rounded-md flex justify-center items-center py-4">X {props.text}</li>
    )
}

export default liDb