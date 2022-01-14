import { render, screen } from "@testing-library/react";
import Launch from "../components/launch/Launch";

describe("Launch Component", () => {
  const launch = {
    id: "5eb87cd9ffd86e000604b32a",
    name: "FalconSat",
    success: false,
    rocket: "5e9d0d95eda69955f709d1eb",
    date_utc: "2006-03-24T22:30:00.000Z",
    links: {
      patch: {
        small: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
      },
      flickr: {
        original: [],
      },
    },
  };

  test("Test launch name", () => {
    render(<Launch launch={launch} />);

    const launchName = screen.getByText(launch.name);

    expect(launchName).toBeInTheDocument();
  });

  test("Test unsuccessful text", () => {
    render(<Launch launch={launch} />);

    const launchSuccess = screen.getByText("Unsuccessful launch");

    expect(launchSuccess).toBeInTheDocument();
  });
});
