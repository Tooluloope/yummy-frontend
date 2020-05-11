// import React from "react";
// import ReactDOM from "react-dom";
// import {Login} from "../login";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";


//   test("calls onSubmit with the username and password when submitted",() => {
//     const handleSubmit = jest.fn();
//     const {getByText, getByTestId, container} = render(
//         <MemoryRouter>
//           <Login />
//         </MemoryRouter>
//       );
//     const form = container.querySelector("form");
//     console.log(form)
//     const {email, password} = form.element; 
//     username.value = "Kenny";
//     password.value = "pineapples";
    
//     form.dispatchEvent(new window.event("submit"));
//       expect(handleSubmit).toHaveBeenCalledTimes(1);
//       expect(handleSubmit).toHaveBeenCalledWith({
//         username: username.value,
//         password: password.value, 
//       });
//   ReactDOM.render(<Login onSubmit = {handleSubmit} />, container);
//   });