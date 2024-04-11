import { useState } from "react"
import './event.css'

export const Event = ({ event }) => {
    const [isShowDetails, setIsShowDetails] = useState(false);

    return <li className="event-list-item" role="listitem">
        <h4 role="title">{event.summary}</h4>
        <p role="start">{event.start.dateTime}</p>
        <p>@{event.summary} | <span>{event.location}</span></p>
        <div className="event-list-item-button-block">
            <button className="event-list-item-button"
                onClick={() => setIsShowDetails(!isShowDetails)}>
                {!isShowDetails ? "show details" : "hide details"}
            </button>
        </div>

        {!isShowDetails ? null : 
            <div role="about-event">
                <p role="description">{event.description}</p>
            </div>
        }
    </li>
}