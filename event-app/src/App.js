import React, { useEffect, useState } from 'react';
import './App.css';
import { EventList } from "./components/eventList/eventList"
import { CitySearch } from './components/citySearch/citySearch.jsx';
import { getEvents, extractLocations } from './api.js';
import { NumberOfEvent } from './components/numberOfEvents/numberOfEvents.jsx';
import { ErrorAlert, InfoAlert, WarningAlert } from './components/alert/alert.jsx';

function App() {
    const [allEvents, setAllEvents] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [eventShown, setEventShown] = useState([]);
    const [numberOfEvents, setNumberOfEvents] = useState(32);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");
    const [warningAlert, setWarningAlert] = useState("");
    
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
        if (!navigator.onLine) {
            setWarningAlert("App offline");
        } else {
            setWarningAlert("");
        }
        fetchData();
    }, [])

    useEffect(() => {
        filterEvents(allEvents);
    }, [numberOfEvents, currentCity])

    return (<div className="App">
        <div className="alerts-container">
            {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
            {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
            {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
        </div>
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}
            setInfoAlert={setInfoAlert}
        />
        <NumberOfEvent setNumberOfEvents={setNumberOfEvents} setErrorAlert={setErrorAlert} />
        <EventList events={eventShown} />
    </div>
    );
}

export default App;
