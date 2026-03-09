import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5147/api'
})

export const getRemindersFromApi = () => api.get('/reminder')
export const postReminder = (data) => api.post('/reminder', data)
export const deleteReminderFromApi = (id) => api.delete(`/reminder/${id}`)
