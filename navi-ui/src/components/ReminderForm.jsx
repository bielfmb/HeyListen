import { useState } from "react"

const ReminderForm = ({ createReminder }) => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        createReminder({ name, date })

        setName('')
        setDate('')
    }

    return (
        <section className="container">
            <h2>Crie um Lembrete</h2>

            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    type="text"
                    onChange={e => setName(e.target.value)}
                    placeholder="Nome"
                />
                <input
                    value={date}
                    type="date"
                    onChange={e => setDate(e.target.value)}
                />
                <button type="submit">Criar</button>
            </form>
        </section>
    )
}

export default ReminderForm