import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clipboard, Copy, Scissors } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { ButtonGroup, ButtonGroupButton, type ButtonGroupButtonMagnitude } from "./index";

const MAGNITUDES: ButtonGroupButtonMagnitude[] = ["sm", "md", "lg"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled `ButtonGroup`
// container and its `ButtonGroupButton` segments render DIRECTLY — no Base UI grafts — with every
// pinnable state set statically: `role="group"` on the container and the native `disabled`
// attribute on a disabled segment. Activation, tab order, and the shared-`magnitude` context are
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
      <ButtonGroupButton magnitude="md">
        <Icon>
          <Scissors />
        </Icon>
        Cut
      </ButtonGroupButton>
      <ButtonGroupButton magnitude="md">
        <Icon>
          <Copy />
        </Icon>
        Copy
      </ButtonGroupButton>
      <ButtonGroupButton magnitude="md">
        <Icon>
          <Clipboard />
        </Icon>
        Paste
      </ButtonGroupButton>
    </ButtonGroup>
  ),
};

/**
 * The full `magnitude` scale of the composed segments (the container itself has no size axis — the
 * components-tier ready-made shares one `magnitude` with every item via context; here each item
 * carries it explicitly). Each step also scales the glyph via `--node-size`. There is no `xl`
 * grouped button.
 */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      {MAGNITUDES.map((magnitude) => (
        <ButtonGroup key={magnitude} role="group" aria-label={`Clipboard actions (${magnitude})`}>
          <ButtonGroupButton magnitude={magnitude}>
            <Icon>
              <Scissors />
            </Icon>
            Cut
          </ButtonGroupButton>
          <ButtonGroupButton magnitude={magnitude}>
            <Icon>
              <Copy />
            </Icon>
            Copy
          </ButtonGroupButton>
          <ButtonGroupButton magnitude={magnitude}>
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
 * CSS canary (rule 2b): asserts the `magnitude` axis compiled — each step's segment computes its
 * own height (20/24/28px). Tagged out of the sidebar/docs/manifest while still running under the
 * default `test` tag.
 */
export const MagnitudesCanary: Story = {
  ...Magnitudes,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const heights = { sm: "20px", md: "24px", lg: "28px" } as const;
    for (const magnitude of MAGNITUDES) {
      const group = canvas.getByRole("group", { name: `Clipboard actions (${magnitude})` });
      const [first] = Array.from(group.querySelectorAll("button"));
      await expect(getComputedStyle(first).height).toBe(heights[magnitude]);
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
      <ButtonGroupButton magnitude="md">
        <Icon>
          <Scissors />
        </Icon>
        Rest
      </ButtonGroupButton>
      <ButtonGroupButton magnitude="md" disabled>
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
