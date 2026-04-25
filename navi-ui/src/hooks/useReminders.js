import { useState, useEffect } from 'react'
import {
    deleteReminderFromApi,
    getRemindersFromApi,
    postReminderToApi
} from '../services/api.js'


function useReminders() {
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

    return {
        reminders,
        error,
        createReminder,
        deleteReminder
    }
}

export default useReminders