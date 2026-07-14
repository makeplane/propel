import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle, Plus } from "lucide-react";

import type { ControlChromePair } from "../../internal/control-chrome";
import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";
import {
  Button,
  ButtonLabel,
  type ButtonMagnitude,
  type ButtonProminence,
  type ButtonTone,
} from "./index";

const PROMINENCES: ButtonProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: ButtonMagnitude[] = ["sm", "md", "lg", "xl"];

// Storybook ArgTypes flatten discriminant unions into independent controls — re-pair for the API.
const chrome = (prominence: ButtonProminence, tone: ButtonTone): ControlChromePair =>
  ({ prominence, tone }) as ControlChromePair;

// Every valid prominence×tone pair (danger only on primary/secondary).
const PALETTES = [
  { prominence: "primary", tone: "neutral" },
  { prominence: "secondary", tone: "neutral" },
  { prominence: "tertiary", tone: "neutral" },
  { prominence: "ghost", tone: "neutral" },
  { prominence: "primary", tone: "danger" },
  { prominence: "secondary", tone: "danger" },
] as const satisfies readonly ControlChromePair[];

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
    prominence: "primary",
    tone: "neutral",
    magnitude: "md",
    sizing: "hug",
  },
  render: ({ children, prominence, tone, magnitude, sizing, ...rest }) => (
    <Button {...chrome(prominence, tone)} magnitude={magnitude} sizing={sizing} {...rest}>
      <ButtonLabel>{children}</ButtonLabel>
    </Button>
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every prominence (Figma "Type") side by side at the default magnitude. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: ({ magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <Button
          key={prominence}
          {...chrome(prominence, "neutral")}
          magnitude={magnitude}
          sizing={sizing}
        >
          <ButtonLabel>{prominence}</ButtonLabel>
        </Button>
      ))}
    </div>
  ),
};

/**
 * Tone selects the palette: `neutral` (default) or `danger` (Figma "Error"). Danger shows as a
 * solid fill and a bordered outline.
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: ({ magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      <Button tone="neutral" prominence="primary" magnitude={magnitude} sizing={sizing}>
        <ButtonLabel>Neutral</ButtonLabel>
      </Button>
      <Button tone="danger" prominence="primary" magnitude={magnitude} sizing={sizing}>
        <ButtonLabel>Danger fill</ButtonLabel>
      </Button>
      <Button tone="danger" prominence="secondary" magnitude={magnitude} sizing={sizing}>
        <ButtonLabel>Danger outline</ButtonLabel>
      </Button>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: ({ prominence, tone, sizing }) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Button key={magnitude} {...chrome(prominence, tone)} magnitude={magnitude} sizing={sizing}>
          <ButtonLabel>{magnitude}</ButtonLabel>
        </Button>
      ))}
    </div>
  ),
};

/** `sizing="fill"` fills the container (e.g. a form row or mobile CTA). */
export const Stretch: Story = {
  argTypes: { sizing: { control: false }, children: { control: false } },
  render: ({ prominence, tone, magnitude }) => (
    <div className="flex w-64 flex-col gap-2">
      <Button {...chrome(prominence, tone)} magnitude={magnitude} sizing="hug">
        <ButtonLabel>Auto width</ButtonLabel>
      </Button>
      <Button {...chrome(prominence, tone)} magnitude={magnitude} sizing="fill">
        <ButtonLabel>Full width</ButtonLabel>
      </Button>
    </div>
  ),
};

/**
 * Every visual state of every palette, pinned statically — one row per prominence×tone pairing the
 * chrome defines. Hover / active / focus-visible are CSS pseudo-classes, forced by the
 * pseudo-states addon; `disabled` is the native attribute the `disabled:` palette keys off; busy
 * pins the `aria-busy` the ready-made Button sets while `loading` (loading mutes via the root
 * chrome palette — label and spinner share the same weight).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: PALETTES.map(({ prominence, tone }) => `#button-${prominence}-${tone}-hover`),
      active: PALETTES.map(({ prominence, tone }) => `#button-${prominence}-${tone}-active`),
      focusVisible: PALETTES.map(({ prominence, tone }) => `#button-${prominence}-${tone}-focus`),
    },
  },
  render: ({ magnitude, sizing }) => (
    <div className="flex flex-col gap-3">
      {PALETTES.map((palette) => (
        <div key={`${palette.prominence}-${palette.tone}`} className="flex items-center gap-3">
          <Button {...palette} magnitude={magnitude} sizing={sizing}>
            <ButtonLabel>Default</ButtonLabel>
          </Button>
          <Button
            id={`button-${palette.prominence}-${palette.tone}-hover`}
            {...palette}
            magnitude={magnitude}
            sizing={sizing}
          >
            <ButtonLabel>Hover</ButtonLabel>
          </Button>
          <Button
            id={`button-${palette.prominence}-${palette.tone}-active`}
            {...palette}
            magnitude={magnitude}
            sizing={sizing}
          >
            <ButtonLabel>Active</ButtonLabel>
          </Button>
          <Button
            id={`button-${palette.prominence}-${palette.tone}-focus`}
            {...palette}
            magnitude={magnitude}
            sizing={sizing}
          >
            <ButtonLabel>Focus</ButtonLabel>
          </Button>
          <Button {...palette} magnitude={magnitude} sizing={sizing} disabled>
            <ButtonLabel>Disabled</ButtonLabel>
          </Button>
          <Button {...palette} magnitude={magnitude} sizing={sizing} aria-busy aria-disabled>
            <ButtonLabel>Busy</ButtonLabel>
            <Spinner>
              <LoaderCircle />
            </Spinner>
          </Button>
        </div>
      ))}
    </div>
  ),
};

/**
 * The atomic button is composed from named parts: the internal `Icon` sizes a decorative
 * leading/trailing node to the button's `--node-size`, `ButtonLabel` holds the text, and the
 * internal `Spinner` is the loading indicator (trailing, after the label). The busy state is pinned
 * here via the `aria-busy`/`aria-disabled` the ready-made Button (Components/Button) sets while
 * `loading` — that ready-made also lays these parts out for you and adds the soft-disabled
 * behavior.
 */
export const Anatomy: Story = {
  args: { children: undefined },
  argTypes: { children: { control: false } },
  render: ({ prominence, tone, magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      <Button {...chrome(prominence, tone)} magnitude={magnitude} sizing={sizing}>
        <Icon>
          <Plus />
        </Icon>
        <ButtonLabel>With icon</ButtonLabel>
      </Button>
      <Button
        {...chrome(prominence, tone)}
        magnitude={magnitude}
        sizing={sizing}
        aria-busy
        aria-disabled
      >
        <ButtonLabel>Loading</ButtonLabel>
        <Spinner>
          <LoaderCircle />
        </Spinner>
      </Button>
    </div>
  ),
};
