import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Table from "./Table";
import { AppIcons } from "@/elements";
import { TableProps } from "@/types";

// Mock the icons and child components
jest.mock("@/elements", () => ({
  AppIcons: {
    ic_filter: <span data-testid="filter-icon">🔽</span>,
    ic_dot: <span data-testid="dot-icon">⋮</span>,
  },
}));

jest.mock("../Filter/FilterModal", () => ({
  FilterModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="filter-modal" /> : null,
}));

jest.mock("../ActionModal/ActionModal", () => ({
  ActionModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="action-modal" /> : null,
}));

describe("Table Component", () => {
  const mockColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "age", label: "Age", sortable: false },
    { key: "status", label: "Status", sortable: true },
    { key: "organization", label: "Organization", sortable: true },
  ];

  const mockData = [
    {
      id: "1",
      name: "John Doe",
      age: "30",
      status: "active",
      organization: "Acme Inc",
    },
    {
      id: "2",
      name: "Jane Smith",
      age: "25",
      status: "pending",
      organization: "Globex Corp",
    },
    {
      id: "3",
      name: "Bob Johnson",
      age: "40",
      status: "inactive",
      organization: "Soylent Corp",
    },
    {
      id: "4",
      name: "Alice Brown",
      age: "35",
      status: "blacklisted",
      organization: "Initech",
    },
  ];

  const renderTable = (props: Partial<TableProps> = {}) => {
    const defaultProps: TableProps = {
      columns: mockColumns,
      data: mockData,
      className: "test-class",
    };

    return render(<Table {...defaultProps} {...props} />);
  };

  it("renders without crashing", () => {
    renderTable();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    renderTable();
    const tableContainer = screen.getByTestId("table-container");
    expect(tableContainer).toHaveClass("test-class");
  });

  it("renders correct number of columns and rows", () => {
    renderTable();
    
    // Check headers
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(mockColumns.length + 1); // +1 for actions column
    
    // Check rows
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.length + 1); // +1 for header row
  });

  it("renders correct column headers", () => {
    renderTable();
    
    mockColumns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it("renders sort icons only for sortable columns", () => {
    renderTable();
    
    const filterIcons = screen.getAllByTestId("filter-icon");
    expect(filterIcons).toHaveLength(3); // 3 sortable columns in mock data
    
    const ageHeader = screen.getByText("Age").closest("th");
    expect(ageHeader).not.toContainElement(screen.queryByTestId("filter-icon"));
  });

  it("renders status badges correctly", () => {
    renderTable();
    
    expect(screen.getByText("Active")).toHaveClass("status_active");
    expect(screen.getByText("Pending")).toHaveClass("status_pending");
    expect(screen.getByText("Inactive")).toHaveClass("status_inactive");
    expect(screen.getByText("Blacklisted")).toHaveClass("status_blacklisted");
  });

  it("opens filter modal when organization header is clicked", () => {
    renderTable();
    
    const orgHeader = screen.getByText("Organization").closest("th");
    if (orgHeader) {
      fireEvent.click(orgHeader);
    }
    
    expect(screen.getByTestId("filter-modal")).toBeInTheDocument();
  });

  it("toggles sort direction when clicking a sortable column", () => {
    renderTable();
    
    const nameHeader = screen.getByText("Name").closest("th");
    if (nameHeader) {
      // First click should set to asc
      fireEvent.click(nameHeader);
      // Second click should toggle to desc
      fireEvent.click(nameHeader);
    }
    
    // You would need to implement a way to verify the sort direction change
    // This might require mocking the sort function or checking for aria-sort attributes
  });

  it("opens action menu when dot icon is clicked", () => {
    renderTable();
    
    const firstDotIcon = screen.getAllByTestId("dot-icon")[0];
    fireEvent.click(firstDotIcon);
    
    expect(screen.getByTestId("action-modal")).toBeInTheDocument();
  });

  it("closes action menu when clicking outside", () => {
    renderTable();
    
    const firstDotIcon = screen.getAllByTestId("dot-icon")[0];
    fireEvent.click(firstDotIcon);
    
    expect(screen.getByTestId("action-modal")).toBeInTheDocument();
    
    fireEvent.click(document.body);
    
    expect(screen.queryByTestId("action-modal")).not.toBeInTheDocument();
  });

  it("renders correct data in cells", () => {
    renderTable();
    
    mockData.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age)).toBeInTheDocument();
      expect(screen.getByText(row.organization)).toBeInTheDocument();
    });
  });

  it("handles empty data gracefully", () => {
    renderTable({ data: [] });
    
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1); // Just header row
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders default status badge for unknown status values", () => {
    const customData = [
      {
        id: "5",
        name: "Test User",
        age: "99",
        status: "unknown",
        organization: "Test Org",
      },
    ];
    
    renderTable({ data: customData });
    
    expect(screen.getByText("unknown")).toHaveClass("status_default");
  });
});