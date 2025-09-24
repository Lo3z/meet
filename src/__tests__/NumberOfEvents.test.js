/* eslint-env jest */
// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("NumberOfEvents component", () => {
  test ("contains an input textbox", () => {
    render(<NumberOfEvents/>);
    const input=screen.getByRole("spinbutton");
    expect(input).toBeInTheDocument();
  });

  test ("default input value should be 32", () => {
    render(<NumberOfEvents/>);
    const input = screen.getByRole("spinbutton");
    expect(input.value).toBe("32");
  });

  test ("input value changes when user types", async () => {
    const Wrapper = () => {
      const [numEvents, setNumEvents] = useState(32);
      return <NumberOfEvents numEvents={numEvents} onNumEventsChanged={setNumEvents}/>;
    };

    render(<Wrapper/>);
    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton");

    await user.click(input);
    await user.keyboard("{Control>}a{/Control}");
    await user.keyboard("10");

    expect(input.value).toBe("10");
  });
});