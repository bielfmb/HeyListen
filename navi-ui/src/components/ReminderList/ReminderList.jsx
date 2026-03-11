import ReminderItem from '../ReminderItem/ReminderItem.jsx'
import './ReminderList.css'


const ReminderList = ({ reminders, deleteReminder }) => {
    if (reminders.length === 0) return null;

    const sortedReminders = [...reminders].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )
    let lastDate = null;

    return (
        <section className='card card-list'>
            <h2>Lembretes</h2>

            <article className='list-container'>

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
                            <ul className='reminders-list'>
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