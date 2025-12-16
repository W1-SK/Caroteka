import '../../index.css'

interface ButtonProps {
    text: string
    isActive?: boolean;
}
function navbarButton(props: ButtonProps){
    return(
        <>
            <button className={`--bg-primary font-action border-b border-l border-r border-dark-tr-20 rounded-b-lg px-3 ${props.isActive ? "shadow-[0_-2px_0_-1px_theme(colors.light)]" : ""}`}>{props.text}</button>
        </>
    )
}

export default navbarButton