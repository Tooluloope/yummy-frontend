import React from "react";
// import ReactDOM from "react-dom";
import {SignUp} from "../signup";
import {render, fireEvent, cleanup} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";





afterEach(cleanup);

const setup = () => {
    const utils = render(
        <MemoryRouter>
             <SignUp />
        </MemoryRouter>
        );
    const error = utils.getByTestId("error");
    const button = utils.getByText("Sign up");
    const email = utils.getByTestId("email");
    const password = utils.getByTestId("password");
    const username = utils.getByTestId("username");
    const fullname = utils.getByTestId("fullname");
    const password2 = utils.getByTestId("password2");



    return {
        error, button,email, password , username, fullname,password2,
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
    const {error, email, password ,button, username, fullname, password2} = setup();

    fireEvent.change(email, { target: { value: "123" } });
    fireEvent.change(password, { target: { value: "123" } });
    fireEvent.change(fullname, { target: { value: "123" } });
    fireEvent.change(password2, { target: { value: "123" } });
    fireEvent.change(username, { target: { value: "123" } });
    fireEvent.click(button);

    expect(error.textContent).toBe("Password must be at least 8 characters!");
 });

 it("Text in Alert is changed when passwords doesnt match", () => {
    const {error, email, password ,button, username, fullname, password2} = setup();

    fireEvent.change(email, { target: { value: "123" } });
    fireEvent.change(password, { target: { value: "12345678" } });
    fireEvent.change(fullname, { target: { value: "123" } });
    fireEvent.change(password2, { target: { value: "12345679" } });
    fireEvent.change(username, { target: { value: "123" } });
    fireEvent.click(button);

    expect(error.textContent).toBe("Both Passwords must be the same");
 });

 it("Text if button is Enabled", () => {
    const { email, password ,button, username, fullname, password2} = setup();

    fireEvent.change(email, { target: { value: "123" } });
    fireEvent.change(password, { target: { value: "123" } });
    fireEvent.change(fullname, { target: { value: "123" } });
    fireEvent.change(password2, { target: { value: "123" } });
    fireEvent.change(username, { target: { value: "123" } });


    expect(button).not.toHaveAttribute("disabled");
 });

 

 it("Text if button is disabled", () => {
    const { email, password ,button, username, fullname, password2} = setup();

    fireEvent.change(email, { target: { value: "" } });
    fireEvent.change(password, { target: { value: "" } });
    fireEvent.change(fullname, { target: { value: "" } });
    fireEvent.change(password2, { target: { value: "" } });
    fireEvent.change(username, { target: { value: "" } });

    expect(button).toHaveAttribute("disabled");
 });

 