import '../../index.css'
import { Link } from 'react-router'

interface ButtonProps {
    text: string
    color: 'primary' | 'secondary' | 'danger' | 'success'
    to?: string
}

const colorClasses = {
    primary: 'bg-primary-light-2',
    secondary: 'bg-secondary',
    danger: 'bg-danger',
    success: 'bg-success',
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