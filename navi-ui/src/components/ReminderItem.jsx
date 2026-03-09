
const ReminderItem = ({ item, deleteReminder }) => {
    return (
        <li>
            <span>{item.name}</span>
            <button 
                type="submit" 
                onClick={() => deleteReminder(item.id)}>
                    
                Remover
            </button>
        </li>
    )
}

export default ReminderItem