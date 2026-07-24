import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clipboard, Copy, Scissors } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { ButtonGroup, ButtonGroupButton, type ButtonGroupButtonSize } from "./index";

const SIZES: ButtonGroupButtonSize[] = ["sm", "md", "lg"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled `ButtonGroup`
// container and its `ButtonGroupButton` segments render DIRECTLY — no Base UI grafts — with every
// pinnable state set statically: `role="group"` on the container and the native `disabled`
// attribute on a disabled segment. Activation, tab order, and the shared-`size` context are
// demonstrated AND tested in Components/ButtonGroup.
const meta = {
  title: "Elements/ButtonGroup",
  component: ButtonGroup,
  subcomponents: { ButtonGroupButton },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The connected container around three action segments — raised white surface, shared outer border,
 * dividers between items, clipped corners. The segments themselves are transparent and borderless;
 * the container owns the whole group chrome.
 */
export const Default: Story = {
  render: () => (
    <ButtonGroup role="group" aria-label="Clipboard actions">
      <ButtonGroupButton size="md">
        <Icon>
          <Scissors />
        </Icon>
        Cut
      </ButtonGroupButton>
      <ButtonGroupButton size="md">
        <Icon>
          <Copy />
        </Icon>
        Copy
      </ButtonGroupButton>
      <ButtonGroupButton size="md">
        <Icon>
          <Clipboard />
        </Icon>
        Paste
      </ButtonGroupButton>
    </ButtonGroup>
  ),
};

/**
 * The full `size` scale of the composed segments (the container itself has no size axis — the
 * components-tier ready-made shares one `size` with every item via context; here each item carries
 * it explicitly). Each step also scales the glyph via `--node-size`. There is no `xl` grouped
 * button.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      {SIZES.map((size) => (
        <ButtonGroup key={size} role="group" aria-label={`Clipboard actions (${size})`}>
          <ButtonGroupButton size={size}>
            <Icon>
              <Scissors />
            </Icon>
            Cut
          </ButtonGroupButton>
          <ButtonGroupButton size={size}>
            <Icon>
              <Copy />
            </Icon>
            Copy
          </ButtonGroupButton>
          <ButtonGroupButton size={size}>
            <Icon>
              <Clipboard />
            </Icon>
            Paste
          </ButtonGroupButton>
        </ButtonGroup>
      ))}
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the `size` axis compiled — each step's segment computes its own
 * height (20/24/28px). Tagged out of the sidebar/docs/manifest while still running under the
 * default `test` tag.
 */
export const SizesCanary: Story = {
  ...Sizes,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const heights = { sm: "20px", md: "24px", lg: "28px" } as const;
    for (const size of SIZES) {
      const group = canvas.getByRole("group", { name: `Clipboard actions (${size})` });
      const [first] = Array.from(group.querySelectorAll("button"));
      await expect(getComputedStyle(first).height).toBe(heights[size]);
    }
  },
};

/**
 * Every pinnable segment state: rest and disabled (the native `disabled` attribute — the segment
 * dims and drops pointer interaction while the container's divider stays). Hover/active are live
 * CSS states; roll over the rest segments to see them.
 */
export const States: Story = {
  render: () => (
    <ButtonGroup role="group" aria-label="Segment states">
      <ButtonGroupButton size="md">
        <Icon>
          <Scissors />
        </Icon>
        Rest
      </ButtonGroupButton>
      <ButtonGroupButton size="md" disabled>
        <Icon>
          <Copy />
        </Icon>
        Disabled
      </ButtonGroupButton>
    </ButtonGroup>
  ),
};

/**
 * CSS canary (rule 2b): asserts the `disabled:` selector compiled — the disabled segment's text
 * color computes away from the resting segment's. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const rest = canvas.getByRole("button", { name: "Rest" });
    const disabled = canvas.getByRole("button", { name: "Disabled" });
    await expect(getComputedStyle(disabled).color).not.toBe(getComputedStyle(rest).color);
  },
};
