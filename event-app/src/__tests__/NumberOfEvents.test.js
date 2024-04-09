import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe("Number of events", () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />);
    })

    test('make sure text box is rendered', () => {
        expect(AppDOM.queryByRole("numberOfEventFilter")).toBeInTheDocument();
    });
    
    // Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
    test('32 events by default', () => {
        // queryAllByRole("listitem") return []
        expect(AppDOM.queryAllByRole("listitem")).toHaveLength(32);
    });

    // Scenario 2: When user input 12
    test("change to 12 events by user input", async () => {
        const textbox = AppDOM.queryByRole("numberOfEventFilter");
        const user = userEvent.setup();

        await user.type(textbox, '{backspace}{backspace}12');
        expect(AppDOM.queryAllByRole("listitem")).toHaveLength(12);
    })
})
