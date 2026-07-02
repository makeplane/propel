import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold } from "lucide-react";
import { expect } from "storybook/test";

import { Toggle, ToggleIcon, type ToggleMagnitude } from "./index";

const MAGNITUDES: ToggleMagnitude[] = ["sm", "md", "lg"];

// elements-tier story (rule 2b): the styled `Toggle` button is Base-UI-agnostic; Base UI's `Toggle`
// behavior grafts onto it via `render` (behavior outer, the styled button as the render target),
// reflecting `[data-pressed]`/`[data-disabled]`. `ToggleIcon` sizes a bare glyph to the toggle's
// `--node-size` (set by the toggle's `magnitude`). The components-tier story shows the ready-made.
const meta = {
  title: "Elements/Toggle",
  component: ToggleIcon,
  subcomponents: { Toggle },
} satisfies Meta<typeof ToggleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single toggle wrapping an icon; click flips pressed. */
export const Default: Story = {
  render: () => (
    <BaseToggle render={<Toggle magnitude="md" />} aria-label="Bold">
      <ToggleIcon>
        <Bold />
      </ToggleIcon>
    </BaseToggle>
  ),
};

/**
 * Interaction test: clicking the toggle flips its pressed state on and off. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Bold" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};

/** The three sizes side by side. */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      {MAGNITUDES.map((magnitude) => (
        <BaseToggle
          key={magnitude}
          render={<Toggle magnitude={magnitude} />}
          aria-label={`Bold ${magnitude}`}
        >
          <ToggleIcon>
            <Bold />
          </ToggleIcon>
        </BaseToggle>
      ))}
    </div>
  ),
};
