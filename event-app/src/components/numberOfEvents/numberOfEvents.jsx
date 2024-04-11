import { useState } from "react"

export const NumberOfEvent = ({setNumberOfEvents}) => {
    const [noe, setNoe] = useState(32);

    return <div>
        <label htmlFor="NOE-textbox">Number of events: </label>
        <input id="NOE-textbox" value={noe} role='numberOfEventFilter'
            placeholder='Number of events'
            onChange={(ev) => {
                setNoe(ev.target.value);
                setNumberOfEvents(ev.target.value);
            }}
        />
    </div>
}