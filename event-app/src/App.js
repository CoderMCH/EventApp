import React, { useEffect, useState } from 'react';
import './App.css';
import { EventList } from "./components/eventList/eventList"
import { CitySearch } from './components/citySearch/citySearch.jsx';
import { getEvents, extractLocations } from './api.js';

function App() {
    const [allEvents, setAllEvents] = useState([]);
    const [allLocations, setLocations] = useState([]);
    const [numberOfEvents, setNumberOfEvents] = useState(32);
    const [eventShown, setEventShown] = useState([]);

    getEvents().then(events => {
        setAllEvents(events);
        setLocations(extractLocations(events));

        let slicedArray = events.slice(0, numberOfEvents);
        setEventShown(slicedArray);
    });

    useEffect(() => {
        let slicedArray = allEvents.slice(0, numberOfEvents);
        setEventShown(slicedArray);
    }, [numberOfEvents])

    return (<div className="App">
        <CitySearch allLocations={allLocations} />
        <input value={numberOfEvents} role='numberOfEventFilter'
            placeholder='Number of events'
            onChange={(ev) => {setNumberOfEvents(ev.target.value)}}
        />
        <EventList events={eventShown} />
    </div>
    );
}

export default App;
