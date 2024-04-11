// src/__tests__/Event.test.js

import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
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

        // '\n', '{space}{space}' break queryByText() and toHaveTextContent()
        allEvents[0].description = allEvents[0].description.replaceAll('\n', '').replaceAll('  ', '');

        const EventComponent = render(<Event event={allEvents[0]} />);
        const user = userEvent.setup();
        await user.click(EventComponent.queryByText("show details"));

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

describe('<EventList /> integration', () => {
    test('renders a list of 32 events when the app is mounted and rendered', async () => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
        });
    });
});