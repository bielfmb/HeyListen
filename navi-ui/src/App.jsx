import { useState, useEffect } from 'react'
import ReminderForm from './components/ReminderForm'
import ReminderList from "./components/ReminderList.jsx"
import {
  deleteReminderFromApi,
  getRemindersFromApi,
  postReminderToApi
} from './services/api.js'
import './App.css'


function App() {
  const [reminders, setReminders] = useState([])

  async function getReminders() {
    try {
    const remindersFromApi = await getRemindersFromApi()
    setReminders(remindersFromApi.data)      
    } catch (error) {
      alert(error.response?.data || "Não foi possível carregar os lembretes")
    }

  }

  async function createReminder(newReminder) {
    try {
      await postReminderToApi(newReminder)
      getReminders()
    } catch (error) {
      alert(error.response?.data || "Erro ao criar lembrete")
    }
  }

  async function deleteReminder(id) {
    try {
      await deleteReminderFromApi(id)
      getReminders()
    } catch (error) {
      alert(error.response?.data || "Erro ao deletar lembrete.")
    }
  }

  useEffect(() => { getReminders() }, [])

  return (
    <>
      <header>
        <h1>Hey, Listen!</h1>
      </header>

      <main>
        <ReminderForm
          createReminder={createReminder}
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
