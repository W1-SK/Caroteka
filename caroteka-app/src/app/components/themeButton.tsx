import '../../index.css'

interface ButtonProps {
    icon: React.ReactNode   // místo stringu
    color: 'light' | 'dark'
}

const colorClasses = {
    light: 'bg-light',
    dark: 'bg-dark',
}

function ThemeButton(props: ButtonProps) {
    return (
        <button className={`${colorClasses[props.color]} font-action text-button-m rounded-full size-8 flex items-center justify-center`}>
            {props.icon}
        </button>
    )
}

export default ThemeButton
