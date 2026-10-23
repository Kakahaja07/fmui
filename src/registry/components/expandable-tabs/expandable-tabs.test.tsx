import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Home01Icon, Mail01Icon, Settings01Icon } from "@hugeicons/core-free-icons";
import { ExpandableTabs } from "./expandable-tabs";

const tabs = [
  { id: "home", label: "Home", icon: Home01Icon },
  { id: "inbox", label: "Inbox", icon: Mail01Icon },
  { id: "settings", label: "Settings", icon: Settings01Icon },
];

describe("ExpandableTabs", () => {
  it("selects on click and reports the change", () => {
    const onValueChange = vi.fn();
    render(<ExpandableTabs tabs={tabs} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "Inbox" }));
    expect(onValueChange).toHaveBeenCalledWith("inbox");
    expect(screen.getByRole("tab", { name: "Inbox" })).toHaveAttribute("aria-selected", "true");
  });

  it("moves selection with arrow keys and wraps around", () => {
    render(<ExpandableTabs tabs={tabs} />);
    const home = screen.getByRole("tab", { name: "Home" });
    home.focus();
    fireEvent.keyDown(home, { key: "ArrowLeft" });
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(screen.getByRole("tab", { name: "Settings" }), { key: "ArrowRight" });
    expect(home).toHaveAttribute("aria-selected", "true");
  });
});
