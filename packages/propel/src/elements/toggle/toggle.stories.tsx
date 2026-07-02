import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold } from "lucide-react";

import { Icon } from "../../internal/icon";
import { Toggle, type ToggleMagnitude } from "./index";

const MAGNITUDES: ToggleMagnitude[] = ["sm", "md", "lg"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. `Toggle` is a Base-UI-agnostic
// styled two-state `<button>` rendered DIRECTLY — no Base UI graft — with the pressed/disabled
// states pinned statically via the `data-pressed`/`data-disabled` attributes Base UI's Toggle
// would set (plus the matching `aria-pressed`); hover/active/focus-visible are CSS pseudo-classes,
// forced by the pseudo-states addon. The shared internal `Icon` slot sizes a bare glyph to the
// toggle's `--node-size` (set by `magnitude`). Toggling, keyboard, and aria behavior are
// demonstrated AND tested in the ready-made Toggle (Components/Toggle).
const meta = {
  title: "Elements/Toggle",
  component: Toggle,
  args: { magnitude: "md" },
  render: (args) => (
    <Toggle {...args} aria-pressed="false" aria-label="Bold">
      <Icon>
        <Bold />
      </Icon>
    </Toggle>
  ),
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single toggle wrapping an icon, resting (unpressed). */
export const Default: Story = {};

/** The three sizes side by side; each magnitude also scales the glyph via `--node-size`. */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex items-center gap-2">
      {MAGNITUDES.map((magnitude) => (
        <Toggle
          key={magnitude}
          magnitude={magnitude}
          aria-pressed="false"
          aria-label={`Bold (${magnitude})`}
        >
          <Icon>
            <Bold />
          </Icon>
        </Toggle>
      ))}
    </div>
  ),
};

/**
 * Every visual state, pinned statically. Resting is the transparent layer; hover / active /
 * focus-visible are CSS pseudo-classes forced by the pseudo-states addon; `data-pressed` (with the
 * matching `aria-pressed="true"` Base UI would set) selects the layer and brightens the glyph to
 * `text-icon-primary`; `data-disabled` dims the whole control and swaps to the not-allowed cursor —
 * pinned alongside the native `disabled` the grafted Base UI Toggle would also set.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#elements-toggle-hover"],
      active: ["#elements-toggle-active"],
      focusVisible: ["#elements-toggle-focus-visible"],
    },
  },
  render: ({ magnitude }) => (
    <div className="flex items-center gap-2">
      <Toggle magnitude={magnitude} aria-pressed="false" aria-label="Resting">
        <Icon>
          <Bold />
        </Icon>
      </Toggle>
      <Toggle
        id="elements-toggle-hover"
        magnitude={magnitude}
        aria-pressed="false"
        aria-label="Hovered"
      >
        <Icon>
          <Bold />
        </Icon>
      </Toggle>
      <Toggle
        id="elements-toggle-active"
        magnitude={magnitude}
        aria-pressed="false"
        aria-label="Active"
      >
        <Icon>
          <Bold />
        </Icon>
      </Toggle>
      <Toggle
        id="elements-toggle-focus-visible"
        magnitude={magnitude}
        aria-pressed="false"
        aria-label="Focus-visible"
      >
        <Icon>
          <Bold />
        </Icon>
      </Toggle>
      <Toggle magnitude={magnitude} aria-pressed="true" aria-label="Pressed" data-pressed="">
        <Icon>
          <Bold />
        </Icon>
      </Toggle>
      <Toggle
        magnitude={magnitude}
        aria-pressed="false"
        aria-label="Disabled"
        disabled
        data-disabled=""
      >
        <Icon>
          <Bold />
        </Icon>
      </Toggle>
      <Toggle
        magnitude={magnitude}
        aria-pressed="true"
        aria-label="Disabled pressed"
        disabled
        data-disabled=""
        data-pressed=""
      >
        <Icon>
          <Bold />
        </Icon>
      </Toggle>
    </div>
  ),
};
