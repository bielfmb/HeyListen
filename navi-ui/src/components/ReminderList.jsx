import ReminderItem from './ReminderItem.jsx'


const ReminderList = ({ reminders, deleteReminder }) => {
    const sortedReminders = [...reminders].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )
    let lastDate = null;

    return (
        <section className='card'>
            <h2>Lembretes</h2>

            <article>
                {sortedReminders.map(reminder => {
                    const showDate = reminder.date !== lastDate
                    lastDate = reminder.date

                    return (
                        <div key={reminder.id}>
                            {showDate &&
                                <h3>
                                    {new Date(reminder.date + 'T00:00:00')
                                        .toLocaleDateString('pt-BR')}
                                </h3>}
                            <ul>
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