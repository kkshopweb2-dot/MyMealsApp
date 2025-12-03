import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import StepOne from "./StepOne";

// A wrapper component to initialize react-hook-form
const TestWrapper = () => {
  const { control, watch } = useForm({
    defaultValues: {
      orderNo: "",
      location: "Old",
      locationConfirmed: false,
    },
  });

  return <StepOne control={control} watch={watch} handleNext={() => {}} />;
};

describe("StepOne", () => {
  it("should allow typing in the Order No. field", () => {
    render(<TestWrapper />);

    const orderNoInput = screen.getByLabelText("Order No.");

    // Check that the input is not readOnly
    expect(orderNoInput).not.toHaveAttribute("readOnly");

    // Simulate typing a value
    fireEvent.change(orderNoInput, { target: { value: "12345" } });

    // Check that the value has changed
    expect(orderNoInput.value).toBe("12345");
  });
});
