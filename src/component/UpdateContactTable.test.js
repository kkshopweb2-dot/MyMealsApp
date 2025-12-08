import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "../api/axios";
import UpdateContactTable from "./UpdateContactTable";

// Mock axios
jest.mock("../api/axios");

const mockContactUpdates = {
  data: [
    {
      order_no: "123",
      name: "John Doe",
      email: "john.doe@example.com",
      plan: "Standard",
      old_value: "1234567890",
      new_value: "0987654321",
      status: "pending",
      created_at: new Date().toISOString(),
    },
  ],
  total: 1,
  totalPages: 1,
  currentPage: 1,
};

describe("UpdateContactTable", () => {
  it("renders the table with contact updates", async () => {
    axios.get.mockResolvedValue({ data: mockContactUpdates });

    render(<UpdateContactTable title="Contact Updates" />);

    // Check for loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Check if the data is rendered correctly
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("0987654321")).toBeInTheDocument();
    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("displays an error message when fetching data fails", async () => {
    const errorMessage = "Failed to fetch contact updates. Please try again later.";
    axios.get.mockRejectedValue({
      response: { data: { error: errorMessage } },
    });

    render(<UpdateContactTable title="Contact Updates" />);

    // Check for loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
