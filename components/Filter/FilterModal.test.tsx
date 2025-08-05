import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterModal from "./FilterModal";

jest.mock("@/elements", () => ({
  AppIcons: {
    ic_dropdown: <span data-testid="dropdown-icon">▼</span>,
  },
}));

describe("FilterModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    position: { top: 100, left: 100 },
  };

  const renderModal = (props = {}) =>
    render(<FilterModal {...defaultProps} {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(<FilterModal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders all form fields", () => {
    renderModal();

    expect(screen.getByLabelText("Organization")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    renderModal();

    const usernameInput = screen.getByPlaceholderText("User");
    fireEvent.change(usernameInput, { target: { value: "john" } });
    expect(usernameInput).toHaveValue("john");

    const statusSelect = screen.getByLabelText("Status");
    fireEvent.change(statusSelect, { target: { value: "active" } });
    expect(statusSelect).toHaveValue("active");
  });

  it("calls onClose when clicking outside modal (overlay)", () => {
    renderModal();

    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.mouseDown(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking outside modal (document mousedown)", () => {
    const { container } = renderModal();

    fireEvent.mouseDown(document);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("resets all fields when Reset is clicked", () => {
    renderModal();

    const usernameInput = screen.getByPlaceholderText("User");
    const resetButton = screen.getByText("Reset");

    fireEvent.change(usernameInput, { target: { value: "john" } });
    expect(usernameInput).toHaveValue("john");

    fireEvent.click(resetButton);
    expect(usernameInput).toHaveValue("");
  });

  it("logs formData and closes when Filter is clicked", () => {
    console.log = jest.fn();

    renderModal();

    const filterBtn = screen.getByText("Filter");
    const emailInput = screen.getByPlaceholderText("Email");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(filterBtn);

    expect(console.log).toHaveBeenCalledWith("Filter applied:", {
      organization: "",
      username: "",
      email: "test@example.com",
      date: "",
      phoneNumber: "",
      status: "",
    });

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
