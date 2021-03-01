
import styles from './InputComponent.module.scss'
const InputComponent = (props) => {
    return <input value={props.value} onChange={props.onChange} className={styles.inputComponent} placeholder={props.placeholder}/>
    
}

export default InputComponent