import styles from './ErrorMessage.module.css'

const ErrorMessage = ({message}) => {
    if (!message) return null

    return (
        <div className={styles.errorMessage}>
            <span className={styles.icon}>🛈</span>
            {message}
        </div>

    )
}

export default ErrorMessage;