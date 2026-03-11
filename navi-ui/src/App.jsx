import { useState, useEffect } from 'react'
import ReminderForm from './components/ReminderForm/ReminderForm.jsx'
import ReminderList from "./components/ReminderList/ReminderList.jsx"
import {
  deleteReminderFromApi,
  getRemindersFromApi,
  postReminderToApi
} from './services/api.js'
import './styles/App.css'


function App() {
  const [reminders, setReminders] = useState([])
  const [error, setError] = useState(null)

  const getReminders = async () => {
    try {
      const remindersFromApi = await getRemindersFromApi()
      setReminders(remindersFromApi.data)

      setError(null)
    } catch (err) {
      setError(err.response?.data?.title
        || err.response?.data
        || "Não foi possível carregar os lembretes")
    }
  }

  const createReminder = async (newReminder) => {
    try {
      await postReminderToApi(newReminder)
      await getReminders()
    } catch (err) {
      setError(err.response?.data?.title
        || err.response?.data
        || "Erro ao criar lembrete")
    }
  }

  const deleteReminder = async (id) => {
    try {
      await deleteReminderFromApi(id)
      await getReminders()
    } catch (err) {
      setError(err.response?.data?.title
        || err.response?.data
        || "Erro ao deletar lembrete.")
    }
  }

  useEffect(() => { getReminders() }, [])

  return (
    <>
      <header className='header-background'>
        <h1 className='stylized-font'>Hey, Listen!</h1>
      </header>

      <main>
        <ReminderForm
          createReminder={createReminder}
          errorMessage={error}
        />

        <ReminderList
          reminders={reminders}
          deleteReminder={deleteReminder}
        />
      </main>

    </>
  )
}

export default App
