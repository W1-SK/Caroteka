import '../../index.css'
import { Link } from 'react-router'

interface ButtonProps {
    text: string
    color: 'primary' | 'secondary' | 'danger' | 'success'
    to?: string
}

const colorClasses = {
    primary: 'bg-violet-400',
    secondary: 'bg-emerald-400',
    danger: 'bg-rose-600',
    success: 'bg-green-500',
}

function Button(props: ButtonProps){
    const className = `${colorClasses[props.color]} font-action text-button-m rounded-full py-1 px-3 inline-block`;

    if (props.to) {
        return (
            <Link to={props.to} className={className}>
                {props.text}
            </Link>
        )
    }

    return (
        <button className={className}>
            {props.text}
        </button>
    )
}

export default Button