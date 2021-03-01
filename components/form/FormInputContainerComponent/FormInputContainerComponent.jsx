import styles from './FormInputContainerComponent.module.scss'



const FormInputContainerComponent = ({children}) => {
    return <div className={styles.formInputContainerComponent}>{children}</div>
}


export default FormInputContainerComponent