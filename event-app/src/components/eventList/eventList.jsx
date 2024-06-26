import { Event } from "../event/event.jsx"

export const EventList = ({ events }) => {
    return <div id="event-list" role="list">
        {!events ? null :
        events.map(event => {
            return <Event key={event.id} event={event} />
        })}
    </div>
}