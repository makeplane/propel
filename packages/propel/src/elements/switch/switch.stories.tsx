import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Switch, type SwitchMagnitude, SwitchThumb } from "./index";

const MAGNITUDES: SwitchMagnitude[] = ["lg", "md", "sm"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI import, no graft — with every visual state pinned statically via the
// `data-*`/aria attributes Base UI's Switch would set (`data-checked`, `data-disabled`,
// `data-readonly`, `role="switch"`, `aria-checked`). `Switch` is the styled track: it carries the
// size axis (`magnitude`) and publishes the thumb's diameter/travel as CSS variables; `SwitchThumb`
// is the sliding knob, sizing itself from the parent track. Toggling, keyboard, labeling, and
// `Field`/form behavior are demonstrated and tested in Components/Switch.
const meta = {
  title: "Elements/Switch",
  component: Switch,
  subcomponents: { SwitchThumb },
  args: { magnitude: "md" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Track + thumb assembled statically, pinned on via `data-checked` (on both parts — the track
 * recolors to the accent, the thumb translates by the track's per-magnitude travel variable). The
 * pinned `role`/`aria-checked`/`aria-label` mirror what Base UI would set on the rendered track.
 */
export const Default: Story = {
  render: ({ magnitude }) => (
    <Switch
      magnitude={magnitude}
      role="switch"
      aria-checked="true"
      aria-label="Notifications"
      data-checked=""
    >
      <SwitchThumb data-checked="" />
    </Switch>
  ),
};

/**
 * The three track sizes of the Figma "Toggle" scale (lg 30×18 · md 27×16 · sm 23×14). Each
 * magnitude sets the thumb's diameter and checked-state travel via CSS variables, so the thumb
 * needs no size prop of its own.
 */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Switch
          key={magnitude}
          magnitude={magnitude}
          role="switch"
          aria-checked="true"
          aria-label={`Size ${magnitude}`}
          data-checked=""
        >
          <SwitchThumb data-checked="" />
        </Switch>
      ))}
    </div>
  ),
};

/**
 * Every visual state, pinned statically. Off is the resting placeholder-tinted track;
 * `data-checked` swaps it for the accent fill and slides the thumb; focus-visible (forced via
 * pseudo-states) draws the offset accent outline; `data-disabled` dims the whole control to 40% and
 * switches to the not-allowed cursor; `data-readonly` applies the same 40% dim without the cursor
 * change — both match Figma's "Unchangeable" states.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { focusVisible: ["#elements-switch-focus-visible"] },
  },
  render: ({ magnitude }) => (
    <div className="flex items-center gap-3">
      <Switch magnitude={magnitude} role="switch" aria-checked="false" aria-label="Off">
        <SwitchThumb />
      </Switch>
      <Switch
        magnitude={magnitude}
        role="switch"
        aria-checked="true"
        aria-label="On"
        data-checked=""
      >
        <SwitchThumb data-checked="" />
      </Switch>
      <Switch
        id="elements-switch-focus-visible"
        magnitude={magnitude}
        role="switch"
        aria-checked="false"
        aria-label="Focus-visible"
      >
        <SwitchThumb />
      </Switch>
      <Switch
        magnitude={magnitude}
        role="switch"
        aria-checked="false"
        aria-disabled="true"
        aria-label="Disabled off"
        data-disabled=""
      >
        <SwitchThumb data-disabled="" />
      </Switch>
      <Switch
        magnitude={magnitude}
        role="switch"
        aria-checked="true"
        aria-disabled="true"
        aria-label="Disabled on"
        data-disabled=""
        data-checked=""
      >
        <SwitchThumb data-disabled="" data-checked="" />
      </Switch>
      <Switch
        magnitude={magnitude}
        role="switch"
        aria-checked="false"
        aria-readonly="true"
        aria-label="Read-only off"
        data-readonly=""
      >
        <SwitchThumb data-readonly="" />
      </Switch>
      <Switch
        magnitude={magnitude}
        role="switch"
        aria-checked="true"
        aria-readonly="true"
        aria-label="Read-only on"
        data-readonly=""
        data-checked=""
      >
        <SwitchThumb data-readonly="" data-checked="" />
      </Switch>
    </div>
  ),
};

/**
 * Hidden CSS canary: asserts the pinned `data-*` states compile to real styling — `data-checked`
 * recolors the track away from the resting placeholder tint and translates the thumb by the track's
 * travel variable, and `data-disabled` dims the control to 40% opacity. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCssCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const off = canvas.getByRole("switch", { name: "Off" });
    const on = canvas.getByRole("switch", { name: "On" });
    // `data-checked` swaps the placeholder-tinted track for the accent fill.
    await expect(getComputedStyle(on).backgroundColor).not.toBe(
      getComputedStyle(off).backgroundColor,
    );
    // The checked thumb translates by the track's per-magnitude travel variable.
    const [offThumb] = Array.from(off.children) as HTMLElement[];
    const [onThumb] = Array.from(on.children) as HTMLElement[];
    // Tailwind v4's translate-x-* compiles to the standalone CSS `translate` property.
    await expect(getComputedStyle(onThumb).translate).not.toBe(
      getComputedStyle(offThumb).translate,
    );
    // `data-disabled` dims the whole control to 40%.
    const disabled = canvas.getByRole("switch", { name: "Disabled on" });
    await expect(getComputedStyle(disabled).opacity).toBe("0.4");
  },
};
