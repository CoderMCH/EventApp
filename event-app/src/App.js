import React, { useEffect, useState } from 'react';
import './App.css';
import { EventList } from "./components/eventList/eventList"
import { CitySearch } from './components/citySearch/citySearch.jsx';
import { getEvents, extractLocations } from './api.js';
import { NumberOfEvent } from './components/numberOfEvents/numberOfEvents.jsx';

function App() {
    const [allEvents, setAllEvents] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [eventShown, setEventShown] = useState([]);
    const [numberOfEvents, setNumberOfEvents] = useState(32);
    const [currentCity, setCurrentCity] = useState("See all cities");
    
    const fetchData = async () => {
        const events = await getEvents();
        setAllEvents(events ? events : []);
        setAllLocations(extractLocations(events));

        filterEvents(events);
    }

    const filterEvents = (events) => {
        let slicedArray = events.filter(ev => {
            return currentCity === "See all cities" ||
                ev.location.toUpperCase().includes(currentCity.toUpperCase());
        }).slice(0, numberOfEvents);
        setEventShown(slicedArray);
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        filterEvents(allEvents);
    }, [numberOfEvents, currentCity])

    return (<div className="App">
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
        <NumberOfEvent setNumberOfEvents={setNumberOfEvents} />
        <EventList events={eventShown} />
    </div>
    );
}

export default App;
