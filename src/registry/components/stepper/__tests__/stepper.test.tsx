import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "../stepper";

function makeSteps(valid: boolean) {
  return [
    { id: "a", title: "Account", validate: () => (valid ? null : "Fill in the account"), content: <p>Step A</p> },
    { id: "b", title: "Review", content: <p>Step B</p> },
  ];
}

describe("Stepper", () => {
  it("blocks advancing when validation fails and announces the error", () => {
    render(<Stepper steps={makeSteps(false)} />);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fill in the account");
    expect(screen.getByText("Step A")).toBeInTheDocument();
  });

  it("advances, finishes, and calls onComplete", () => {
    const onComplete = vi.fn();
    render(<Stepper steps={makeSteps(true)} onComplete={onComplete} />);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Step B")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Finish" }));
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(screen.getByText("All done")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Start over" }));
    expect(screen.getByText("Step A")).toBeInTheDocument();
  });
});
