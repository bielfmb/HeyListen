import ReminderItem from './ReminderItem.jsx'


const ReminderList = ({ reminderList, deleteReminder }) => {
    const remindersSorted = reminderList.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )
    let lastDate = null;

    return (
        <section className='card'>
            <h2>Lembretes</h2>

            <article>
                {remindersSorted.map(r => {
                    const showDate = r.date !== lastDate
                    lastDate = r.date

                    return (
                        <ul key={r.id}>
                            {showDate &&
                                <h3>
                                    {new Date(r.date + 'T00:00:00')
                                        .toLocaleDateString('pt-BR')}
                                </h3>}

                            <ReminderItem
                                item={r}
                                deleteReminder={deleteReminder}
                            />
                        </ul>
                    )
                })}
            </article>
        </section>
    )
}

export default ReminderList