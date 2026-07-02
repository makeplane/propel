import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Radio, RadioGroup, type RadioGroupDensity, RadioIndicator } from "./index";

const DENSITIES: RadioGroupDensity[] = ["comfortable", "compact"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI import, no graft — with every visual state pinned statically via the
// `data-*`/aria attributes Base UI's Radio would set (`data-checked`, `data-disabled`,
// `aria-checked`). `Radio` is the 16px ring (the styled `Radio.Root` target); the selected dot is
// the `RadioIndicator`, which Base UI mounts only while checked, so only pinned-checked rings
// render it here; `RadioGroup` is the stacked column frame carrying the `density` axis. Selection,
// roving focus, keyboard, and `Field`/`Form` wiring are demonstrated and tested in
// Components/Radio.
const meta = {
  title: "Elements/Radio",
  component: Radio,
  subcomponents: { RadioGroup, RadioIndicator },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: the `RadioGroup` column frame (Base UI would set
 * `role="radiogroup"`, pinned here) stacking three rings, the first pinned selected via
 * `data-checked` with its `RadioIndicator` dot mounted — the dot fills with the ring's
 * `currentColor` (`bg-current`), so it picks up the accent the checked ring switches to.
 */
export const Default: Story = {
  render: () => (
    <RadioGroup density="comfortable" role="radiogroup" aria-label="Priority">
      <Radio role="radio" aria-checked="true" aria-label="Low" data-checked="">
        <RadioIndicator />
      </Radio>
      <Radio role="radio" aria-checked="false" aria-label="Medium" />
      <Radio role="radio" aria-checked="false" aria-label="High" />
    </RadioGroup>
  ),
};

/**
 * Every visual state, pinned statically. Unselected is the bare tertiary ring (Base UI mounts no
 * indicator while unchecked); `data-checked` recolors the ring to the accent and the dot inherits
 * it; focus-visible (forced via pseudo-states) draws the accent ring + offset; `data-disabled`
 * (with the `aria-disabled` Base UI mirrors) switches to the not-allowed cursor, the disabled icon
 * tint, and 60% opacity — selected or not.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { focusVisible: ["#elements-radio-focus-visible"] },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Radio role="radio" aria-checked="false" aria-label="Unselected" />
      <Radio role="radio" aria-checked="true" aria-label="Selected" data-checked="">
        <RadioIndicator />
      </Radio>
      <Radio
        id="elements-radio-focus-visible"
        role="radio"
        aria-checked="false"
        aria-label="Focus-visible"
      />
      <Radio
        role="radio"
        aria-checked="false"
        aria-disabled="true"
        aria-label="Disabled"
        data-disabled=""
      />
      <Radio
        role="radio"
        aria-checked="true"
        aria-disabled="true"
        aria-label="Disabled selected"
        data-disabled=""
        data-checked=""
      >
        <RadioIndicator />
      </Radio>
    </div>
  ),
};

/**
 * Hidden CSS canary (rule 2b): asserts the pinned `data-*` states compile to real styling — the
 * `data-checked` ring recolors its `currentColor` away from the resting tertiary, the dot's
 * `bg-current` fill computes to that same accent, and `data-disabled` dims the control to 60%
 * opacity. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const StatesCssCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const resting = canvas.getByRole("radio", { name: "Unselected" });
    const selected = canvas.getByRole("radio", { name: "Selected" });
    const disabled = canvas.getByRole("radio", { name: "Disabled" });
    // `data-checked` recolors the ring's `currentColor` from tertiary to the accent.
    await expect(getComputedStyle(selected).color).not.toBe(getComputedStyle(resting).color);
    // The dot fills via `bg-current`, so its background equals the checked ring's color.
    const dot = selected.firstElementChild;
    if (!(dot instanceof HTMLElement)) throw new Error("expected the selected ring's dot");
    await expect(getComputedStyle(dot).backgroundColor).toBe(getComputedStyle(selected).color);
    // `data-disabled` dims the whole control.
    await expect(getComputedStyle(disabled).opacity).toBe("0.6");
  },
};

/**
 * The group frame's row-spacing axis — the only variant axis in the family: `comfortable` stacks
 * the rows with an 8px gap, `compact` sets them flush (e.g. a settings panel where options read
 * like menu items).
 */
export const Density: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-start gap-10">
      {DENSITIES.map((density) => (
        <RadioGroup
          key={density}
          density={density}
          role="radiogroup"
          aria-label={`${density} density`}
        >
          <Radio
            role="radio"
            aria-checked="true"
            aria-label={`${density} selected`}
            data-checked=""
          >
            <RadioIndicator />
          </Radio>
          <Radio role="radio" aria-checked="false" aria-label={`${density} unselected`} />
        </RadioGroup>
      ))}
    </div>
  ),
};
