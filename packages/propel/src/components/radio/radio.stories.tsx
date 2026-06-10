import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Radio, RadioGroup } from "./index";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  // RadioGroup is composed of Radios, so document Radio's props alongside it
  // (adds a Radio tab to the args table + records the relationship in the manifest).
  subcomponents: { Radio },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1838-11057",
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A `RadioGroup` with three options; the first is selected by default. */
export const Default: Story = {
  args: { defaultValue: "low" },
  render: (args) => (
    <RadioGroup {...args}>
      <label className="flex items-center gap-2 text-13 text-primary">
        <Radio value="low" />
        Low
      </label>
      <label className="flex items-center gap-2 text-13 text-primary">
        <Radio value="medium" />
        Medium
      </label>
      <label className="flex items-center gap-2 text-13 text-primary">
        <Radio value="high" />
        High
      </label>
    </RadioGroup>
  ),
};

/**
 * The states from Figma side by side: unselected, selected, disabled, and
 * read-only — each driven by the primitive, not by a variant.
 *
 * Read-only is expressed via `disabled` rather than Base UI's `readOnly`: the
 * primitive stamps `aria-readonly` onto the `role="radio"` element, which ARIA
 * does not permit on that role (axe `aria-allowed-attr`). `disabled` conveys the
 * same "selection can't be changed" intent through the ARIA-valid `aria-disabled`
 * while keeping the control non-interactive.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      <RadioGroup defaultValue="b">
        <Radio value="a" aria-label="Unselected" />
      </RadioGroup>
      <RadioGroup defaultValue="b">
        <Radio value="b" aria-label="Selected" />
      </RadioGroup>
      <RadioGroup defaultValue="b" disabled>
        <Radio value="a" aria-label="Disabled" />
      </RadioGroup>
      <RadioGroup defaultValue="b" disabled>
        <Radio value="b" aria-label="Read only" />
      </RadioGroup>
    </div>
  ),
};

/**
 * With no `value`/`defaultValue`, the group starts with nothing checked.
 * Selecting an option checks it and clears any previously-selected one, so at
 * most one radio is checked at a time. Tagged so it stays out of the
 * sidebar, docs, and AI manifest while still running under the default `test` tag.
 */
export const SelectionBehavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <RadioGroup>
      <Radio value="low" aria-label="Low" />
      <Radio value="medium" aria-label="Medium" />
      <Radio value="high" aria-label="High" />
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const [low, medium] = canvas.getAllByRole("radio");
    if (!low || !medium) throw new Error("expected radio options");

    // Nothing selected initially.
    await expect(low).toHaveAttribute("aria-checked", "false");
    await expect(medium).toHaveAttribute("aria-checked", "false");

    // Clicking an option selects it.
    await userEvent.click(low);
    await expect(low).toHaveAttribute("aria-checked", "true");

    // Selecting another deselects the first — only one checked at a time.
    await userEvent.click(medium);
    await expect(medium).toHaveAttribute("aria-checked", "true");
    await expect(low).toHaveAttribute("aria-checked", "false");

    const checked = canvas
      .getAllByRole("radio")
      .filter((r) => r.getAttribute("aria-checked") === "true");
    await expect(checked).toHaveLength(1);
  },
};

/**
 * Keyboard ARIA pattern (WAI-ARIA radiogroup, roving focus): Tab lands on the
 * currently-checked radio, and **Arrow Down/Up (and Right/Left)** move both focus
 * and selection through the group, wrapping at the ends. Only one radio is checked
 * at a time, and `aria-checked` follows the focused radio. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const KeyboardNavigation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <RadioGroup defaultValue="low">
      <Radio value="low" aria-label="Low" />
      <Radio value="medium" aria-label="Medium" />
      <Radio value="high" aria-label="High" />
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const [low, medium, high] = canvas.getAllByRole("radio");
    if (!low || !medium || !high) throw new Error("expected three radio options");

    // Tab enters the group on the checked radio (the default value).
    await userEvent.tab();
    await expect(low).toHaveFocus();
    await expect(low).toHaveAttribute("aria-checked", "true");

    // Arrow Down moves focus + selection to the next radio (the previous clears).
    await userEvent.keyboard("{ArrowDown}");
    await expect(medium).toHaveFocus();
    await expect(medium).toHaveAttribute("aria-checked", "true");
    await expect(low).toHaveAttribute("aria-checked", "false");

    // Arrow Right behaves like Arrow Down in a vertical radiogroup.
    await userEvent.keyboard("{ArrowRight}");
    await expect(high).toHaveFocus();
    await expect(high).toHaveAttribute("aria-checked", "true");

    // Arrow Down at the end wraps back to the first radio.
    await userEvent.keyboard("{ArrowDown}");
    await expect(low).toHaveFocus();
    await expect(low).toHaveAttribute("aria-checked", "true");

    // Arrow Up moves backwards (wrapping to the last radio).
    await userEvent.keyboard("{ArrowUp}");
    await expect(high).toHaveFocus();
    await expect(high).toHaveAttribute("aria-checked", "true");

    // Throughout, exactly one radio stays checked.
    const checked = canvas
      .getAllByRole("radio")
      .filter((r) => r.getAttribute("aria-checked") === "true");
    await expect(checked).toHaveLength(1);
  },
};
