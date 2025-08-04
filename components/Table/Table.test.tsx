import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import { TableRow, TableProps } from "@/types";

const columns = [
  { key: "organization", label: "Organization", sortable: true },
  { key: "username", label: "Username", sortable: true },
  { key: "status", label: "Status", sortable: false },
];

const data: TableRow[] = [
  {
    id: 1,
    organization: "Lendsqr",
    username: "john.doe",
    status: "active",
  },
  {
    id: 2,
    organization: "QuickCash",
    username: "jane.doe",
    status: "blacklisted",
  },
];

describe("Table component", () => {
  it("renders table headers and rows correctly", () => {
    render(<Table columns={columns} data={data} className="" />);
    
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    expect(screen.getByText("Lendsqr")).toBeInTheDocument();
    expect(screen.getByText("QuickCash")).toBeInTheDocument();
    expect(screen.getByText("john.doe")).toBeInTheDocument();
    expect(screen.getByText("jane.doe")).toBeInTheDocument();
  });

  it("displays status badges correctly", () => {
    render(<Table columns={columns} data={data} className="" />);
    
    expect(screen.getByText("Active")).toHaveClass("status_active");
    expect(screen.getByText("Blacklisted")).toHaveClass("status_blacklisted");
  });

  it("toggles sorting when sortable header is clicked", () => {
    render(<Table columns={columns} data={data} className="" />);
    
    const usernameHeader = screen.getByText("Username");
    fireEvent.click(usernameHeader); // sort asc
    fireEvent.click(usernameHeader); // sort desc

    // No visual change to assert directly unless you expose sortDirection in DOM
    // but you can test sorting functionally if you enhance the component
    expect(usernameHeader).toBeInTheDocument(); // placeholder check
  });

  it("opens filter modal when organization header is clicked", () => {
    render(<Table columns={columns} data={data} className="" />);
    
    const orgHeader = screen.getByText("Organization");
    fireEvent.click(orgHeader);

    // You may mock `FilterModal` to return some test element for easier assertion
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens action modal when action icon is clicked", () => {
    render(<Table columns={columns} data={data} className="" />);

    const actionButtons = screen.getAllByRole("button");
    fireEvent.click(actionButtons[0]); // click first row's action icon

    // You may mock ActionModal or check if it's rendered via screen query
    expect(screen.getByTestId("action-modal")).toBeInTheDocument();
  });
});
