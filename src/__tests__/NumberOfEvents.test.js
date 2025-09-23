/* eslint-env jest */
// eslint-disable-next-line no-unused-vars
import React from "react";
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
    render(<NumberOfEvents/>);
    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton");

    await user.type(input, "{backspace}{backspace}10");

    expect(input.value).toBe("10");
  });
});