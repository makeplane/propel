import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { Button, ButtonLabel } from "../button/index";
import { IconButton } from "../icon-button/index";
import { SplitButton, type SplitButtonSize, type SplitButtonVariant } from "./index";

const SIZES: SplitButtonSize[] = ["sm", "md", "lg", "xl"];
const VARIANTS: SplitButtonVariant[] = ["primary", "secondary"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled `SplitButton` frame
// renders DIRECTLY around the styled `Button` and `IconButton` elements — no Base UI grafts — with
// the disabled state pinned via the native `disabled` attribute. Menu opening, activation, and
// focus behavior are demonstrated AND tested in Components/SplitButton.
const meta = {
  title: "Elements/SplitButton",
  component: SplitButton,
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary"] },
    size: { control: "radio", options: ["sm", "md", "lg", "xl"] },
  },
  args: { variant: "primary", size: "lg" },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The connected two-segment frame for secondary, or two gapped pills for primary: the main action
 * button plus the menu-opening chevron. Secondary flattens the shared edge; primary soft-squares
 * the facing edges to 2px. Each segment keeps its own control chrome (always neutral).
 */
export const Default: Story = {
  render: () => (
    <SplitButton variant="primary" size="lg">
      <Button variant="primary" size="lg" fillType="hug">
        <Icon>
          <Plus />
        </Icon>
        <ButtonLabel>Button</ButtonLabel>
      </Button>
      <IconButton variant="primary" size="lg" aria-label="More options">
        <Icon>
          <ChevronDown />
        </Icon>
      </IconButton>
    </SplitButton>
  ),
};

/**
 * Every variant (Figma ships primary and secondary only — no tertiary/ghost, no danger palette).
 * Primary lays segments out as separate pills with a gap; secondary connects them — the leading
 * segment's own end border IS the divider.
 */
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {VARIANTS.map((variant) => (
        <SplitButton
          key={variant}
          variant={variant}
          size="lg"
          aria-label={`${variant} split button`}
        >
          <Button variant={variant} size="lg" fillType="hug">
            <Icon>
              <Plus />
            </Icon>
            <ButtonLabel>Button</ButtonLabel>
          </Button>
          <IconButton variant={variant} size="lg" aria-label={`More options (${variant})`}>
            <Icon>
              <ChevronDown />
            </Icon>
          </IconButton>
        </SplitButton>
      ))}
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the frame's variant-specific child selectors compiled — primary
 * keeps outer `rounded-md` but soft-squares the facing edges to 2px; secondary flattens the shared
 * edge (`rounded-e-none` / `rounded-s-none`) and collapses the trailing start border. Tagged out of
 * the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const VariantsCanary: Story = {
  ...Variants,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const [primaryMain, secondaryMain] = canvas.getAllByRole("button", { name: "Button" });
    const primaryTrigger = canvas.getByRole("button", { name: "More options (primary)" });
    const secondaryTrigger = canvas.getByRole("button", { name: "More options (secondary)" });

    // Primary: two discrete pills — outer corners stay `rounded-md`, split-facing edges are 2px.
    await expect(getComputedStyle(primaryMain).borderTopRightRadius).toBe("2px");
    await expect(getComputedStyle(primaryMain).borderTopLeftRadius).not.toBe("0px");
    await expect(getComputedStyle(primaryMain).borderTopLeftRadius).not.toBe("2px");
    await expect(getComputedStyle(primaryTrigger).borderTopLeftRadius).toBe("2px");
    await expect(getComputedStyle(primaryTrigger).borderTopRightRadius).not.toBe("0px");
    await expect(getComputedStyle(primaryTrigger).borderTopRightRadius).not.toBe("2px");

    // Secondary: connected — flatten shared edge, collapse trailing start border.
    await expect(getComputedStyle(secondaryMain).borderTopRightRadius).toBe("0px");
    await expect(getComputedStyle(secondaryTrigger).borderTopLeftRadius).toBe("0px");
    await expect(getComputedStyle(secondaryTrigger).borderLeftWidth).toBe("0px");
  },
};

/** The four size steps — both segments of a split button always share one `size`. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      {SIZES.map((size) => (
        <SplitButton key={size} variant="primary" size={size}>
          <Button variant="primary" size={size} fillType="hug">
            <Icon>
              <Plus />
            </Icon>
            <ButtonLabel>Button</ButtonLabel>
          </Button>
          <IconButton variant="primary" size={size} aria-label={`More options (${size})`}>
            <Icon>
              <ChevronDown />
            </Icon>
          </IconButton>
        </SplitButton>
      ))}
    </div>
  ),
};

/**
 * Both segments pinned disabled (the native `disabled` attribute): the segments show their disabled
 * fills. On secondary, the frame also dims its divider (the `:has(:disabled)` end-border tint).
 */
export const Disabled: Story = {
  render: () => (
    <SplitButton variant="primary" size="lg">
      <Button variant="primary" size="lg" fillType="hug" disabled>
        <Icon>
          <Plus />
        </Icon>
        <ButtonLabel>Button</ButtonLabel>
      </Button>
      <IconButton variant="primary" size="lg" aria-label="More options" disabled>
        <Icon>
          <ChevronDown />
        </Icon>
      </IconButton>
    </SplitButton>
  ),
};
