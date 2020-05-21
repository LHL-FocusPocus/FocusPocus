import React from "react";
import Login from "../Login";
import { render } from "@testing-library/react";

describe("Application (Landing Page)", () => {
  it("renders without crashing", () => {
    render(<Login />);
  });
});
