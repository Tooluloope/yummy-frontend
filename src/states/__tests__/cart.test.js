// import React from "react";
// import ReactDOM from "react-dom";
// import * as cartState from "../cart/cart";
// import {act, render, fireEvent, cleanup} from "@testing-library/react";
// import {NavBar} from "../../components/navbar/navbar";
// import { MemoryRouter } from "react-router-dom";



// const renderWithContext = (
//     component) => {
//     return {
//       ...render(
//           <cartState.Store>
//               <MemoryRouter>
//                   {component}
//               </MemoryRouter>
//           </cartState.Store>)
//     };
// };

// afterEach(cleanup);


// it("checks the initial state", () => {
//     const { getByTestId } = renderWithContext(<NavBar />);
//     expect(getByTestId("no-product")).toHaveTextContent("No Product in this cart");
// });


