import { useState } from "react"
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx"
import styles from "./ReminderForm.module.css"

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
        <section className={styles.cardForm}>
            <h2>Crie um Lembrete</h2>

            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <label>
                    Descrição
                    <input
                        className={styles.formInput}
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
                        className={styles.formInput}
                        value={date}
                        type="date"
                        required
                        onChange={e => setDate(e.target.value)}
                    />
                </label>

                <ErrorMessage message={errorMessage} />

                <button
                    className={styles.formButton}
                    type="submit">
                    Criar
                </button>
            </form>
        </section>
    )
}

export default ReminderForm