import { useState } from "react"
import "./ReminderForm.css"

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
        <section className="card card-form">
            <h2>Crie um Lembrete</h2>

            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    value={name}
                    type="text"
                    onChange={e => setName(e.target.value)}
                    placeholder="Nome"
                />
                <input
                    className="form-input"
                    value={date}
                    type="date"
                    onChange={e => setDate(e.target.value)}
                />
                <button className="form-button" type="submit">Criar</button>
            </form>
        </section>
    )
}

export default ReminderForm