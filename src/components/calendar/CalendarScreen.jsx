import React, { useState } from 'react'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import "moment/locale/es"

import { Navbar } from '../ui/Navbar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import { messages } from '../../helpers/calendar-messages-español';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch,useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventCleanActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale("es");

const localizer = momentLocalizer(moment) 


export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const {activeEvent} = useSelector(state => state.calendar)
    const {events} = useSelector(state => state.calendar)
     
    const [lastView, setlastView] = useState(localStorage.getItem("lastView") || "month")

    const onDoubleClick =() =>{
        dispatch(uiOpenModal())
    }

    const onSelectEvent=(e)=>{
        dispatch(eventSetActive(e))
    }
    const onViewChange=(e)=>{
        setlastView(e)
        localStorage.setItem("lastView", e)
    }
    const onSelectSlot=(e) =>{
        dispatch(eventCleanActiveEvent())
    }


    const eventStyleGetter=(event, start, end, isSelected )=>{
        const style={
            backgroundColor:"#367CF7",
            borderRadius:"0px",
            opacity:0.8,
            display:"block",
            color:"white"
        }
        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                selectable={true}
                onSelectSlot={onSelectSlot}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}

            />
            <CalendarModal/>
            <AddNewFab/>
             {activeEvent && <DeleteEventFab/>}
        </div>
    )
}
