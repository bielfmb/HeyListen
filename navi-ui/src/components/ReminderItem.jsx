const ReminderItem = ({ reminder, deleteReminder }) => {
    return (
        <li>
            <span>{reminder.name}</span>
            <button
                type="button"
                onClick={() => deleteReminder(reminder.id)}>
                Remover
            </button>
        </li>
    )
}

export default ReminderItem