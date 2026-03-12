import ReminderForm from './components/ReminderForm/ReminderForm.jsx'
import ReminderList from './components/ReminderList/ReminderList.jsx'
import useReminders from './hooks/useReminders.js'
import './styles/App.css'


function App() {
  const { reminders, error, createReminder, deleteReminder } = useReminders()

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
