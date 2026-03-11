import './ErrorMessage.css'

const ErrorMessage = ({message}) => {
    if (!message) return null

    return (
        <div className="error-message">
            <span className='icon'>🛈</span>
            {message}
        </div>

    )
}

export default ErrorMessage;