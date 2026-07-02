import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  History,
  Image,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import {
  Toolbar,
  ToolbarButton,
  type ToolbarDensity,
  type ToolbarElevation,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarMenuTriggerButton,
  ToolbarMenuTriggerIndicator,
  ToolbarMenuTriggerLabel,
  ToolbarSeparator,
  ToolbarToggleGroup,
} from "./index";

const ELEVATIONS: ToolbarElevation[] = ["raised", "flat"];
const DENSITIES: ToolbarDensity[] = ["compact", "comfortable"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with every visual state pinned statically via the `data-*`/aria
// attributes Base UI's toolbar/toggle/menu would set (`data-pressed=""` + `aria-pressed`,
// `data-popup-open=""` + `aria-expanded`, `data-invalid=""`) or the native `disabled` attribute,
// and the roles Base UI's behavior parts would render (`role="toolbar"`, `role="group"`,
// `role="separator"`) pinned so the static markup reads like the real thing. Every control takes
// `density` explicitly; the ready-made `components/toolbar` sets it once and shares it via
// context. Grafting, roving focus, keyboard, and aria behavior are demonstrated AND tested in the
// components-tier story (Components/Toolbar).
const meta = {
  title: "Elements/Toolbar",
  component: Toolbar,
  subcomponents: {
    ToolbarGroup,
    ToolbarButton,
    ToolbarLink,
    ToolbarInput,
    ToolbarToggleGroup,
    ToolbarSeparator,
    ToolbarMenuTriggerButton,
    ToolbarMenuTriggerLabel,
    ToolbarMenuTriggerIndicator,
  },
  args: { elevation: "raised", density: "compact" },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: the `Toolbar` row holding a menu-trigger surface
 * (`ToolbarMenuTriggerButton` pairing a `ToolbarMenuTriggerLabel` with a chevron in the
 * `ToolbarMenuTriggerIndicator`), a `ToolbarGroup` clustering the B/I/U/S toggles, a
 * `ToolbarToggleGroup` for the exclusive alignment cluster, plain action `ToolbarButton`s, and a
 * `ToolbarLink` — the `<a>` wearing the same item chrome. Bold and Align-left pin `data-pressed=""`
 * (+ `aria-pressed`), the attributes Base UI's `Toggle` sets while pressed.
 */
export const Default: Story = {
  render: ({ elevation, density }) => (
    <Toolbar role="toolbar" aria-label="Formatting" elevation={elevation} density={density}>
      <ToolbarMenuTriggerButton
        density={density}
        aria-haspopup="menu"
        aria-expanded={false}
        aria-label="Text style"
      >
        <ToolbarMenuTriggerLabel>Text</ToolbarMenuTriggerLabel>
        <ToolbarMenuTriggerIndicator>
          <ChevronDown />
        </ToolbarMenuTriggerIndicator>
      </ToolbarMenuTriggerButton>
      <ToolbarSeparator role="separator" aria-orientation="vertical" />
      <ToolbarGroup role="group" aria-label="Text formatting">
        <ToolbarButton density={density} aria-label="Bold" aria-pressed data-pressed="">
          <Icon>
            <Bold />
          </Icon>
        </ToolbarButton>
        <ToolbarButton density={density} aria-label="Italic" aria-pressed={false}>
          <Icon>
            <Italic />
          </Icon>
        </ToolbarButton>
        <ToolbarButton density={density} aria-label="Underline" aria-pressed={false}>
          <Icon>
            <Underline />
          </Icon>
        </ToolbarButton>
        <ToolbarButton density={density} aria-label="Strikethrough" aria-pressed={false}>
          <Icon>
            <Strikethrough />
          </Icon>
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator role="separator" aria-orientation="vertical" />
      <ToolbarToggleGroup role="group" aria-label="Text alignment">
        <ToolbarButton density={density} aria-label="Align left" aria-pressed data-pressed="">
          <Icon>
            <AlignLeft />
          </Icon>
        </ToolbarButton>
        <ToolbarButton density={density} aria-label="Align center" aria-pressed={false}>
          <Icon>
            <AlignCenter />
          </Icon>
        </ToolbarButton>
        <ToolbarButton density={density} aria-label="Align right" aria-pressed={false}>
          <Icon>
            <AlignRight />
          </Icon>
        </ToolbarButton>
      </ToolbarToggleGroup>
      <ToolbarSeparator role="separator" aria-orientation="vertical" />
      <ToolbarButton density={density} aria-label="Insert link">
        <Icon>
          <Link />
        </Icon>
      </ToolbarButton>
      <ToolbarButton density={density} aria-label="Insert image">
        <Icon>
          <Image />
        </Icon>
      </ToolbarButton>
      <ToolbarSeparator role="separator" aria-orientation="vertical" />
      <ToolbarLink density={density} href="#history" aria-label="View edit history">
        <Icon>
          <History />
        </Icon>
      </ToolbarLink>
    </Toolbar>
  ),
};

/**
 * The `elevation` axis: `raised` draws its own card (border + shadow via the shared raised surface)
 * so it can float over content; `flat` draws no surface and sits flush inside an existing bar.
 * Independent of `density` — both rows keep the story's current density.
 */
export const Elevations: Story = {
  argTypes: { elevation: { control: false } },
  render: ({ density }) => (
    <div className="flex flex-col gap-6">
      {ELEVATIONS.map((elevation) => (
        <Toolbar
          key={elevation}
          role="toolbar"
          aria-label={`Formatting (${elevation})`}
          elevation={elevation}
          density={density}
        >
          <ToolbarMenuTriggerButton
            density={density}
            aria-haspopup="menu"
            aria-expanded={false}
            aria-label="Text style"
          >
            <ToolbarMenuTriggerLabel>Text</ToolbarMenuTriggerLabel>
            <ToolbarMenuTriggerIndicator>
              <ChevronDown />
            </ToolbarMenuTriggerIndicator>
          </ToolbarMenuTriggerButton>
          <ToolbarSeparator role="separator" aria-orientation="vertical" />
          <ToolbarGroup role="group" aria-label="Text formatting">
            <ToolbarButton density={density} aria-label="Bold" aria-pressed data-pressed="">
              <Icon>
                <Bold />
              </Icon>
            </ToolbarButton>
            <ToolbarButton density={density} aria-label="Italic" aria-pressed={false}>
              <Icon>
                <Italic />
              </Icon>
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator role="separator" aria-orientation="vertical" />
          <ToolbarButton density={density} aria-label="Insert link">
            <Icon>
              <Link />
            </Icon>
          </ToolbarButton>
        </Toolbar>
      ))}
    </div>
  ),
};

/**
 * The `density` axis packs every density-aware control together: `compact` gives 24px hit targets
 * (h-6 trigger/input, size-6 items with a 14px glyph), `comfortable` 28px (16px glyph). The inline
 * `ToolbarInput` — a miniature field on the shared control surface — tracks the same scale.
 * Independent of `elevation` — both rows keep the story's current elevation.
 */
export const Densities: Story = {
  argTypes: { density: { control: false } },
  render: ({ elevation }) => (
    <div className="flex flex-col gap-6">
      {DENSITIES.map((density) => (
        <Toolbar
          key={density}
          role="toolbar"
          aria-label={`Formatting (${density})`}
          elevation={elevation}
          density={density}
        >
          <ToolbarInput
            density={density}
            aria-label={`Filter (${density})`}
            placeholder={density}
          />
          <ToolbarSeparator role="separator" aria-orientation="vertical" />
          <ToolbarMenuTriggerButton
            density={density}
            aria-haspopup="menu"
            aria-expanded={false}
            aria-label="Text style"
          >
            <ToolbarMenuTriggerLabel>Text</ToolbarMenuTriggerLabel>
            <ToolbarMenuTriggerIndicator>
              <ChevronDown />
            </ToolbarMenuTriggerIndicator>
          </ToolbarMenuTriggerButton>
          <ToolbarSeparator role="separator" aria-orientation="vertical" />
          <ToolbarGroup role="group" aria-label="Text formatting">
            <ToolbarButton density={density} aria-label="Bold" aria-pressed={false}>
              <Icon>
                <Bold />
              </Icon>
            </ToolbarButton>
            <ToolbarButton density={density} aria-label="Italic" aria-pressed={false}>
              <Icon>
                <Italic />
              </Icon>
            </ToolbarButton>
          </ToolbarGroup>
        </Toolbar>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state of the density-aware controls, one flat bar per part:
 *
 * - **Item** (`ToolbarButton`) — rest; hover / active / focus-visible (CSS pseudo-classes, forced by
 *   the pseudo-states addon); pressed pins the `data-pressed=""` (+ `aria-pressed`) Base UI's
 *   `Toggle` sets while on (selected layer + accent glyph); disabled is the native attribute the
 *   `disabled:` selector keys off.
 * - **Menu trigger** — rest; open pins the `data-popup-open=""` (+ `aria-expanded`) Base UI's
 *   `Menu.Trigger` sets while its popup is open (selected layer); disabled dims the label.
 * - **Input** — rest; focused (`:focus`, forced) lights the accent border + soft ring; invalid pins
 *   the `data-invalid=""` (+ `aria-invalid`) Base UI's `Field.Root` would propagate (danger
 *   border); disabled flattens to the not-allowed cursor and dimmed text.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#toolbar-item-hover"],
      active: ["#toolbar-item-active"],
      focusVisible: ["#toolbar-item-focus"],
      focus: ["#toolbar-input-focus"],
    },
  },
  render: ({ density }) => (
    <div className="flex flex-col items-start gap-4">
      <Toolbar role="toolbar" aria-label="Item states" elevation="flat" density={density}>
        <ToolbarButton id="toolbar-item-rest" density={density} aria-label="Rest">
          <Icon>
            <Bold />
          </Icon>
        </ToolbarButton>
        <ToolbarButton id="toolbar-item-hover" density={density} aria-label="Hover">
          <Icon>
            <Bold />
          </Icon>
        </ToolbarButton>
        <ToolbarButton id="toolbar-item-active" density={density} aria-label="Active">
          <Icon>
            <Bold />
          </Icon>
        </ToolbarButton>
        <ToolbarButton id="toolbar-item-focus" density={density} aria-label="Focused">
          <Icon>
            <Bold />
          </Icon>
        </ToolbarButton>
        <ToolbarButton
          id="toolbar-item-pressed"
          density={density}
          aria-label="Pressed"
          aria-pressed
          data-pressed=""
        >
          <Icon>
            <Bold />
          </Icon>
        </ToolbarButton>
        <ToolbarButton density={density} aria-label="Disabled" disabled>
          <Icon>
            <Bold />
          </Icon>
        </ToolbarButton>
      </Toolbar>
      <Toolbar role="toolbar" aria-label="Menu trigger states" elevation="flat" density={density}>
        <ToolbarMenuTriggerButton
          id="toolbar-trigger-rest"
          density={density}
          aria-haspopup="menu"
          aria-expanded={false}
        >
          <ToolbarMenuTriggerLabel>Rest</ToolbarMenuTriggerLabel>
          <ToolbarMenuTriggerIndicator>
            <ChevronDown />
          </ToolbarMenuTriggerIndicator>
        </ToolbarMenuTriggerButton>
        <ToolbarMenuTriggerButton
          id="toolbar-trigger-open"
          density={density}
          aria-haspopup="menu"
          aria-expanded
          data-popup-open=""
        >
          <ToolbarMenuTriggerLabel>Open</ToolbarMenuTriggerLabel>
          <ToolbarMenuTriggerIndicator>
            <ChevronDown />
          </ToolbarMenuTriggerIndicator>
        </ToolbarMenuTriggerButton>
        <ToolbarMenuTriggerButton
          density={density}
          aria-haspopup="menu"
          aria-expanded={false}
          disabled
        >
          <ToolbarMenuTriggerLabel>Disabled</ToolbarMenuTriggerLabel>
          <ToolbarMenuTriggerIndicator>
            <ChevronDown />
          </ToolbarMenuTriggerIndicator>
        </ToolbarMenuTriggerButton>
      </Toolbar>
      <Toolbar role="toolbar" aria-label="Input states" elevation="flat" density={density}>
        <ToolbarInput density={density} aria-label="Rest" placeholder="Rest" />
        <ToolbarInput
          id="toolbar-input-focus"
          density={density}
          aria-label="Focused"
          placeholder="Focused"
        />
        <ToolbarInput
          density={density}
          aria-label="Invalid"
          placeholder="Invalid"
          aria-invalid
          data-invalid=""
        />
        <ToolbarInput density={density} aria-label="Disabled" placeholder="Disabled" disabled />
      </Toolbar>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the pressed
 * item's glyph tint (`data-pressed:text-icon-accent-primary`) and the open trigger's background
 * (`data-popup-open:bg-layer-transparent-selected`) compute away from their resting siblings'.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const style = (id: string, property: "color" | "backgroundColor") => {
      const node = canvasElement.querySelector(`#${id}`);
      if (!(node instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(node)[property];
    };
    await expect(style("toolbar-item-pressed", "color")).not.toBe(
      style("toolbar-item-rest", "color"),
    );
    await expect(style("toolbar-trigger-open", "backgroundColor")).not.toBe(
      style("toolbar-trigger-rest", "backgroundColor"),
    );
  },
};
