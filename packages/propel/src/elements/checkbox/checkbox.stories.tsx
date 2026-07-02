import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Minus, Repeat } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import {
  Checkbox,
  CheckboxIndeterminateIndicator,
  CheckboxIndicator,
  CheckboxLabel,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI import, no graft — with every visual state pinned statically via the
// `data-*`/aria attributes Base UI's Checkbox would set (`data-checked`, `data-indeterminate`,
// `data-disabled`, `data-invalid`, `aria-checked`). `Checkbox` is the bare box (the styled
// `Checkbox.Root` target); the tick and dash are the `CheckboxIndicator` (check, hidden while
// `data-indeterminate`) and `CheckboxIndeterminateIndicator` (dash, shown only while
// `data-indeterminate`); `CheckboxLabel` is the clickable row chip. Toggling, `Field` wiring,
// keyboard, and label-click behavior are demonstrated and tested in Components/Checkbox.
const meta = {
  title: "Elements/Checkbox",
  component: Checkbox,
  subcomponents: {
    CheckboxIndicator,
    CheckboxIndeterminateIndicator,
    CheckboxLabel,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The box with both indicators, pinned checked via `data-checked` (Base UI mounts both indicator
 * parts while checked; the dash keeps itself hidden until `data-indeterminate`). The pinned
 * `role`/`aria-checked`/`aria-label` mirror what Base UI would set on the rendered box.
 */
export const Default: Story = {
  render: () => (
    <Checkbox role="checkbox" aria-checked="true" aria-label="Example" data-checked="">
      <CheckboxIndicator data-checked="">
        <Check aria-hidden />
      </CheckboxIndicator>
      <CheckboxIndeterminateIndicator data-checked="">
        <Minus aria-hidden />
      </CheckboxIndeterminateIndicator>
    </Checkbox>
  ),
};

/**
 * Every visual state, pinned statically. Resting is the bare box (Base UI mounts no indicator while
 * unchecked); `data-checked` fills the accent and shows the check; `data-indeterminate` hides the
 * check and reveals the dash; focus-visible (forced via pseudo-states) draws the accent ring;
 * `data-disabled` dims the border, fill, and glyph; `data-invalid` is the error look — a STATE, not
 * a prop: inside an invalid `Field.Root` Base UI sets it on the box (any host can set it directly,
 * as here) to recolor the resting border to danger. Once checked, the invalid box keeps the same
 * accent fill as every other checked state.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { focusVisible: ["#elements-checkbox-focus-visible"] },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox role="checkbox" aria-checked="false" aria-label="Unchecked" />
      <Checkbox role="checkbox" aria-checked="true" aria-label="Checked" data-checked="">
        <CheckboxIndicator data-checked="">
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator data-checked="">
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <Checkbox
        role="checkbox"
        aria-checked="mixed"
        aria-label="Indeterminate"
        data-indeterminate=""
      >
        <CheckboxIndicator data-indeterminate="">
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator data-indeterminate="">
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <Checkbox
        id="elements-checkbox-focus-visible"
        role="checkbox"
        aria-checked="false"
        aria-label="Focus-visible"
      />
      <Checkbox
        role="checkbox"
        aria-checked="false"
        aria-disabled="true"
        aria-label="Disabled"
        data-disabled=""
      />
      <Checkbox
        role="checkbox"
        aria-checked="true"
        aria-disabled="true"
        aria-label="Disabled checked"
        data-disabled=""
        data-checked=""
      >
        <CheckboxIndicator data-disabled="" data-checked="">
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator data-disabled="" data-checked="">
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <Checkbox
        role="checkbox"
        aria-checked="mixed"
        aria-disabled="true"
        aria-label="Disabled indeterminate"
        data-disabled=""
        data-indeterminate=""
      >
        <CheckboxIndicator data-disabled="" data-indeterminate="">
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator data-disabled="" data-indeterminate="">
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <Checkbox role="checkbox" aria-checked="false" aria-label="Invalid" data-invalid="" />
      <Checkbox
        role="checkbox"
        aria-checked="true"
        aria-label="Invalid checked"
        data-invalid=""
        data-checked=""
      >
        <CheckboxIndicator data-invalid="" data-checked="">
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator data-invalid="" data-checked="">
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
    </div>
  ),
};

/**
 * Hidden CSS canary: asserts the pinned `data-*` states compile to real styling — the
 * `data-invalid` border and `data-checked` fill differ from resting, the invalid+checked box keeps
 * the same accent fill as the plain checked box, and inside the indeterminate box the check
 * computes `display: none` while the dash computes `inline-flex`. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCssCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const resting = canvas.getByRole("checkbox", { name: "Unchecked" });
    const checked = canvas.getByRole("checkbox", { name: "Checked" });
    const invalid = canvas.getByRole("checkbox", { name: "Invalid" });
    // `data-invalid` recolors the resting border to danger.
    await expect(getComputedStyle(invalid).borderColor).not.toBe(
      getComputedStyle(resting).borderColor,
    );
    // `data-checked` swaps the bordered box for the accent fill.
    await expect(getComputedStyle(checked).backgroundColor).not.toBe(
      getComputedStyle(resting).backgroundColor,
    );
    // Once checked, the invalid box keeps the same accent fill as the plain checked box.
    const invalidChecked = canvas.getByRole("checkbox", { name: "Invalid checked" });
    await expect(getComputedStyle(invalidChecked).backgroundColor).toBe(
      getComputedStyle(checked).backgroundColor,
    );
    // In the mixed state the check hides itself and the dash reveals itself off `data-indeterminate`.
    const indeterminate = canvas.getByRole("checkbox", { name: "Indeterminate" });
    const [check, dash] = Array.from(indeterminate.children) as HTMLElement[];
    await expect(getComputedStyle(check).display).toBe("none");
    await expect(getComputedStyle(dash).display).not.toBe("none");
  },
};

/**
 * The labeled row assembled from the atomic parts: a `CheckboxLabel` chip wrapping the box, an
 * optional `Icon` slot, and the text. The hovered row (forced via pseudo-states) shows the row's
 * hover wash; the disabled row shows the label reading its look off the wrapped box — `:has()` on
 * the box's `data-disabled` cancels the hover wash and switches to the not-allowed cursor, no
 * `disabled` prop needed. In the ready-made (Components/Checkbox) the row is associated via
 * `htmlFor`/`id`, so clicking anywhere in it toggles the box.
 */
export const Labeled: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: ["#elements-checkbox-label-hover"] },
  },
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <CheckboxLabel>
        <Checkbox
          role="checkbox"
          aria-checked="true"
          aria-label="Sync automatically"
          data-checked=""
        >
          <CheckboxIndicator data-checked="">
            <Check aria-hidden />
          </CheckboxIndicator>
        </Checkbox>
        <Icon tint="secondary" magnitude="sm">
          <Repeat aria-hidden />
        </Icon>
        Sync automatically
      </CheckboxLabel>
      <CheckboxLabel id="elements-checkbox-label-hover">
        <Checkbox role="checkbox" aria-checked="false" aria-label="Hovered row" />
        Hovered row
      </CheckboxLabel>
      <CheckboxLabel>
        <Checkbox
          role="checkbox"
          aria-checked="false"
          aria-disabled="true"
          aria-label="Disabled row"
          data-disabled=""
        />
        Disabled row
      </CheckboxLabel>
    </div>
  ),
};
