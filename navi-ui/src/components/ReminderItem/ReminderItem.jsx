import './ReminderItem.css'


const ReminderItem = ({ reminder, deleteReminder }) => {
    return (
        <li className='reminder-item'>
            <span className='reminder-content'>{reminder.name}</span>
            <button
                className='delete-button'
                type="button"
                onClick={() => deleteReminder(reminder.id)}>
                Remover
            </button>
        </li>
    )
}

export default ReminderItem