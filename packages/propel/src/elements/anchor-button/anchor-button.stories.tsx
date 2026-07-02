import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, LoaderCircle, Plus } from "lucide-react";

import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";
import {
  AnchorButton,
  AnchorButtonLabel,
  type AnchorButtonMagnitude,
  type AnchorButtonProminence,
  type AnchorButtonTone,
} from "./index";

const PROMINENCES: AnchorButtonProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: AnchorButtonMagnitude[] = ["sm", "md", "lg", "xl"];

// The prominence×tone pairings the control chrome defines a palette for (danger skips
// tertiary/ghost).
const PALETTES: { prominence: AnchorButtonProminence; tone: AnchorButtonTone }[] = [
  { prominence: "primary", tone: "neutral" },
  { prominence: "secondary", tone: "neutral" },
  { prominence: "tertiary", tone: "neutral" },
  { prominence: "ghost", tone: "neutral" },
  { prominence: "primary", tone: "danger" },
  { prominence: "secondary", tone: "danger" },
];

// elements-tier story (rule 2b): a pure UI-configuration showcase. `AnchorButton` is a
// Base-UI-agnostic styled `<a>` wearing the shared control chrome — rendered DIRECTLY, with every
// visual axis (`prominence`/`tone`/`magnitude`/`sizing`) shown and every visual state pinned
// statically: hover/active/focus-visible via the pseudo-states addon, busy via the `aria-busy` the
// chrome keys off (`aria-busy:cursor-default`). A link is never `disabled` — that palette exists
// only on `<button>` surfaces. Behavior (href passthrough, `loading`) is demonstrated AND tested in
// the ready-made AnchorButton (Components/AnchorButton), which lays out its icon/label slots.
const meta = {
  title: "Elements/AnchorButton",
  component: AnchorButton,
  // The anchor-button's anatomy parts; the ready-made AnchorButton (Components/AnchorButton)
  // composes them.
  subcomponents: { AnchorButtonLabel },
  args: {
    children: "Link",
    href: "#",
    prominence: "primary",
    tone: "neutral",
    magnitude: "md",
    sizing: "hug",
  },
  render: ({ children, ...props }) => (
    <AnchorButton {...props}>
      <AnchorButtonLabel>{children}</AnchorButtonLabel>
    </AnchorButton>
  ),
} satisfies Meta<typeof AnchorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every prominence (Figma "Type") side by side at the default magnitude. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: ({ href, tone, magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <AnchorButton
          key={prominence}
          href={href}
          prominence={prominence}
          tone={tone}
          magnitude={magnitude}
          sizing={sizing}
        >
          <AnchorButtonLabel>{prominence}</AnchorButtonLabel>
        </AnchorButton>
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
  render: ({ href, magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      <AnchorButton
        href={href}
        tone="neutral"
        prominence="primary"
        magnitude={magnitude}
        sizing={sizing}
      >
        <AnchorButtonLabel>Neutral</AnchorButtonLabel>
      </AnchorButton>
      <AnchorButton
        href={href}
        tone="danger"
        prominence="primary"
        magnitude={magnitude}
        sizing={sizing}
      >
        <AnchorButtonLabel>Danger fill</AnchorButtonLabel>
      </AnchorButton>
      <AnchorButton
        href={href}
        tone="danger"
        prominence="secondary"
        magnitude={magnitude}
        sizing={sizing}
      >
        <AnchorButtonLabel>Danger outline</AnchorButtonLabel>
      </AnchorButton>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: ({ href, prominence, tone, sizing }) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <AnchorButton
          key={magnitude}
          href={href}
          prominence={prominence}
          tone={tone}
          magnitude={magnitude}
          sizing={sizing}
        >
          <AnchorButtonLabel>{magnitude}</AnchorButtonLabel>
        </AnchorButton>
      ))}
    </div>
  ),
};

/** `sizing="fill"` fills the container (e.g. a form row or mobile CTA). */
export const Stretch: Story = {
  argTypes: { sizing: { control: false }, children: { control: false } },
  render: ({ href, prominence, tone, magnitude }) => (
    <div className="flex w-64 flex-col gap-2">
      <AnchorButton
        href={href}
        prominence={prominence}
        tone={tone}
        magnitude={magnitude}
        sizing="hug"
      >
        <AnchorButtonLabel>Auto width</AnchorButtonLabel>
      </AnchorButton>
      <AnchorButton
        href={href}
        prominence={prominence}
        tone={tone}
        magnitude={magnitude}
        sizing="fill"
      >
        <AnchorButtonLabel>Full width</AnchorButtonLabel>
      </AnchorButton>
    </div>
  ),
};

/**
 * Every visual state of every palette, pinned statically — one row per prominence×tone pairing the
 * chrome defines. Hover / active / focus-visible are CSS pseudo-classes, forced by the
 * pseudo-states addon; busy pins the `aria-busy` the ready-made AnchorButton sets while `loading`
 * (the chrome keys `aria-busy:cursor-default` off it; the label stays at full contrast — a pending
 * link is not disabled, the spinner is the cue). There is no disabled row: `<a>` has no native
 * `disabled`, so the chrome's `disabled:` palette never fires on a link.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: PALETTES.map(({ prominence, tone }) => `#anchor-button-${prominence}-${tone}-hover`),
      active: PALETTES.map(({ prominence, tone }) => `#anchor-button-${prominence}-${tone}-active`),
      focusVisible: PALETTES.map(
        ({ prominence, tone }) => `#anchor-button-${prominence}-${tone}-focus`,
      ),
    },
  },
  render: ({ href, magnitude, sizing }) => (
    <div className="flex flex-col gap-3">
      {PALETTES.map(({ prominence, tone }) => (
        <div key={`${prominence}-${tone}`} className="flex items-center gap-3">
          <AnchorButton
            href={href}
            prominence={prominence}
            tone={tone}
            magnitude={magnitude}
            sizing={sizing}
          >
            <AnchorButtonLabel>Default</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton
            id={`anchor-button-${prominence}-${tone}-hover`}
            href={href}
            prominence={prominence}
            tone={tone}
            magnitude={magnitude}
            sizing={sizing}
          >
            <AnchorButtonLabel>Hover</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton
            id={`anchor-button-${prominence}-${tone}-active`}
            href={href}
            prominence={prominence}
            tone={tone}
            magnitude={magnitude}
            sizing={sizing}
          >
            <AnchorButtonLabel>Active</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton
            id={`anchor-button-${prominence}-${tone}-focus`}
            href={href}
            prominence={prominence}
            tone={tone}
            magnitude={magnitude}
            sizing={sizing}
          >
            <AnchorButtonLabel>Focus</AnchorButtonLabel>
          </AnchorButton>
          <AnchorButton
            href={href}
            prominence={prominence}
            tone={tone}
            magnitude={magnitude}
            sizing={sizing}
            aria-busy
          >
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

/**
 * Composed by hand from named parts: the internal `Icon` sizes a decorative node to `--node-size`,
 * `AnchorButtonLabel` holds the text, and the internal `Spinner` is the pending-navigation cue. The
 * busy link pins `aria-busy` statically — the attribute the chrome keys off
 * (`aria-busy:cursor-default`); a link is never disabled, the spinner is the pending cue. The
 * ready-made AnchorButton (Components/AnchorButton) lays these out for you.
 */
export const Anatomy: Story = {
  args: { children: undefined },
  argTypes: { children: { control: false } },
  render: ({ href, prominence, tone, magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      <AnchorButton
        href={href}
        prominence={prominence}
        tone={tone}
        magnitude={magnitude}
        sizing={sizing}
      >
        <Icon>
          <Plus />
        </Icon>
        <AnchorButtonLabel>With icon</AnchorButtonLabel>
      </AnchorButton>
      <AnchorButton
        href={href}
        prominence="secondary"
        tone={tone}
        magnitude={magnitude}
        sizing={sizing}
      >
        <AnchorButtonLabel>Learn more</AnchorButtonLabel>
        <Icon>
          <ArrowRight />
        </Icon>
      </AnchorButton>
      <AnchorButton
        href={href}
        prominence={prominence}
        tone={tone}
        magnitude={magnitude}
        sizing={sizing}
        aria-busy
      >
        <Spinner>
          <LoaderCircle />
        </Spinner>
        <AnchorButtonLabel>Loading</AnchorButtonLabel>
      </AnchorButton>
    </div>
  ),
};
