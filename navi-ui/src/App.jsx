import { useState } from 'react'
import { useEffect } from 'react'
import ReminderForm from './components/ReminderForm'
import ReminderList from "./components/ReminderList.jsx"
import "./services/api.js"
import './App.css'
import { deleteReminderFromApi, getRemindersFromApi, postReminder } from './services/api.js'

function App() {
  const [reminders, setReminders] = useState([])

  async function getReminders() {
    const remindersFromApi = await getRemindersFromApi()

    setReminders(remindersFromApi.data)
  }

  async function createReminder(newReminder) {
    try {
      await postReminder(newReminder)
      getReminders()
    } catch (error) {
      alert(error.response?.data || "Erro ao criar lembrete")
    }
  }

  async function deleteReminder(idToDelete) {
    try {
      await deleteReminderFromApi(idToDelete)
      getReminders()
    } catch (error) {
      alert(error.response?.data || "Erro ao deletar lembrete.")
    }
  }

  useEffect(() => { getReminders() }, [])

  return (
    <body>
      <header>
        <h1>Hey, Listen!</h1>
      </header>

      <main>
            <ReminderForm
              createReminder={createReminder}
            />

            <ReminderList
              reminderList={reminders}
              deleteReminder={deleteReminder}
            />
      </main>
      
    </body>
  )
}

export default App
