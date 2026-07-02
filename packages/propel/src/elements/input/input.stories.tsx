import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { Input, InputGroup, type InputMagnitude } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. `Input` (the bare text control)
// and `InputGroup` (the bordered frame) are Base-UI-agnostic styled elements rendered DIRECTLY —
// no Base UI grafts — with every visual state pinned statically via the attributes the chrome keys
// off (`data-invalid=""`, the native `disabled`) or forced by the pseudo-states addon
// (hover/focus-within are CSS pseudo-classes). Field composition, typing, and validation aria
// behavior are demonstrated AND tested in the ready-made Input (Components/Input).
const meta = {
  title: "Elements/Input",
  component: Input,
  subcomponents: { InputGroup },
  args: {
    magnitude: "md",
    "aria-label": "Name",
    placeholder: "Ada Lovelace",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The anatomy assembled statically: the `InputGroup` bordered frame holding the bare `Input`
 * control. The frame owns the surface (border, fill, hover/focus chrome, magnitude geometry); the
 * control is transparent primary text over it, with the accent caret and placeholder color of its
 * own.
 */
export const Default: Story = {
  render: ({ magnitude, ...args }) => (
    <div className="w-72">
      <InputGroup magnitude={magnitude}>
        <Input magnitude={magnitude} {...args} />
      </InputGroup>
    </div>
  ),
};

/**
 * The shared control magnitude steps the input exposes (md 32px · lg 36px · xl 44px): each step
 * sets the frame height, the control's text size, and the inline glyph `--node-size` together.
 */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      {MAGNITUDES.map((magnitude) => (
        <InputGroup key={magnitude} magnitude={magnitude}>
          <Input magnitude={magnitude} aria-label={`Name (${magnitude})`} placeholder={magnitude} />
        </InputGroup>
      ))}
    </div>
  ),
};

/**
 * Leading and trailing adornments are the shared internal `Icon` slot placed beside the control
 * inside the frame; the glyph inherits the group's `--node-size`, so it tracks the magnitude step.
 */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: ({ magnitude }) => (
    <div className="w-72">
      <InputGroup magnitude={magnitude}>
        <Icon tint="secondary">
          <Search />
        </Icon>
        <Input magnitude={magnitude} aria-label="Search" placeholder="Search people" />
        <Icon tint="secondary">
          <Mail />
        </Icon>
      </InputGroup>
    </div>
  ),
};

/**
 * Every pinnable state of the input row:
 *
 * - **Rest** — the subtle border over the `layer-2` fill.
 * - **Hover** / **Focused** — CSS pseudo-classes (`:hover`, `:focus-within`), forced by the
 *   pseudo-states addon: the hover border/fill shift, and the accent border + soft ring while the
 *   inner control has focus.
 * - **Invalid** — pins the `data-invalid=""` (and `aria-invalid`) Base UI's `Field.Root` would
 *   propagate to the control; the frame recolors to danger via `:has([data-invalid])` — no `tone`
 *   prop.
 * - **Disabled** — the native `disabled` on the control: not-allowed cursor and dimmed text on the
 *   control (`disabled:opacity-60`), while the frame's `:has(:disabled)` guard flattens the fill
 *   and drops the ring (the plain input frame wraps a native control, so the native selector form
 *   is the one that fires).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: "#input-group-hover",
      focusWithin: "#input-group-focus",
    },
  },
  render: ({ magnitude }) => (
    <div className="flex w-72 flex-col gap-3">
      <InputGroup magnitude={magnitude} id="input-group-rest">
        <Input magnitude={magnitude} aria-label="Rest" placeholder="Rest" />
      </InputGroup>
      <InputGroup magnitude={magnitude} id="input-group-hover">
        <Input magnitude={magnitude} aria-label="Hover" placeholder="Hover" />
      </InputGroup>
      <InputGroup magnitude={magnitude} id="input-group-focus">
        <Input magnitude={magnitude} aria-label="Focused" placeholder="Focused" />
      </InputGroup>
      <InputGroup magnitude={magnitude} id="input-group-invalid">
        <Input
          magnitude={magnitude}
          aria-label="Invalid"
          placeholder="Invalid"
          aria-invalid
          data-invalid=""
        />
      </InputGroup>
      <InputGroup magnitude={magnitude}>
        <Input magnitude={magnitude} aria-label="Disabled" placeholder="Disabled" disabled />
      </InputGroup>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-invalid` control recolors its wrapping frame's border
 * (`has-[[data-invalid]]:border-danger-strong`) away from the resting frame's. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const borderColor = (id: string) => {
      const group = canvasElement.querySelector(`#${id}`);
      if (!(group instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(group).borderColor;
    };
    await expect(borderColor("input-group-invalid")).not.toBe(borderColor("input-group-rest"));
  },
};
