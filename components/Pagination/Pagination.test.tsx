import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

// Mock icons
jest.mock("@/elements", () => ({
  AppIcons: {
    ic_prev_btn: <span data-testid="prev-icon">«</span>,
    ic_next_btn: <span data-testid="next-icon">»</span>,
  },
}));

describe("Pagination component", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      currentPage: 5,
      totalItems: 100,
      itemsPerPage: 10,
      onPageChange: jest.fn(),
      onItemsPerPageChange: jest.fn(),
    };
    return render(<Pagination {...defaultProps} {...props} />);
  };

  it("renders correctly with default props", () => {
    setup();
    expect(screen.getByText("Showing")).toBeInTheDocument();
    expect(screen.getByText("out of 100")).toBeInTheDocument();
    expect(screen.getByTestId("prev-icon")).toBeInTheDocument();
    expect(screen.getByTestId("next-icon")).toBeInTheDocument();
  });

  it("calls onPageChange when a page number is clicked", () => {
    const onPageChange = jest.fn();
    setup({ onPageChange });

    const pageBtn = screen.getByText("4");
    fireEvent.click(pageBtn);

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables previous button on first page", () => {
    setup({ currentPage: 1 });
    expect(screen.getByTestId("prev-icon").closest("button")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    setup({ currentPage: 10 });
    expect(screen.getByTestId("next-icon").closest("button")).toBeDisabled();
  });

  it("renders ellipsis if page range is truncated", () => {
    setup({ currentPage: 5 });
    const ellipsis = screen.getAllByText("...");
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it("calls onItemsPerPageChange when items per page changes", () => {
    const onItemsPerPageChange = jest.fn();
    setup({ onItemsPerPageChange });

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "50" } });

    expect(onItemsPerPageChange).toHaveBeenCalledWith(50);
  });

  it("highlights the current page", () => {
    setup({ currentPage: 3 });
    const activeBtn = screen.getByText("3");
    expect(activeBtn).toHaveClass("active"); // className from your SCSS
  });
});
