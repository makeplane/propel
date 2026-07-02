import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, LoaderCircle, Plus, Tag, X } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";
import { IconPill, PillButton, PillLabel, type PillMagnitude, PillSwitch } from "./index";

const MAGNITUDES: PillMagnitude[] = ["sm", "md", "lg"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled pill containers
// (PillButton / PillSwitch / IconPill) and inline parts (PillLabel, internal Icon/Spinner slots)
// render DIRECTLY — no Base UI grafts — with every visual axis (`magnitude`) shown and every
// visual state pinned statically via the attributes the cvas key off: `disabled` is the native
// attribute, busy pins the `aria-busy` (+ `aria-disabled`) the ready-made pills set while
// `loading`, and the switch's selected look pins the `data-pressed=""`/`aria-pressed` Base UI's
// `Toggle` would set. Hover / active / focus-visible are CSS pseudo-classes, forced by the
// pseudo-states addon. Grafting, keyboard, and aria behavior are demonstrated AND tested in the
// ready-made pills (Components/Pill), which compose these parts.
const meta = {
  title: "Elements/Pill",
  component: PillButton,
  subcomponents: { PillSwitch, IconPill, PillLabel },
  args: { magnitude: "md", children: "Add label" },
  render: ({ children, ...props }) => (
    <PillButton {...props}>
      <Icon>
        <Tag />
      </Icon>
      <PillLabel>{children}</PillLabel>
    </PillButton>
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1121-11",
    },
  },
} satisfies Meta<typeof PillButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The atomic parts assembled: `PillButton` container › internal `Icon` slot › `PillLabel`. The
 * ready-made `PillButton` (Components/Pill) lays these out for you and adds the loading state.
 */
export const Button: Story = {};

/** Every magnitude (`sm` / `md` / `lg`) of the `PillButton` container. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <PillButton key={magnitude} magnitude={magnitude}>
          <Icon>
            <Tag />
          </Icon>
          <PillLabel>{magnitude}</PillLabel>
        </PillButton>
      ))}
    </div>
  ),
};

/**
 * Every visual state of `PillButton`, pinned statically. Hover / active / focus-visible are CSS
 * pseudo-classes forced by the pseudo-states addon; `disabled` is the native attribute the
 * `disabled:` palette keys off; busy pins the `aria-busy` (+ `aria-disabled`) the ready-made pill
 * sets while `loading` — it swaps the leading node for the internal `Spinner` slot and keeps the
 * button focusable instead of natively disabling it.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#pill-button-hover"],
      active: ["#pill-button-active"],
      focusVisible: ["#pill-button-focus"],
    },
  },
  render: () => (
    <div className="flex items-center gap-3">
      <PillButton magnitude="md">
        <Icon>
          <Tag />
        </Icon>
        <PillLabel>Default</PillLabel>
      </PillButton>
      <PillButton id="pill-button-hover" magnitude="md">
        <Icon>
          <Tag />
        </Icon>
        <PillLabel>Hover</PillLabel>
      </PillButton>
      <PillButton id="pill-button-active" magnitude="md">
        <Icon>
          <Tag />
        </Icon>
        <PillLabel>Active</PillLabel>
      </PillButton>
      <PillButton id="pill-button-focus" magnitude="md">
        <Icon>
          <Tag />
        </Icon>
        <PillLabel>Focus</PillLabel>
      </PillButton>
      <PillButton magnitude="md" disabled>
        <Icon>
          <Tag />
        </Icon>
        <PillLabel>Disabled</PillLabel>
      </PillButton>
      <PillButton magnitude="md" aria-busy aria-disabled>
        <Spinner>
          <LoaderCircle />
        </Spinner>
        <PillLabel>Busy</PillLabel>
      </PillButton>
    </div>
  ),
};

/**
 * The `PillSwitch` container: the selected look is its pressed state, pinned here via the
 * `data-pressed=""` / `aria-pressed` Base UI's `Toggle` sets on its rendered button. The toggle
 * behavior itself is grafted in the ready-made `PillSwitch` (Components/Pill) via `<Toggle
 * render={<PillSwitch/>} />`.
 */
export const Switch: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: ["#pill-switch-hover"] },
  },
  render: () => (
    <div className="flex items-center gap-3">
      <PillSwitch magnitude="md" aria-pressed={false}>
        <Icon>
          <Tag />
        </Icon>
        <PillLabel>Off</PillLabel>
      </PillSwitch>
      <PillSwitch magnitude="md" data-pressed="" aria-pressed>
        <Icon>
          <Check />
        </Icon>
        <PillLabel>On</PillLabel>
      </PillSwitch>
      <PillSwitch id="pill-switch-hover" magnitude="md" aria-pressed={false}>
        <Icon>
          <Tag />
        </Icon>
        <PillLabel>Hover</PillLabel>
      </PillSwitch>
      <PillSwitch magnitude="md" aria-pressed={false} disabled>
        <Icon>
          <Tag />
        </Icon>
        <PillLabel>Disabled</PillLabel>
      </PillSwitch>
    </div>
  ),
};

/**
 * Icon-only `IconPill` containers. Require an `aria-label`. Second row pins the states: hover /
 * active / focus-visible via the pseudo-states addon, native `disabled`, and busy (`aria-busy` +
 * `aria-disabled` with the internal `Spinner` slot replacing the icon).
 */
export const Icons: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#icon-pill-hover"],
      active: ["#icon-pill-active"],
      focusVisible: ["#icon-pill-focus"],
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {MAGNITUDES.map((magnitude) => (
          <IconPill key={magnitude} magnitude={magnitude} aria-label={`Close ${magnitude}`}>
            <Icon>
              <X />
            </Icon>
          </IconPill>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <IconPill id="icon-pill-hover" magnitude="md" aria-label="Add (hover)">
          <Icon>
            <Plus />
          </Icon>
        </IconPill>
        <IconPill id="icon-pill-active" magnitude="md" aria-label="Add (active)">
          <Icon>
            <Plus />
          </Icon>
        </IconPill>
        <IconPill id="icon-pill-focus" magnitude="md" aria-label="Add (focus)">
          <Icon>
            <Plus />
          </Icon>
        </IconPill>
        <IconPill magnitude="md" aria-label="Add (disabled)" disabled>
          <Icon>
            <Plus />
          </Icon>
        </IconPill>
        <IconPill magnitude="md" aria-label="Add (busy)" aria-busy aria-disabled>
          <Spinner>
            <LoaderCircle />
          </Spinner>
        </IconPill>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned `data-pressed` selector actually compiled — the pressed
 * switch's fill (`data-pressed:bg-layer-2-selected`) computes differently from the resting fill
 * (`bg-layer-2`). Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const SwitchCanary: Story = {
  ...Switch,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const fill = (name: string) =>
      getComputedStyle(canvas.getByRole("button", { name })).backgroundColor;
    await expect(fill("On")).not.toBe(fill("Off"));
  },
};
