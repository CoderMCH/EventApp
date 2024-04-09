// src/__tests__/Event.test.js

import { getDefaultNormalizer, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Event } from '../components/event/event.jsx';
import { getEvents } from '../api.js';

describe("<Event /> component", () => {
    test("renders event location", async () => {
        const allEvents = await getEvents(); 
        const EventComponent = render(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    })

    test("renders event details button with the title (show details)", async () => {
        const allEvents = await getEvents(); 
        const EventComponent = render(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText("show details")).toBeInTheDocument();
    })

    // Scenario 1: An event element is collapsed by default.
    test("by default, event's details section should be hidden", async () => {
        const allEvents = await getEvents(); 
        const EventComponent = render(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText("show details")).toBeInTheDocument();
        expect(EventComponent.queryByText(allEvents[0].description)).not.toBeInTheDocument();
    })

    // Scenario 2: User can expand an event to see details.
    test("shows the details section when the user clicks on the 'show details' button", async () => {
        const allEvents = await getEvents(); 
        const EventComponent = render(<Event event={allEvents[0]} />);
        const user = userEvent.setup();
        await user.click(EventComponent.queryByText("show details"));

        // return true
        console.log(allEvents[0].description === EventComponent.queryByRole("description").textContent)
        expect(EventComponent.queryByText("hide details")).toBeInTheDocument();
        expect(EventComponent.queryByText(allEvents[0].description)).toBeInTheDocument();
    })

    // Scenario 3: User can collapse an event to hide details.
    test("hides the details section when the user clicks on the 'hide details' button", async () => {
        const allEvents = await getEvents(); 
        const EventComponent = render(<Event event={allEvents[0]} />);
        const user = userEvent.setup();
        await user.click(EventComponent.queryByText("show details"));
        await user.click(EventComponent.queryByText("hide details"));

        expect(EventComponent.queryByText("show details")).toBeInTheDocument();
        expect(EventComponent.queryByText(allEvents[0].description)).not.toBeInTheDocument();
    })
})