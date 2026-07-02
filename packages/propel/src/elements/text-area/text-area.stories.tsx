import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { TextArea, TextAreaGroup, type TextAreaMagnitude, type TextAreaResize } from "./index";

const MAGNITUDES: TextAreaMagnitude[] = ["sm", "md", "lg", "xl"];
const RESIZES: TextAreaResize[] = ["none", "vertical", "both"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. `TextArea` (the bare multiline
// control) and `TextAreaGroup` (the bordered frame) are Base-UI-agnostic styled elements rendered
// DIRECTLY — no Base UI grafts — with every visual state pinned statically via the attributes the
// chrome keys off (`data-invalid=""`, the native `disabled`) or forced by the pseudo-states addon
// (hover/focus-within are CSS pseudo-classes). Field composition, typing, and validation aria
// behavior are demonstrated AND tested in the ready-made TextArea (Components/TextArea).
const meta = {
  title: "Elements/TextArea",
  component: TextArea,
  subcomponents: { TextAreaGroup },
  args: {
    magnitude: "md",
    surface: "field",
    resize: "vertical",
    "aria-label": "Comment",
    placeholder: "Leave a comment...",
    rows: 3,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The anatomy assembled statically: the `TextAreaGroup` bordered frame holding the bare `TextArea`
 * leaf. The frame owns the surface (border, radius, fill, hover/focus chrome, vertical padding);
 * the leaf is transparent primary text over it, with the placeholder color and scrollbar of its
 * own.
 */
export const Default: Story = {
  render: (args) => (
    <TextAreaGroup>
      <TextArea {...args} />
    </TextAreaGroup>
  ),
};

/**
 * Every text magnitude (sm 12px · md 13px · lg 14px · xl 16px) with the same content. On the
 * `field` surface each step also pins the frame's minimum height.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each textarea for its value, so disable just those two
  // controls; the rest stay live and update every textarea at once.
  argTypes: { magnitude: { control: false }, "aria-label": { control: false } },
  args: { rows: 2 },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <TextAreaGroup key={magnitude}>
          <TextArea
            {...args}
            magnitude={magnitude}
            aria-label={`Comment (${magnitude})`}
            defaultValue={`The ${magnitude} magnitude sizes the value text.`}
          />
        </TextAreaGroup>
      ))}
    </div>
  ),
};

/**
 * `surface` picks the control presentation: `field` pairs with the bordered `TextAreaGroup` frame,
 * `embedded` pads itself inside a composer frame that owns the chrome, and `inline` hugs its line
 * height for compact single-row composers.
 */
export const Surfaces: Story = {
  parameters: { controls: { disable: true } },
  args: { resize: "none" },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextAreaGroup>
        <TextArea
          {...args}
          surface="field"
          aria-label="Field comment"
          rows={2}
          defaultValue="The field surface sits inside the TextAreaGroup frame."
        />
      </TextAreaGroup>
      <div className="flex w-full flex-col overflow-clip rounded-xl border border-subtle-1 bg-layer-2">
        <TextArea
          {...args}
          surface="embedded"
          aria-label="Embedded comment"
          rows={2}
          defaultValue="The embedded surface pads itself inside a composer frame."
        />
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-subtle-1 bg-layer-2 px-3 py-2">
        <TextArea
          {...args}
          surface="inline"
          aria-label="Inline comment"
          rows={1}
          defaultValue="The inline surface hugs a compact row."
        />
      </div>
    </div>
  ),
};

/**
 * `resize` controls the native drag handle: `none` locks the size, `vertical` allows height
 * changes, `both` frees both axes.
 */
export const Resize: Story = {
  // Iterates `resize` and labels each textarea for its value, so disable just those two
  // controls; the rest stay live and update every textarea at once.
  argTypes: { resize: { control: false }, "aria-label": { control: false } },
  args: { rows: 2 },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {RESIZES.map((resize) => (
        <TextAreaGroup key={resize}>
          <TextArea
            {...args}
            resize={resize}
            aria-label={`Comment (resize ${resize})`}
            defaultValue={`Resize ${resize}.`}
          />
        </TextAreaGroup>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state of the textarea frame:
 *
 * - **Rest** — the subtle border over the `layer-2` fill.
 * - **Hover** / **Focused** — CSS pseudo-classes (`:hover`, `:focus-within`), forced by the
 *   pseudo-states addon: the hover border/fill shift, and the accent border + soft ring while the
 *   inner control has focus.
 * - **Invalid** — pins the `data-invalid=""` (and `aria-invalid`) Base UI's `Field.Root` would
 *   propagate to the control; the frame recolors to danger via `:has([data-invalid])` — no `tone`
 *   prop.
 * - **Disabled** — the native `disabled` on the control: not-allowed cursor and dimmed text on the
 *   leaf, while the frame's `:has(:disabled)` guard flattens the fill and drops the ring (the plain
 *   textarea frame wraps a native control, so the native selector form is the one that fires).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: "#text-area-group-hover",
      focusWithin: "#text-area-group-focus",
    },
  },
  args: { rows: 2 },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextAreaGroup id="text-area-group-rest">
        <TextArea {...args} aria-label="Rest" placeholder="Rest" />
      </TextAreaGroup>
      <TextAreaGroup id="text-area-group-hover">
        <TextArea {...args} aria-label="Hover" placeholder="Hover" />
      </TextAreaGroup>
      <TextAreaGroup id="text-area-group-focus">
        <TextArea {...args} aria-label="Focused" placeholder="Focused" />
      </TextAreaGroup>
      <TextAreaGroup id="text-area-group-invalid">
        <TextArea
          {...args}
          aria-label="Invalid"
          placeholder="Invalid"
          aria-invalid
          data-invalid=""
        />
      </TextAreaGroup>
      <TextAreaGroup>
        <TextArea {...args} aria-label="Disabled" placeholder="Disabled" disabled />
      </TextAreaGroup>
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
    await expect(borderColor("text-area-group-invalid")).not.toBe(
      borderColor("text-area-group-rest"),
    );
  },
};
