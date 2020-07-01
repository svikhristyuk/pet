import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const list = getByText("Users");
  const details = getByText("Edit User");

  expect(list).toBeInTheDocument();
  expect(details).toBeInTheDocument();
});
