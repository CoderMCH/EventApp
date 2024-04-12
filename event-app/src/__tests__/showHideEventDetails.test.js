import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.js';
import { getEvents } from '../api.js';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideEventDetails.feature');
defineFeature(feature, test => {
    // Scenario 1: An event element is collapsed by default.
    test("An event element is collapsed by default.", ({ given, and, when, then }) => {
        let AppComponent;
        given("the main page is opened", () => {
            AppComponent = render(<App />);
        })
        when("user doesn't change anything", () => {});
        then("event details is collapsed by default", async () => {
            let allEvents = await getEvents();
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole("listitem");

            expect(within(EventListDOM).queryByText("hide details")).not.toBeInTheDocument();
            let i = 0;
            EventListItems.forEach(listitem => {
                expect(listitem.queryByText(allEvents[i++].description)).not.toBeInTheDocument();
            })
        });
    })

    // Scenario 2: User can expand an event to see details.
    test("User can expand an event to see details.", ({ given, and, when, then }) => {
        let EventListItems;
        given("user clicked the \"show details\" button in an event card", () => {
            let AppComponent = render(<App />);
            let AppDOM = AppComponent.container.firstChild;
            let user = userEvent.setup();
            let EventListDOM = AppDOM.querySelector('#event-list');
            EventListItems = within(EventListDOM).queryAllByRole("listitem");
            EventListItems.forEach(async (listitem) => {
                const showBtn = listitem.queryByText("show details");
                expect(showBtn).toBeInTheDocument();

                await user.click(showBtn);
            })
        })
        when("default", () => {})
        then("the event details is shown in the event card", async () => {
            const allEvents = await getEvents();

            let i = 0;
            EventListItems.forEach(listitem => {
                expect(listitem.queryByText(allEvents[i++].description)).toBeInTheDocument();
            })
        })
        and("\"show details\" button changes to \"hide details\"", () => {
            EventListItems.forEach(listitem => {
                expect(listitem.queryByText("show details")).toBeInTheDocument();
                expect(listitem.queryByText("hide details")).not.toBeInTheDocument();
            })
        })
    })

    // Scenario 3: User can collapse an event to hide details.
    test("User can collapse an event to hide details.", ({ given, and, when, then }) => {
        const user = userEvent.setup();
        let EventListItems;
        given("all event details are shown", () => {
            let AppComponent = render(<App />);
            let AppDOM = AppComponent.container.firstChild;
            let EventListDOM = AppDOM.querySelector('#event-list');
            EventListItems = within(EventListDOM).queryAllByRole("listitem");
            EventListItems.forEach(async (listitem) => {
                const showBtn = listitem.queryByText("show details");
                expect(showBtn).toBeInTheDocument();

                await user.click(showBtn);
            })
        })
        when("user clicks the \"hide details\" button", () => {
            EventListItems.forEach(async (listitem) => {
                const hideBtn = listitem.queryByText("hide details");
                expect(hideBtn).toBeInTheDocument();

                await user.click(hideBtn);
            })
        })
        then("the event details is hidden in the event card", async () => {
            const allEvents = await getEvents();

            let i = 0;
            EventListItems.forEach(listitem => {
                expect(listitem.queryByText(allEvents[i++].description)).not.toBeInTheDocument();
            })
        })
        and("\"hide details\" button changes to \"show details\"", () => {
            EventListItems.forEach(listitem => {
                expect(listitem.queryByText("show details")).not.toBeInTheDocument();
                expect(listitem.queryByText("hide details")).toBeInTheDocument();
            })
        })
    })
})
