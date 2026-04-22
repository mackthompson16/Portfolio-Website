import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders site title and primary content", () => {
  render(<App />);
  expect(screen.getByText(/HOMO SAPIEN/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /\[ Me \]/i })).toBeInTheDocument();
});
