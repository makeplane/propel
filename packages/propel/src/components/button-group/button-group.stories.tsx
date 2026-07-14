import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clipboard, Copy, Scissors } from "lucide-react";
import { expect, fn } from "storybook/test";

import { Icon } from "../icon";
import { ButtonGroup, ButtonGroupButton } from "./index";

const MAGNITUDES = ["sm", "md", "lg"] as const;

// Components-tier story: the ready-made `ButtonGroup` holding ready-made `ButtonGroupButton`
// segments. The group contributes the `group` role and shares `magnitude` with every segment via
// context; each segment is an independent Base UI `Button` (plain tab order — no roving focus, no
// selection). The elements-tier story documents the same parts.
const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  subcomponents: { ButtonGroupButton },
  // `magnitude` is added in the components tier (not on the elements div) — pin a radio like
  // IconButton so Controls is not a free-text string.
  argTypes: {
    magnitude: { control: "radio", options: ["sm", "md", "lg"] },
  },
  args: { magnitude: "md" },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three independent actions sharing one connected chrome. */
export const Default: Story = {
  args: { magnitude: "md" },
  render: (args) => (
    <ButtonGroup {...args} aria-label="Clipboard actions">
      <ButtonGroupButton label="Cut" startIcon={<Icon icon={Scissors} />} />
      <ButtonGroupButton label="Copy" startIcon={<Icon icon={Copy} />} />
      <ButtonGroupButton label="Paste" startIcon={<Icon icon={Clipboard} />} />
    </ButtonGroup>
  ),
};

/**
 * Interaction test: each segment activates independently — clicking one fires the click (asserted
 * via bubbling to the group) and moves focus to it; the segments sit in plain tab order. Tagged out
 * of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  args: { magnitude: "md", onClick: fn() },
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent, args }) => {
    const copy = canvas.getByRole("button", { name: "Copy" });
    await userEvent.click(copy);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(copy).toHaveFocus();

    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Paste" })).toHaveFocus();
  },
};

/**
 * Every size side by side — the group's `magnitude` sizes each segment inside via context (a
 * segment's own `magnitude` still wins), and each magnitude also scales the glyph via
 * `--node-size`. There is no `xl` grouped button.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude` and gives each group its own accessible name, so disable just
  // that control; the rest stay live and update every group at once.
  argTypes: { magnitude: { control: false } },
  render: (args) => (
    <div className="flex flex-col items-start gap-6">
      {MAGNITUDES.map((magnitude) => (
        <ButtonGroup
          key={magnitude}
          {...args}
          magnitude={magnitude}
          aria-label={`Clipboard actions (${magnitude})`}
        >
          <ButtonGroupButton label="Cut" startIcon={<Icon icon={Scissors} />} />
          <ButtonGroupButton label="Copy" startIcon={<Icon icon={Copy} />} />
          <ButtonGroupButton label="Paste" startIcon={<Icon icon={Clipboard} />} />
        </ButtonGroup>
      ))}
    </div>
  ),
};

/**
 * Context test: the group's `magnitude` reaches every segment (each computes the step's height)
 * without any segment carrying the prop itself. Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const MagnitudesContext: Story = {
  ...Magnitudes,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const heights = { sm: "20px", md: "24px", lg: "28px" } as const;
    for (const magnitude of MAGNITUDES) {
      const group = canvas.getByRole("group", { name: `Clipboard actions (${magnitude})` });
      const [first] = Array.from(group.querySelectorAll("button"));
      await expect(getComputedStyle(first).height).toBe(heights[magnitude]);
    }
  },
};

/** A disabled segment: hard-disabled (not focusable), while its siblings stay interactive. */
export const Disabled: Story = {
  args: { magnitude: "md" },
  render: (args) => (
    <ButtonGroup {...args} aria-label="Clipboard actions">
      <ButtonGroupButton label="Cut" startIcon={<Icon icon={Scissors} />} />
      <ButtonGroupButton label="Copy" startIcon={<Icon icon={Copy} />} />
      <ButtonGroupButton label="Paste" startIcon={<Icon icon={Clipboard} />} disabled />
    </ButtonGroup>
  ),
};

/**
 * Interaction test: the disabled segment is skipped by the tab order and reports `disabled`; its
 * siblings stay in plain tab order. Tagged out of the sidebar/docs/manifest while still running
 * under the default `test` tag.
 */
export const DisabledInteraction: Story = {
  ...Disabled,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const paste = canvas.getByRole("button", { name: "Paste" });
    await expect(paste).toBeDisabled();

    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Cut" })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Copy" })).toHaveFocus();
    await userEvent.tab();
    await expect(paste).not.toHaveFocus();
  },
};
