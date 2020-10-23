import React from 'react'

export const CalendarEvent = ({event}) => {
    const {user,title} = event
    return (
        <div>
           <strong>{title}</strong> 
           <span>{user.name}</span>
        </div>
    )
}
