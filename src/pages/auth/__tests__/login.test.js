import React from "react";
// import ReactDOM from "react-dom";
import {Login} from "../login";
import {render, fireEvent, cleanup} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";





afterEach(cleanup);

const setup = () => {
    const utils = render(
        <MemoryRouter>
             <Login />
        </MemoryRouter>
        );

    const error = utils.getByTestId("error");
    const button = utils.getByText("Login");
    const email = utils.getByTestId("email");
    const password = utils.getByTestId("password");


    return {
        error, button,email, password,
      ...utils,
    };
  };

it("Text if Alert is changed when button clicked and no Input", () => {
    const { error, button } = setup();

    expect(error.textContent).toBe("");

    fireEvent.click(button);

    expect(error.textContent).toBe("");
 });

 it("Text in Alert is changed when password is less than 8 chars", () => {
    const { email, password ,button, error} = setup();

    fireEvent.change(email, { target: { value: "tolulope" } });
    fireEvent.change(password, { target: { value: "123" } });
    fireEvent.click(button);

    expect(error.textContent).toBe("Password must be at least 8 characters!");
 });

 it("Text if button is Enabled", () => {
    const { email, password ,button} = setup();

    fireEvent.change(email, { target: { value: "tolulope" } });
    fireEvent.change(password, { target: { value: "123" } });

    expect(button).not.toHaveAttribute("disabled");
 });

 it("Text if button is disabled", () => {
    const { email, password ,button} = setup();

    fireEvent.change(email, { target: { value: "" } });
    fireEvent.change(password, { target: { value: "" } });

    expect(button).toHaveAttribute("disabled");
 });

 