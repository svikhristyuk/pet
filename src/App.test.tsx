import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const list = getByText("List");
  const Details = getByText("Details");
  expect(list).toBeInTheDocument();
  expect(Details).toBeInTheDocument();
});
