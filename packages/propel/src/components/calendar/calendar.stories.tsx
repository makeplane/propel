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
  tags: ["ai-generated"],
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
 * Single-date selection. The picker is controlled here so clicking a day updates
 * the highlighted selection.
 */
export const Default: Story = {
  render: () => {
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
 * Range selection (`mode="range"`): the two endpoints get the solid accent fill
 * and the days between them get the soft in-range background.
 */
export const RangeSelection: Story = {
  render: () => {
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
 * Some days are disabled (here: weekends) and cannot be selected. Disabled days
 * render in muted text.
 */
export const WithDisabledDays: Story = {
  render: () => {
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
 * Behavior tests: the month grid renders day buttons, clicking a day selects it,
 * and a disabled day stays unselectable. Tagged out of the sidebar/docs/manifest
 * — it's a test canary, not a designer- or agent-facing example — but still runs
 * under the default `test` tag. A fixed `defaultMonth` keeps the grid deterministic.
 */
export const Behavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => {
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
    // The grid renders day cells; react-day-picker labels day buttons with the
    // full date ("…, January 15th, 2025") and a selected day gains ", selected".
    const day15 = canvas.getByRole("button", { name: /January 15th, 2025$/ });
    await expect(day15).toBeInTheDocument();

    // Clicking a day marks its grid cell selected (react-day-picker sets
    // `aria-selected` on the gridcell, and the button's label gains "selected").
    await userEvent.click(day15);
    await expect(
      canvas.getByRole("button", { name: /January 15th, 2025, selected$/ }),
    ).toBeVisible();
    const selectedCell = canvas.getByRole("gridcell", { selected: true });
    await expect(selectedCell).toHaveAttribute("data-day", "2025-01-15");

    // A disabled day (Jan 1) renders a disabled, non-interactive button: it
    // exposes `disabled`/`pointer-events: none`, so it can never be selected.
    const day1 = canvas.getByRole("button", { name: /January 1st, 2025$/ });
    await expect(day1).toBeDisabled();
    await expect(getComputedStyle(day1).pointerEvents).toBe("none");
    // The earlier selection is the only selected cell — the disabled day added none.
    await expect(canvas.getAllByRole("gridcell", { selected: true })).toHaveLength(1);
  },
};
