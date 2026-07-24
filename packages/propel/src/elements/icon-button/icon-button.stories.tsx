import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle, Plus } from "lucide-react";

import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";
import { iconControl } from "../../storybook/icon-control";
import { IconButton, type IconButtonSize, type IconButtonVariant } from "./index";

// Every variant (danger only exists as the filled `danger` and the bordered `danger-outline`).
const VARIANTS: IconButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "danger-outline",
];
const SIZES: IconButtonSize[] = ["sm", "md", "lg", "xl"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. `IconButton` is a Base-UI-agnostic
// styled square `<button>` rendered DIRECTLY — no Base UI graft — wrapping the shared internal `Icon`
// glyph slot, with every visual axis shown and every visual state pinned statically via the
// attributes its cva keys off (`disabled`, `aria-busy`) or forced by the pseudo-states addon
// (hover/active/focus-visible are CSS pseudo-classes). Grafting, keyboard, and aria behavior are
// demonstrated AND tested in the ready-made IconButton (Components/IconButton), which composes this
// primitive.
const meta = {
  title: "Elements/IconButton",
  component: IconButton,
  // Icon picker control for the single glyph rendered inside the slot.
  argTypes: { children: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1720-3036",
    },
  },
  args: {
    variant: "primary",
    size: "md",
    children: <Plus />,
    "aria-label": "Add item",
  },
  render: ({ children, variant, size, ...rest }) => (
    <IconButton variant={variant} size={size} {...rest}>
      <Icon>{children}</Icon>
    </IconButton>
  ),
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Every variant side by side: the four neutral Figma "Types" (`primary`/`secondary`/`tertiary`/
 * `ghost`) plus the two Error palettes — the filled `danger` (Error fill) and the bordered
 * `danger-outline` (Error outline).
 */
export const Variants: Story = {
  argTypes: { variant: { control: false }, "aria-label": { control: false } },
  render: ({ children, size }) => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((variant) => (
        <IconButton key={variant} variant={variant} size={size} aria-label={`${variant} action`}>
          <Icon>{children}</Icon>
        </IconButton>
      ))}
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Sizes: Story = {
  argTypes: { size: { control: false }, "aria-label": { control: false } },
  render: ({ children, variant }) => (
    <div className="flex items-center gap-3">
      {SIZES.map((size) => (
        <IconButton key={size} variant={variant} size={size} aria-label={`${size} add`}>
          <Icon>{children}</Icon>
        </IconButton>
      ))}
    </div>
  ),
};

/**
 * Every visual state of every variant, pinned statically — one row per variant the chrome defines.
 * Hover / active / focus-visible are CSS pseudo-classes, forced by the pseudo-states addon;
 * `disabled` is the native attribute the `disabled:` palette keys off; busy pins the
 * `aria-busy`/`aria-disabled` the ready-made IconButton sets while `loading` (the shared `Spinner`
 * swaps in for the glyph slot).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: VARIANTS.map((variant) => `#icon-button-${variant}-hover`),
      active: VARIANTS.map((variant) => `#icon-button-${variant}-active`),
      focusVisible: VARIANTS.map((variant) => `#icon-button-${variant}-focus`),
    },
  },
  render: ({ children, size }) => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <IconButton variant={variant} size={size} aria-label={`${variant} default`}>
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            id={`icon-button-${variant}-hover`}
            variant={variant}
            size={size}
            aria-label={`${variant} hover`}
          >
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            id={`icon-button-${variant}-active`}
            variant={variant}
            size={size}
            aria-label={`${variant} active`}
          >
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            id={`icon-button-${variant}-focus`}
            variant={variant}
            size={size}
            aria-label={`${variant} focus`}
          >
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton variant={variant} size={size} aria-label={`${variant} disabled`} disabled>
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            variant={variant}
            size={size}
            aria-label={`${variant} busy`}
            aria-busy
            aria-disabled
          >
            <Spinner>
              <LoaderCircle />
            </Spinner>
          </IconButton>
        </div>
      ))}
    </div>
  ),
};

/**
 * The icon button is composed from named parts: the square `IconButton` box holding ONE glyph slot
 * — the internal `Icon` sizing the decorative glyph to the box's `--node-size`, or the internal
 * `Spinner` swapped in while loading. The busy state is pinned here via the
 * `aria-busy`/`aria-disabled` the ready-made IconButton (Components/IconButton) sets while
 * `loading` — that ready-made also does the swap for you.
 */
export const Anatomy: Story = {
  parameters: { controls: { disable: true } },
  render: ({ children, variant, size }) => (
    <div className="flex items-center gap-3">
      <IconButton variant={variant} size={size} aria-label="Add item">
        <Icon>{children}</Icon>
      </IconButton>
      <IconButton variant={variant} size={size} aria-label="Saving" aria-busy aria-disabled>
        <Spinner>
          <LoaderCircle />
        </Spinner>
      </IconButton>
    </div>
  ),
};
