


const Button = (props) => {
    
    return <button type={props.type} className={["Button", props.btnType ? props.btnType: '', props.categoryButton ? props.categoryButton : '', props.tagButton ? props.tagButton:'' ].join(' ')}>{props.children}</button>
}

export default Button