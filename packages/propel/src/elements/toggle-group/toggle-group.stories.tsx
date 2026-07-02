import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { Toggle, type ToggleMagnitude } from "../toggle/index";
import { ToggleGroup } from "./index";

const MAGNITUDES: ToggleMagnitude[] = ["sm", "md", "lg"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled `ToggleGroup`
// container and its `Toggle` items render DIRECTLY — no Base UI grafts — with every state pinned
// statically via the attributes Base UI would set: `role="group"` on the container,
// `data-orientation` for the vertical flip (the container cva's only state selector),
// `aria-pressed`/`data-pressed=""` on a pressed item, and `disabled`/`data-disabled=""` on a
// disabled one. Selection, roving focus, and the shared-`magnitude` context are demonstrated AND
// tested in Components/ToggleGroup.
const meta = {
  title: "Elements/ToggleGroup",
  component: ToggleGroup,
  subcomponents: { Toggle },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The connected/segmented container around three alignment toggles — shared outer border, dividers
 * between items, clipped corners. The first item pins the pressed state (`data-pressed=""` +
 * `aria-pressed="true"`) Base UI's single-select group would set on the current value.
 */
export const Default: Story = {
  render: () => (
    <ToggleGroup role="group" aria-label="Text alignment" data-orientation="horizontal">
      <Toggle magnitude="md" aria-label="Align left" aria-pressed="true" data-pressed="">
        <Icon>
          <AlignLeft />
        </Icon>
      </Toggle>
      <Toggle magnitude="md" aria-label="Align center" aria-pressed="false">
        <Icon>
          <AlignCenter />
        </Icon>
      </Toggle>
      <Toggle magnitude="md" aria-label="Align right" aria-pressed="false">
        <Icon>
          <AlignRight />
        </Icon>
      </Toggle>
    </ToggleGroup>
  ),
};

/**
 * The full `magnitude` scale of the composed `Toggle`s (the container itself has no size axis — the
 * components-tier ready-made shares one `magnitude` with every item via context; here each item
 * carries it explicitly). Each step also scales the glyph via `--node-size`.
 */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {MAGNITUDES.map((magnitude) => (
        <ToggleGroup
          key={magnitude}
          role="group"
          aria-label={`Text formatting (${magnitude})`}
          data-orientation="horizontal"
        >
          <Toggle
            magnitude={magnitude}
            aria-label={`Bold (${magnitude})`}
            aria-pressed="true"
            data-pressed=""
          >
            <Icon>
              <Bold />
            </Icon>
          </Toggle>
          <Toggle magnitude={magnitude} aria-label={`Italic (${magnitude})`} aria-pressed="false">
            <Icon>
              <Italic />
            </Icon>
          </Toggle>
          <Toggle
            magnitude={magnitude}
            aria-label={`Underline (${magnitude})`}
            aria-pressed="false"
          >
            <Icon>
              <Underline />
            </Icon>
          </Toggle>
        </ToggleGroup>
      ))}
    </div>
  ),
};

/**
 * The container's only state axis: `data-orientation`. `horizontal` (the base look) lays items in a
 * row with inline-start dividers; pinning `data-orientation="vertical"` stacks them and swaps the
 * divider axis — exactly the attribute Base UI's `ToggleGroup` reflects from its `orientation`
 * prop.
 */
export const Orientations: Story = {
  render: () => (
    <div className="flex items-start gap-6">
      <ToggleGroup role="group" aria-label="Horizontal" data-orientation="horizontal">
        <Toggle magnitude="md" aria-label="Bold (horizontal)" aria-pressed="true" data-pressed="">
          <Icon>
            <Bold />
          </Icon>
        </Toggle>
        <Toggle magnitude="md" aria-label="Italic (horizontal)" aria-pressed="false">
          <Icon>
            <Italic />
          </Icon>
        </Toggle>
      </ToggleGroup>
      <ToggleGroup role="group" aria-label="Vertical" data-orientation="vertical">
        <Toggle magnitude="md" aria-label="Bold (vertical)" aria-pressed="true" data-pressed="">
          <Icon>
            <Bold />
          </Icon>
        </Toggle>
        <Toggle magnitude="md" aria-label="Italic (vertical)" aria-pressed="false">
          <Icon>
            <Italic />
          </Icon>
        </Toggle>
      </ToggleGroup>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the `data-orientation` selector compiled — the vertical group
 * stacks (`flex-direction: column`) while the horizontal one keeps a row. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const OrientationsCanary: Story = {
  ...Orientations,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const horizontal = canvas.getByRole("group", { name: "Horizontal" });
    const vertical = canvas.getByRole("group", { name: "Vertical" });
    await expect(getComputedStyle(vertical).flexDirection).toBe("column");
    await expect(getComputedStyle(horizontal).flexDirection).toBe("row");
  },
};

/**
 * Every pinnable item state inside the group: rest, pressed (`data-pressed=""` — two at once, as a
 * `multiple` group allows), disabled (`disabled` + `data-disabled=""`), and pressed+disabled
 * combined.
 */
export const States: Story = {
  render: () => (
    <ToggleGroup role="group" aria-label="Item states" data-orientation="horizontal">
      <Toggle magnitude="md" aria-label="Rest" aria-pressed="false">
        <Icon>
          <AlignLeft />
        </Icon>
      </Toggle>
      <Toggle magnitude="md" aria-label="Pressed" aria-pressed="true" data-pressed="">
        <Icon>
          <Bold />
        </Icon>
      </Toggle>
      <Toggle magnitude="md" aria-label="Also pressed" aria-pressed="true" data-pressed="">
        <Icon>
          <Italic />
        </Icon>
      </Toggle>
      <Toggle magnitude="md" aria-label="Disabled" aria-pressed="false" disabled data-disabled="">
        <Icon>
          <Underline />
        </Icon>
      </Toggle>
      <Toggle
        magnitude="md"
        aria-label="Pressed and disabled"
        aria-pressed="true"
        data-pressed=""
        disabled
        data-disabled=""
      >
        <Icon>
          <AlignRight />
        </Icon>
      </Toggle>
    </ToggleGroup>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned `data-pressed` selector compiled — the pressed item's
 * selected fill computes away from the resting item's transparent one. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const rest = canvas.getByRole("button", { name: "Rest" });
    const pressed = canvas.getByRole("button", { name: "Pressed" });
    await expect(getComputedStyle(pressed).backgroundColor).not.toBe(
      getComputedStyle(rest).backgroundColor,
    );
  },
};
