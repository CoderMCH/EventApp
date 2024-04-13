import { useState } from "react"

export const NumberOfEvent = ({setNumberOfEvents,  setErrorAlert}) => {
    const [noe, setNoe] = useState(32);

    return <div>
        <label htmlFor="NOE-textbox">Number of events: </label>
        <input id="NOE-textbox" value={noe} role='numberOfEventFilter'
            placeholder='Number of events'
            onChange={(ev) => {
                let value = ev.target.value;
                if (value.match(/^[0-9]*$/)) {
                    setErrorAlert("");
                    setNoe(value);
                    setNumberOfEvents(value);
                } else {
                    setErrorAlert("Number only in Number of events");
                    setNoe(value);
                }
            }}
        />
    </div>
}