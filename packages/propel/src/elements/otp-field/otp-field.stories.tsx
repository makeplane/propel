import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  OTPField,
  OTPFieldInput,
  type OTPFieldInputMagnitude,
  OTPFieldLabel,
  OTPFieldSeparator,
} from "./index";

const MAGNITUDES: OTPFieldInputMagnitude[] = ["md", "lg", "xl"];
const CODE = "731428";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with every visual state pinned statically via the `data-*`/aria
// attributes Base UI's OTP field would set (`data-invalid=""`, `data-disabled=""`) or the native
// `disabled`/`defaultValue` attributes. Grafting, focus movement, paste, and completion behavior
// are demonstrated AND tested in the components-tier story (Components/OTPField).
const meta = {
  title: "Elements/OTPField",
  component: OTPField,
  subcomponents: { OTPFieldInput, OTPFieldLabel, OTPFieldSeparator },
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: the `OTPField` row holding six `OTPFieldInput` character
 * cells, a half-entered code pinning the filled and empty looks side by side. The visually-hidden
 * `OTPFieldLabel` names the first slot via `aria-labelledby` — mirroring the graft, where Base UI
 * ignores `aria-label` on the first slot — while the rest carry an `aria-label`.
 */
export const Default: Story = {
  render: () => (
    <OTPField>
      <OTPFieldLabel id="otp-first-slot-label">Character 1</OTPFieldLabel>
      {Array.from({ length: 6 }, (_, index) =>
        index === 0 ? (
          <OTPFieldInput
            key={index}
            magnitude="lg"
            defaultValue={CODE[index]}
            aria-labelledby="otp-first-slot-label"
          />
        ) : (
          <OTPFieldInput
            key={index}
            magnitude="lg"
            defaultValue={index < 3 ? CODE[index] : undefined}
            aria-label={`Character ${index + 1}`}
          />
        ),
      )}
    </OTPField>
  ),
};

/**
 * The slot box scale — square cells stepping md (32px) · lg (36px) · xl (44px) on the shared
 * control heights, each with a matching width and text size.
 */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {MAGNITUDES.map((magnitude) => (
        <OTPField key={magnitude}>
          {Array.from({ length: 6 }, (_, index) => (
            <OTPFieldInput
              key={index}
              magnitude={magnitude}
              defaultValue={CODE[index]}
              aria-label={`Character ${index + 1} (${magnitude})`}
            />
          ))}
        </OTPField>
      ))}
    </div>
  ),
};

/** An `OTPFieldSeparator` splits the slots into groups, e.g. `123-456`. */
export const Grouped: Story = {
  render: () => (
    <OTPField>
      <OTPFieldInput magnitude="lg" defaultValue="1" aria-label="Character 1" />
      <OTPFieldInput magnitude="lg" defaultValue="2" aria-label="Character 2" />
      <OTPFieldInput magnitude="lg" defaultValue="3" aria-label="Character 3" />
      <OTPFieldSeparator>-</OTPFieldSeparator>
      <OTPFieldInput magnitude="lg" defaultValue="4" aria-label="Character 4" />
      <OTPFieldInput magnitude="lg" defaultValue="5" aria-label="Character 5" />
      <OTPFieldInput magnitude="lg" defaultValue="6" aria-label="Character 6" />
    </OTPField>
  ),
};

/** Native `placeholder` hints (e.g. `•`) mark the empty slots until characters fill them. */
export const Placeholders: Story = {
  render: () => (
    <OTPField>
      {Array.from({ length: 6 }, (_, index) => (
        <OTPFieldInput
          key={index}
          magnitude="lg"
          placeholder="•"
          aria-label={`Character ${index + 1}`}
        />
      ))}
    </OTPField>
  ),
};

/**
 * Every pinnable slot state:
 *
 * - **Rest / Filled / Focused** — the subtle border over the `layer-2` fill; the focused cell (a CSS
 *   `:focus`, forced by the pseudo-states addon) lights to the accent border + soft ring.
 * - **Invalid** — pins the `data-invalid=""` (and `aria-invalid`) Base UI's `Field.Root` would
 *   propagate to every slot; the cell recolors its border to danger — no `tone` prop.
 * - **Disabled** — the native `disabled` plus the `data-disabled=""` Base UI mirrors onto the slot:
 *   not-allowed cursor and dimmed text.
 */
export const States: Story = {
  parameters: {
    pseudo: { focus: "#otp-slot-focus" },
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <OTPField>
        <OTPFieldInput id="otp-slot-rest" magnitude="lg" aria-label="Rest slot" />
        <OTPFieldInput magnitude="lg" defaultValue="7" aria-label="Filled slot" />
        <OTPFieldInput id="otp-slot-focus" magnitude="lg" aria-label="Focused slot" />
      </OTPField>
      <OTPField>
        {Array.from({ length: 3 }, (_, index) => (
          <OTPFieldInput
            key={index}
            id={index === 0 ? "otp-slot-invalid" : undefined}
            magnitude="lg"
            defaultValue={CODE[index]}
            aria-invalid
            data-invalid=""
            aria-label={`Invalid character ${index + 1}`}
          />
        ))}
      </OTPField>
      <OTPField>
        {Array.from({ length: 3 }, (_, index) => (
          <OTPFieldInput
            key={index}
            magnitude="lg"
            defaultValue={CODE[index]}
            disabled
            data-disabled=""
            aria-label={`Disabled character ${index + 1}`}
          />
        ))}
      </OTPField>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-invalid` slot recolors its border (`data-invalid:border-danger-strong`) away from the
 * resting slot's. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const borderColor = (id: string) => {
      const slot = canvasElement.querySelector(`#${id}`);
      if (!(slot instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(slot).borderColor;
    };
    await expect(borderColor("otp-slot-invalid")).not.toBe(borderColor("otp-slot-rest"));
  },
};
