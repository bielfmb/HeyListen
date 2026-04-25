import ReminderItem from '../ReminderItem/ReminderItem.jsx'
import styles from './ReminderList.module.css'


const ReminderList = ({ reminders, deleteReminder }) => {
    if (reminders.length === 0) return null;

    const sortedReminders = [...reminders].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )
    let lastDate = null;

    return (
        <section className={styles.cardList}>
            <h2>Lembretes</h2>

            <article className={styles.listContainer}>

                {sortedReminders.map(reminder => {
                    {/* The date is shown only if there are no reminders set 
                        for that date yet */}
                    const showDate = reminder.date !== lastDate
                    lastDate = reminder.date

                    return (
                        <div key={reminder.id}>
                            {showDate &&
                                <h3>
                                    {new Date(reminder.date + 'T00:00:00')
                                        .toLocaleDateString('pt-BR')}
                                </h3>}
                            <ul className={styles.remindersList}>
                                <ReminderItem
                                    reminder={reminder}
                                    deleteReminder={deleteReminder}
                                />
                            </ul>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default ReminderList