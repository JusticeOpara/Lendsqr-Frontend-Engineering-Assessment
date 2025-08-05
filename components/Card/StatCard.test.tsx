import React from "react";
import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard"; 
import "@testing-library/jest-dom";

describe("StatCard Component", () => {
  const mockProps = {
    icon: <svg data-testid="icon" />,
    label: "Total Users",
    value: 123456,
    className: "bg-blue-100",
  };

  it("renders the label", () => {
    render(<StatCard {...mockProps} />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();
  });

  it("renders the formatted value", () => {
    render(<StatCard {...mockProps} />);
    expect(screen.getByText("123,456")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(<StatCard {...mockProps} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies custom class to the icon container", () => {
    const { container } = render(<StatCard {...mockProps} />);
    const iconWrapper = container.querySelector(`.${mockProps.className}`);
    expect(iconWrapper).toBeInTheDocument();
  });
});
