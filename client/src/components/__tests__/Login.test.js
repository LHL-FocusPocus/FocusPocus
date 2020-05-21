// import React from "react";

// import {
//   render,
//   cleanup,
//   waitForElement,
//   fireEvent,
//   prettyDOM,
//   getByText,
//   getAllByTestId,
//   getByAltText,
//   getByPlaceholderText,
//   queryByText,
//   queryByAltText,
//   debug,
// } from "@testing-library/react";

// import ReactDOM from "react-dom";

// import Login from "../Login.jsx";
// import axios from "axios";

// afterEach(cleanup);

// describe("Login Form", () => {
//   it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<Login />, div);
//   });

//   it("A login form is present", async () => {
//     const {  } = render(<Login />);

//     await waitForElement(() => toContainHtml("Email"));
//     //   fireEvent.click(getByText("Tuesday"));

//     expect(toContainHtml("Email")).toBeInTheDocument();
//   });
// });
