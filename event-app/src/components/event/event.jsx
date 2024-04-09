import { useState } from "react"

export const Event = ({ event }) => {
    const [isShowDetails, setIsShowDetails] = useState(false);

    return <li role="listitem" style={{border: "1px solid black", textAlign: "left"}}>
        <h4 role="title">{event.summary}</h4>
        <p role="start">{event.start.dateTime}</p>
        {/* <p>{event.location}</p> */}
        <p>@{event.summary} | <span>{event.location}</span></p>
        <button onClick={() => setIsShowDetails(!isShowDetails)}>
            {!isShowDetails ? "show details" : "hide details"}
        </button>

        {!isShowDetails ? null : 
            <div role="about-event">
                <p role="description">{event.description}</p>
            </div>
        }
    </li>
}