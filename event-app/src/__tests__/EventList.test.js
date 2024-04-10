// src/__tests__/EventList.test.js

import { render } from '@testing-library/react';
import { EventList } from '../components/eventList/eventList.jsx';
import { getEvents } from '../api.js';

describe('<EventList /> component', () => {
    test('has an element with "list" role', () => {
        const EventListComponent = render(<EventList />);
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    test('renders correct number of events', async () => {
        const allEvents = await getEvents(); 
        const EventListComponent = render(<EventList events={allEvents} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});