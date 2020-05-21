import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  debug,
} from "@testing-library/react";

import ReactDOM from "react-dom";

import Navbar from "../Navbar.jsx";


afterEach(cleanup);
// const history = ["/logout"]


describe("Drawer renders", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Navbar>Welcome,</Navbar>);
    expect(getByText("Welcome,")).toBeInTheDocument();
  });

//   it("Drawer is present", async () => {
//     const {  } = render(<Login />);

//     await waitForElement(() => toContainHtml("Email"));
//     //   fireEvent.click(getByText("Tuesday"));

//     expect(toContainHtml("Email")).toBeInTheDocument();
//   });
});
