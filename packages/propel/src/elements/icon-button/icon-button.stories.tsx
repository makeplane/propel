import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle, Plus } from "lucide-react";

import type { ControlChromePair } from "../../internal/control-chrome";
import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";
import { iconControl } from "../../storybook/icon-control";
import {
  IconButton,
  type IconButtonMagnitude,
  type IconButtonProminence,
  type IconButtonTone,
} from "./index";

const PROMINENCES: IconButtonProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: IconButtonMagnitude[] = ["sm", "md", "lg", "xl"];

// Storybook ArgTypes flatten discriminant unions into independent controls — re-pair for the API.
const chrome = (prominence: IconButtonProminence, tone: IconButtonTone): ControlChromePair =>
  ({ prominence, tone }) as ControlChromePair;

const PALETTES = [
  { prominence: "primary", tone: "neutral" },
  { prominence: "secondary", tone: "neutral" },
  { prominence: "tertiary", tone: "neutral" },
  { prominence: "ghost", tone: "neutral" },
  { prominence: "primary", tone: "danger" },
  { prominence: "secondary", tone: "danger" },
] as const satisfies readonly ControlChromePair[];

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
    prominence: "primary",
    tone: "neutral",
    magnitude: "md",
    children: <Plus />,
    "aria-label": "Add item",
  },
  render: ({ children, prominence, tone, magnitude, ...rest }) => (
    <IconButton {...chrome(prominence, tone)} magnitude={magnitude} {...rest}>
      <Icon>{children}</Icon>
    </IconButton>
  ),
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Every Figma "Type" side by side. The neutral fills are `primary`/`secondary`/ `tertiary`/`ghost`;
 * the two Error types are the `danger` tone of `primary` (Error fill) and `secondary` (Error
 * outline) — see {@link Tones}.
 */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, "aria-label": { control: false } },
  render: ({ children, magnitude }) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <IconButton
          key={prominence}
          {...chrome(prominence, "neutral")}
          magnitude={magnitude}
          aria-label={`${prominence} action`}
        >
          <Icon>{children}</Icon>
        </IconButton>
      ))}
    </div>
  ),
};

/**
 * Tone selects the palette: `neutral` (default) or `danger` (Figma "Error"). Danger shows as a
 * solid fill (Error fill) and a bordered outline (Error outline).
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: ({ children, magnitude }) => (
    <div className="flex items-center gap-3">
      <IconButton prominence="primary" tone="neutral" magnitude={magnitude} aria-label="Neutral">
        <Icon>{children}</Icon>
      </IconButton>
      <IconButton prominence="primary" tone="danger" magnitude={magnitude} aria-label="Danger fill">
        <Icon>{children}</Icon>
      </IconButton>
      <IconButton
        prominence="secondary"
        tone="danger"
        magnitude={magnitude}
        aria-label="Danger outline"
      >
        <Icon>{children}</Icon>
      </IconButton>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, "aria-label": { control: false } },
  render: ({ children, prominence, tone }) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <IconButton
          key={magnitude}
          {...chrome(prominence, tone)}
          magnitude={magnitude}
          aria-label={`${magnitude} add`}
        >
          <Icon>{children}</Icon>
        </IconButton>
      ))}
    </div>
  ),
};

/**
 * Every visual state of every palette, pinned statically — one row per prominence×tone pairing the
 * chrome defines. Hover / active / focus-visible are CSS pseudo-classes, forced by the
 * pseudo-states addon; `disabled` is the native attribute the `disabled:` palette keys off; busy
 * pins the `aria-busy`/`aria-disabled` the ready-made IconButton sets while `loading` (the shared
 * `Spinner` swaps in for the glyph slot).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: PALETTES.map(({ prominence, tone }) => `#icon-button-${prominence}-${tone}-hover`),
      active: PALETTES.map(({ prominence, tone }) => `#icon-button-${prominence}-${tone}-active`),
      focusVisible: PALETTES.map(
        ({ prominence, tone }) => `#icon-button-${prominence}-${tone}-focus`,
      ),
    },
  },
  render: ({ children, magnitude }) => (
    <div className="flex flex-col gap-3">
      {PALETTES.map((palette) => (
        <div key={`${palette.prominence}-${palette.tone}`} className="flex items-center gap-3">
          <IconButton
            {...palette}
            magnitude={magnitude}
            aria-label={`${palette.prominence} ${palette.tone} default`}
          >
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            id={`icon-button-${palette.prominence}-${palette.tone}-hover`}
            {...palette}
            magnitude={magnitude}
            aria-label={`${palette.prominence} ${palette.tone} hover`}
          >
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            id={`icon-button-${palette.prominence}-${palette.tone}-active`}
            {...palette}
            magnitude={magnitude}
            aria-label={`${palette.prominence} ${palette.tone} active`}
          >
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            id={`icon-button-${palette.prominence}-${palette.tone}-focus`}
            {...palette}
            magnitude={magnitude}
            aria-label={`${palette.prominence} ${palette.tone} focus`}
          >
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            {...palette}
            magnitude={magnitude}
            aria-label={`${palette.prominence} ${palette.tone} disabled`}
            disabled
          >
            <Icon>{children}</Icon>
          </IconButton>
          <IconButton
            {...palette}
            magnitude={magnitude}
            aria-label={`${palette.prominence} ${palette.tone} busy`}
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
  render: ({ children, prominence, tone, magnitude }) => (
    <div className="flex items-center gap-3">
      <IconButton {...chrome(prominence, tone)} magnitude={magnitude} aria-label="Add item">
        <Icon>{children}</Icon>
      </IconButton>
      <IconButton
        {...chrome(prominence, tone)}
        magnitude={magnitude}
        aria-label="Saving"
        aria-busy
        aria-disabled
      >
        <Spinner>
          <LoaderCircle />
        </Spinner>
      </IconButton>
    </div>
  ),
};
