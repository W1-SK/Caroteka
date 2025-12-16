import '../../index.css'

interface ButtonProps {
    text: string
    color: 'primary' | 'secondary' | 'danger' | 'success'
}

const colorClasses = {
    primary: 'bg-primary-light-2',
    secondary: 'bg-secondary',
    danger: 'bg-danger',
    success: 'bg-success',
}

function Button(props: ButtonProps){
    return(
        <>
            <button className={`${colorClasses[props.color]} font-action text-button-m rounded-full py-2 px-4`}>
                {props.text}
            </button>
        </>
    )
}

export default Button