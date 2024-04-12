import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.js';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
defineFeature(feature, test => {
    // Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
    test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, and, when, then }) => {
        let AppComponent;
        given('"Number of Events" textbox is 32 by default', () => {
            AppComponent = render(<App />)
            expect(AppComponent.queryByRole("numberOfEventFilter")).toHaveValue("32"); 
        })
        when("user hasn't specified a number in \"Number of Events\" textbox", async () => {

        })
        then("user receives a list of upcoming events up to 32.", async () => {
            await waitFor(() => {
                expect(AppComponent.queryAllByRole("listitem")).toHaveLength(32);
            })
        })
    });

    // Scenario 2: When user input 12
    test("When user type 12 in \"Number of Events\" textbox", ({ given, and, when, then }) => {
        let AppDOM;
        given("user change the number of events to 12 in \"Number of events\" textbox.", async () => {
            AppDOM = render(<App />)
            expect(AppDOM.queryByRole("numberOfEventFilter")).toHaveValue("32");
            const textbox = AppDOM.queryByRole("numberOfEventFilter");
            const user = userEvent.setup();
            await user.type(textbox, '{backspace}{backspace}12');
        })
        when("user hasn't specified 12 in \"Number of Events\" textbox", () => {

        })
        then("the user should receive a list of up to 12 upcoming events.", () => {
            expect(AppDOM.queryAllByRole("listitem")).toHaveLength(12);
        })
    })
})
