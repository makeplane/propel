import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle } from "lucide-react";

import { Spinner } from "../../internal/spinner";
import {
  AnchorButton,
  AnchorButtonLabel,
  type AnchorButtonSize,
  type AnchorButtonVariant,
} from "./index";

const VARIANTS: AnchorButtonVariant[] = ["primary", "secondary"];
const SIZES: AnchorButtonSize[] = ["sm", "md", "lg", "xl"];

// elements-tier story (rule 2b): a pure UI-configuration showcase of the styled `<button>` wearing
// the inline-link look, rendered directly. Its interaction states are CSS (`hover:`/
// `focus-visible:`) plus the `disabled`/`aria-disabled` attributes Base UI's `Button` sets, so
// `States` pins them statically (pseudo-states addon + the attributes). The Base UI `Button` graft
// (clicks, `disabled`, keyboard) is demonstrated and tested in Components/AnchorButton. For real
// navigation with this look, use the ready-made with `nativeButton={false}` + `render={<a />}`.
// For a nav link wearing *button* chrome, use `Button` with the same `render` mechanics.
const meta = {
  title: "Elements/AnchorButton",
  component: AnchorButton,
  args: {
    children: <AnchorButtonLabel>Show more</AnchorButtonLabel>,
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof AnchorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `variant`: `primary` is the blue link; `secondary` is the muted gray inline link. */
export const Variants: Story = {
  argTypes: { variant: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {VARIANTS.map((variant) => (
        <AnchorButton key={variant} {...args} variant={variant}>
          <AnchorButtonLabel>{variant} action</AnchorButtonLabel>
        </AnchorButton>
      ))}
    </div>
  ),
};

/** Text sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Sizes: Story = {
  argTypes: { size: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {SIZES.map((size) => (
        <AnchorButton key={size} {...args} size={size}>
          <AnchorButtonLabel>{size}</AnchorButtonLabel>
        </AnchorButton>
      ))}
    </div>
  ),
};

/**
 * Every visual state of the link chrome, per variant, pinned statically: hover recolors the text
 * (forced via the pseudo-states addon), focus-visible draws the accent ring (also forced), native
 * `disabled` — what Base UI's `Button` sets by default — and `aria-disabled="true"` — the
 * soft-disabled state it sets under `focusableWhenDisabled` — both keep the underline and mute to
 * the disabled text color with `cursor-not-allowed`. Busy pins the `aria-busy`/`aria-disabled` the
 * ready-made sets while `loading` (spinner in the icon slot — leading by default; label and spinner
 * share muted weight).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: VARIANTS.map((variant) => `#button-anchor-${variant}-hover`),
      focusVisible: VARIANTS.map((variant) => `#button-anchor-${variant}-focus`),
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <AnchorButton variant={variant} size="md">
            <AnchorButtonLabel>Default</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton id={`button-anchor-${variant}-hover`} variant={variant} size="md">
            <AnchorButtonLabel>Hover</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton id={`button-anchor-${variant}-focus`} variant={variant} size="md">
            <AnchorButtonLabel>Focus visible</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton variant={variant} size="md" disabled>
            <AnchorButtonLabel>Disabled</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton variant={variant} size="md" aria-disabled="true">
            <AnchorButtonLabel>Soft-disabled</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton variant={variant} size="md" aria-busy aria-disabled>
            <Spinner>
              <LoaderCircle />
            </Spinner>
            <AnchorButtonLabel>Busy</AnchorButtonLabel>
          </AnchorButton>
        </div>
      ))}
    </div>
  ),
};
