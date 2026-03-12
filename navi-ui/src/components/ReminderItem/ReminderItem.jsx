import styles from './ReminderItem.module.css'


const ReminderItem = ({ reminder, deleteReminder }) => {
    return (
        <li className={styles.reminderItem}>
            <span className={styles.reminderContent}>{reminder.name}</span>
            <button
                className={styles.deleteButton}
                type="button"
                onClick={() => deleteReminder(reminder.id)}>
                Remover
            </button>
        </li>
    )
}

export default ReminderItem