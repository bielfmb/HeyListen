import { useState } from "react"
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx"
import "./ReminderForm.css"

const ReminderForm = ({ createReminder, errorMessage }) => {
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
                <label>
                    Descrição
                    <input
                        className="form-input"
                        value={name}
                        type="text"
                        required
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome do lembrete"
                    />
                </label>

                <label>
                    Data
                    <input
                        className="form-input"
                        value={date}
                        type="date"
                        required
                        onChange={e => setDate(e.target.value)}
                    />
                </label>

                <ErrorMessage message={errorMessage} />

                <button className="form-button" type="submit">Criar</button>
            </form>
        </section>
    )
}

export default ReminderForm