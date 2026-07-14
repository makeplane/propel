import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { expect } from "storybook/test";

import { Calendar } from "./index";

// A fixed month so every grid renders deterministically (no reliance on "today").
const JANUARY_2025 = new Date(2025, 0, 1);

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1286-12844",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Single-date selection. The picker is controlled here so clicking a day updates the highlighted
 * selection.
 */
export const Default: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date(2025, 0, 24));
    return (
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2025}
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
};

/**
 * Range selection (`mode="range"`): the two endpoints get the solid accent fill and the days
 * between them get the soft in-range background.
 */
export const RangeSelection: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 0, 13),
      to: new Date(2025, 0, 20),
    });
    return (
      <Calendar mode="range" defaultMonth={JANUARY_2025} selected={range} onSelect={setRange} />
    );
  },
};

/**
 * Some days are disabled (here: weekends) and cannot be selected. Disabled days render in muted
 * text.
 */
export const WithDisabledDays: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<Date | undefined>();
    return (
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2025}
        selected={selected}
        onSelect={setSelected}
        disabled={{ dayOfWeek: [0, 6] }}
      />
    );
  },
};

/**
 * The current date carries a 6px accent dot, centered 4px above the bottom edge of its 40px cell.
 * The dot persists when today is selected (inside the solid pill) or mid-range. `today` is pinned
 * to Jan 6 so the story renders deterministically.
 */
export const TodayIndicator: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<Date | undefined>();
    return (
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2025}
        today={new Date(2025, 0, 6)}
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const todayButton = canvas.getByRole("button", { name: /^Today, .*January 6th, 2025/ });
    const todayCell = todayButton.closest("td") as HTMLTableCellElement;
    const dot = getComputedStyle(todayCell, "::after");
    await expect(dot.width).toBe("6px");
    await expect(dot.height).toBe("6px");
    await expect(dot.bottom).toBe("4px");

    // The dot survives selection: select today, the pseudo-element is still there.
    await userEvent.click(todayButton);
    await expect(canvas.getByRole("gridcell", { selected: true })).toHaveAttribute(
      "data-day",
      "2025-01-06",
    );
    await expect(getComputedStyle(todayCell, "::after").width).toBe("6px");
  },
};

/**
 * Behavior tests: the month grid renders day buttons, clicking a day selects it, and a disabled day
 * stays unselectable. Tagged out of the sidebar/docs/manifest but still runs under `test`. A fixed
 * `defaultMonth` keeps the grid deterministic.
 */
export const Behavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: function Render() {
    const [selected, setSelected] = React.useState<Date | undefined>();
    return (
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2025}
        selected={selected}
        onSelect={setSelected}
        // Disable Jan 1 so we can assert it is not selectable.
        disabled={[new Date(2025, 0, 1)]}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const day15 = canvas.getByRole("button", { name: /January 15th, 2025$/ });
    await expect(day15).toBeInTheDocument();

    await userEvent.click(day15);
    await expect(
      canvas.getByRole("button", { name: /January 15th, 2025, selected$/ }),
    ).toBeVisible();
    const selectedCell = canvas.getByRole("gridcell", { selected: true });
    await expect(selectedCell).toHaveAttribute("data-day", "2025-01-15");

    const day1 = canvas.getByRole("button", { name: /January 1st, 2025$/ });
    await expect(day1).toBeDisabled();
    await expect(getComputedStyle(day1).pointerEvents).toBe("none");
    await expect(canvas.getAllByRole("gridcell", { selected: true })).toHaveLength(1);
  },
};

/**
 * Keyboard ARIA pattern (WAI-ARIA grid date picker): Tab moves focus into the month grid, **Arrow
 * keys** move the focused day (Right = +1 day, Down = +7 days), and **Enter** selects it. A fixed
 * `defaultMonth` and known selection keep the focused day deterministic. Tagged out of the
 * sidebar/docs/manifest but still runs under `test`.
 */
export const KeyboardNavigation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: function Render() {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date(2025, 0, 15));
    return (
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2025}
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const day15 = canvas.getByRole("button", { name: /January 15th, 2025, selected$/ });
    for (let i = 0; i < 4 && document.activeElement !== day15; i++) {
      await userEvent.tab();
    }
    await expect(day15).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("button", { name: /January 16th, 2025$/ })).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    const day23 = canvas.getByRole("button", { name: /January 23rd, 2025$/ });
    await expect(day23).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(
      canvas.getByRole("button", { name: /January 23rd, 2025, selected$/ }),
    ).toBeVisible();
    const selectedCell = canvas.getByRole("gridcell", { selected: true });
    await expect(selectedCell).toHaveAttribute("data-day", "2025-01-23");
    await expect(canvas.getAllByRole("gridcell", { selected: true })).toHaveLength(1);
  },
};
