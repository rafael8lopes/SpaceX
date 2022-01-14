import { render, screen } from "@testing-library/react";
import LaunchFilter from "../components/launchFilter/LaunchesFilter";

describe("Launches Filter Component", () => {
  test("Test launches filter title", () => {
    render(<LaunchFilter filterOptions={() => {}} />);

    const launchesTitle = screen.getByText("Launches");

    expect(launchesTitle).toBeInTheDocument();
  });

  test("Test launches filter date input", () => {
    render(<LaunchFilter filterOptions={() => {}} />);

    const launchesDateFilter = screen.getByLabelText("Date");

    expect(launchesDateFilter).toBeInTheDocument();
  });
});
