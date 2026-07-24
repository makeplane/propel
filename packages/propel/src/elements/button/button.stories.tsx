import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle, Plus } from "lucide-react";

import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";
import { Button, ButtonLabel, type ButtonSize, type ButtonVariant } from "./index";

// Every variant (danger only exists as the filled `danger` and the bordered `danger-outline`).
const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "danger-outline",
];
const SIZES: ButtonSize[] = ["sm", "md", "lg", "xl"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. `Button` is a Base-UI-agnostic
// styled `<button>` rendered DIRECTLY — no Base UI graft — with every visual axis shown and every
// visual state pinned statically via the attributes its cva keys off (`disabled`, `aria-busy`) or
// forced by the pseudo-states addon (hover/active/focus-visible are CSS pseudo-classes). Grafting,
// keyboard, and aria behavior are demonstrated AND tested in the ready-made Button
// (Components/Button), which composes this primitive.
const meta = {
  title: "Elements/Button",
  component: Button,
  // The button's anatomy parts; the ready-made Button (Components/Button) composes them.
  subcomponents: { ButtonLabel },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    fillType: "hug",
  },
  render: ({ children, variant, size, fillType, ...rest }) => (
    <Button variant={variant} size={size} fillType={fillType} {...rest}>
      <ButtonLabel>{children}</ButtonLabel>
    </Button>
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every variant — the four Figma Types plus the two danger palettes — at the default size. */
export const Variants: Story = {
  argTypes: { variant: { control: false }, children: { control: false } },
  render: ({ size, fillType }) => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant} size={size} fillType={fillType}>
          <ButtonLabel>{variant}</ButtonLabel>
        </Button>
      ))}
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Sizes: Story = {
  argTypes: { size: { control: false }, children: { control: false } },
  render: ({ variant, fillType }) => (
    <div className="flex items-center gap-3">
      {SIZES.map((size) => (
        <Button key={size} variant={variant} size={size} fillType={fillType}>
          <ButtonLabel>{size}</ButtonLabel>
        </Button>
      ))}
    </div>
  ),
};

/** `fillType="fill"` fills the container (e.g. a form row or mobile CTA). */
export const Stretch: Story = {
  argTypes: { fillType: { control: false }, children: { control: false } },
  render: ({ variant, size }) => (
    <div className="flex w-64 flex-col gap-2">
      <Button variant={variant} size={size} fillType="hug">
        <ButtonLabel>Auto width</ButtonLabel>
      </Button>
      <Button variant={variant} size={size} fillType="fill">
        <ButtonLabel>Full width</ButtonLabel>
      </Button>
    </div>
  ),
};

/**
 * Every visual state of every variant, pinned statically — one row per variant the chrome defines.
 * Hover / active / focus-visible are CSS pseudo-classes, forced by the pseudo-states addon;
 * `disabled` is the native attribute the `disabled:` palette keys off; busy pins the
 * `aria-busy`/`aria-disabled` the ready-made Button sets while `loading` (loading mutes via the
 * root chrome palette — label and spinner share the same weight).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: VARIANTS.map((variant) => `#button-${variant}-hover`),
      active: VARIANTS.map((variant) => `#button-${variant}-active`),
      focusVisible: VARIANTS.map((variant) => `#button-${variant}-focus`),
    },
  },
  render: ({ size, fillType }) => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <Button variant={variant} size={size} fillType={fillType}>
            <ButtonLabel>Default</ButtonLabel>
          </Button>
          <Button id={`button-${variant}-hover`} variant={variant} size={size} fillType={fillType}>
            <ButtonLabel>Hover</ButtonLabel>
          </Button>
          <Button id={`button-${variant}-active`} variant={variant} size={size} fillType={fillType}>
            <ButtonLabel>Active</ButtonLabel>
          </Button>
          <Button id={`button-${variant}-focus`} variant={variant} size={size} fillType={fillType}>
            <ButtonLabel>Focus</ButtonLabel>
          </Button>
          <Button variant={variant} size={size} fillType={fillType} disabled>
            <ButtonLabel>Disabled</ButtonLabel>
          </Button>
          <Button variant={variant} size={size} fillType={fillType} aria-busy aria-disabled>
            <Spinner>
              <LoaderCircle />
            </Spinner>
            <ButtonLabel>Busy</ButtonLabel>
          </Button>
        </div>
      ))}
    </div>
  ),
};

/**
 * The atomic button is composed from named parts: the internal `Icon` sizes a decorative
 * leading/trailing node to the button's `--node-size`, `ButtonLabel` holds the text, and the
 * internal `Spinner` is the loading indicator (it takes the icon slot — leading by default). The
 * busy state is pinned here via the `aria-busy`/`aria-disabled` the ready-made Button
 * (Components/Button) sets while `loading` — that ready-made also lays these parts out for you and
 * adds the soft-disabled behavior.
 */
export const Anatomy: Story = {
  args: { children: undefined },
  argTypes: { children: { control: false } },
  render: ({ variant, size, fillType }) => (
    <div className="flex items-center gap-3">
      <Button variant={variant} size={size} fillType={fillType}>
        <Icon>
          <Plus />
        </Icon>
        <ButtonLabel>With icon</ButtonLabel>
      </Button>
      <Button variant={variant} size={size} fillType={fillType} aria-busy aria-disabled>
        <Spinner>
          <LoaderCircle />
        </Spinner>
        <ButtonLabel>Loading</ButtonLabel>
      </Button>
    </div>
  ),
};
