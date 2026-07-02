import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListChecks,
  ListOrdered,
  MessageSquare,
  Pilcrow,
  Quote,
  Strikethrough,
  Table,
  Underline,
} from "lucide-react";
import type * as React from "react";
import { expect } from "storybook/test";

import { Menu, MenuContent, MenuItem, MenuSeparator } from "../menu";
import {
  Toolbar,
  ToolbarInput,
  ToolbarButton,
  ToolbarMenuTrigger,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
  ToolbarToggleGroup,
} from "./index";

const TEXT_STYLES = ["Paragraph", "Heading 1", "Heading 2", "Heading 3"];
const FONTS = ["Sans", "Serif", "Mono"];

// A representative rich-text formatting toolbar: a Text/Aa style picker, an inline
// B/I/U/S cluster, an alignment toggle-group, and link/image buttons.
function FormattingToolbar(args: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar {...args}>
      <Menu>
        <ToolbarMenuTrigger aria-label="Text style">Text</ToolbarMenuTrigger>
        <MenuContent>
          {TEXT_STYLES.map((style) => (
            <MenuItem key={style}>{style}</MenuItem>
          ))}
        </MenuContent>
      </Menu>
      <Menu>
        <ToolbarMenuTrigger aria-label="Font">Aa</ToolbarMenuTrigger>
        <MenuContent>
          {FONTS.map((font) => (
            <MenuItem key={font}>{font}</MenuItem>
          ))}
        </MenuContent>
      </Menu>
      <ToolbarButton aria-label="Comment">
        <MessageSquare />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold">
          <Bold />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Italic">
          <Italic />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Underline">
          <Underline />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Strikethrough">
          <Strikethrough />
        </ToolbarToggle>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup defaultValue={["left"]} aria-label="Text alignment">
        <ToolbarToggle value="left" aria-label="Align left">
          <AlignLeft />
        </ToolbarToggle>
        <ToolbarToggle value="center" aria-label="Align center">
          <AlignCenter />
        </ToolbarToggle>
        <ToolbarToggle value="right" aria-label="Align right">
          <AlignRight />
        </ToolbarToggle>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Lists">
        <ToolbarToggle aria-label="Bullet list">
          <List />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Numbered list">
          <ListOrdered />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Checklist">
          <ListChecks />
        </ToolbarToggle>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Blocks">
        <ToolbarToggle aria-label="Quote">
          <Quote />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Code block">
          <Code />
        </ToolbarToggle>
        <ToolbarButton aria-label="Insert table">
          <Table />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Insert link">
        <Link />
      </ToolbarButton>
      <ToolbarButton aria-label="Insert image">
        <Image />
      </ToolbarButton>
    </Toolbar>
  );
}

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  // Toolbar is a compound component: document its parts alongside it so the args
  // table gets a tab per part and the manifest records the relationship.
  subcomponents: {
    ToolbarInput,
    ToolbarGroup,
    ToolbarButton,
    ToolbarToggle,
    ToolbarToggleGroup,
    ToolbarSeparator,
    Menu,
    ToolbarMenuTrigger,
    MenuContent,
    MenuItem,
    MenuSeparator,
  },
  args: { elevation: "raised", density: "compact" },
  render: (args) => <FormattingToolbar {...args} />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1166-12213",
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default: a `raised`, `compact` floater — a self-contained card with a border + shadow. */
export const Default: Story = {};

/**
 * The `elevation` axis: `raised` draws its own card (border + shadow) so it can hover over content;
 * `flat` draws no surface and sits flush inside an existing bar. Independent of `density` — both
 * rows keep the story's current density.
 */
export const Elevations: Story = {
  argTypes: { elevation: { control: false } },
  render: (args) => (
    <div className="flex flex-col gap-6">
      <FormattingToolbar {...args} elevation="raised" />
      <FormattingToolbar {...args} elevation="flat" />
    </div>
  ),
};

/**
 * The `density` axis: `compact` packs the controls to 24px hit targets, `comfortable` gives them
 * 28px. Independent of `elevation` — both rows keep the story's current elevation.
 */
export const Densities: Story = {
  argTypes: { density: { control: false } },
  render: (args) => (
    <div className="flex flex-col gap-6">
      <FormattingToolbar {...args} density="compact" />
      <FormattingToolbar {...args} density="comfortable" />
    </div>
  ),
};

/**
 * `elevation` and `density` are orthogonal: a `flat` bar can still be `compact`. This is Figma's
 * "fixed + compact" bar — a non-floating surface at the tight 24px density the raised floater also
 * uses.
 */
export const FlatCompact: Story = {
  args: { elevation: "flat", density: "compact" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=2842-3905",
    },
  },
};

/**
 * Density wiring check that runs in the browser: `density` drives the child controls' size through
 * context, independent of `elevation`, so a `flat` + `compact` toolbar renders 24px controls.
 * Tagged out of the sidebar/docs/manifest — it's a test, not a designer- or agent-facing example —
 * but still runs under the default `test` tag.
 */
export const DensityDrivesControlSize: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Toolbar elevation="flat" density="compact">
      <ToolbarToggle aria-label="Bold">
        <Bold />
      </ToolbarToggle>
    </Toolbar>
  ),
  play: async ({ canvas }) => {
    // density="compact" sizes the controls to 24px regardless of the flat elevation.
    const bold = canvas.getByRole("button", { name: "Bold" });
    await expect(bold).toHaveClass("size-6");
    await expect(getComputedStyle(bold).height).toBe("24px");
  },
};

/**
 * Because `Menu` composes propel's `Menu`, a toolbar menu can hold richer rows than the old
 * `items[]` config allowed: per-row leading icons, a separator between groups, a selected marker,
 * and disabled rows.
 */
export const ComposableMenu: Story = {
  // Always-open + portaled: keep it out of the Vitest run so its popup can't leak into
  // the shared test document, but visible in the sidebar/docs as the composition demo.
  tags: ["!test"],
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Toolbar {...args}>
      <Menu defaultOpen>
        <ToolbarMenuTrigger aria-label="Text style">Text</ToolbarMenuTrigger>
        <MenuContent>
          <MenuItem icon={<Pilcrow />} selected>
            Paragraph
          </MenuItem>
          <MenuItem icon={<Heading1 />}>Heading 1</MenuItem>
          <MenuItem icon={<Heading2 />}>Heading 2</MenuItem>
          <MenuItem icon={<Heading3 />}>Heading 3</MenuItem>
          <MenuSeparator />
          <MenuItem icon={<Code />} disabled>
            Code block
          </MenuItem>
        </MenuContent>
      </Menu>
    </Toolbar>
  ),
};

/**
 * Behavioral checks that run in the browser: the root exposes `role="toolbar"`, every icon button
 * is reachable by its accessible name, and clicking a toggle flips its `aria-pressed`. Tagged out
 * of the sidebar/docs/manifest — it's a test, not a designer- or agent-facing example — but still
 * runs under the `test` tag.
 */
export const Behavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    // The root carries the toolbar role.
    await expect(canvas.getByRole("toolbar")).toBeInTheDocument();
    // Icon buttons are named for assistive tech.
    const bold = canvas.getByRole("button", { name: "Bold" });
    await expect(canvas.getByRole("button", { name: "Insert link" })).toBeInTheDocument();
    // A toggle starts unpressed and flips on click.
    await expect(bold).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(bold);
    await expect(bold).toHaveAttribute("aria-pressed", "true");
  },
};

/**
 * Keyboard ARIA pattern (WAI-ARIA toolbar, roving tabindex): the toolbar is a single tab stop —
 * only the active item has `tabindex=0`, the rest `tabindex=-1` — so Tab enters the toolbar once.
 * **Arrow Left/Right** roam focus between items, and a focused button activates with
 * **Enter/Space**. A simple all-button toolbar keeps the navigation deterministic. Tagged out of
 * the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const KeyboardRovingFocus: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Toolbar elevation="raised" density="compact">
      <ToolbarToggle aria-label="Bold">
        <Bold />
      </ToolbarToggle>
      <ToolbarToggle aria-label="Italic">
        <Italic />
      </ToolbarToggle>
      <ToolbarToggle aria-label="Underline">
        <Underline />
      </ToolbarToggle>
    </Toolbar>
  ),
  play: async ({ canvas, userEvent }) => {
    const bold = canvas.getByRole("button", { name: "Bold" });
    const italic = canvas.getByRole("button", { name: "Italic" });
    const underline = canvas.getByRole("button", { name: "Underline" });

    // Roving tabindex: exactly one item is in the tab order (tabindex=0), the rest
    // are -1, so the whole toolbar is a single tab stop.
    await expect(bold).toHaveAttribute("tabindex", "0");
    await expect(italic).toHaveAttribute("tabindex", "-1");
    await expect(underline).toHaveAttribute("tabindex", "-1");

    // Tab enters the toolbar on the active item.
    await userEvent.tab();
    await expect(bold).toHaveFocus();

    // Arrow Right moves focus to the next item (and the roving 0 follows).
    await userEvent.keyboard("{ArrowRight}");
    await expect(italic).toHaveFocus();
    await expect(italic).toHaveAttribute("tabindex", "0");
    await expect(bold).toHaveAttribute("tabindex", "-1");

    await userEvent.keyboard("{ArrowRight}");
    await expect(underline).toHaveFocus();

    // Arrow Left moves focus back.
    await userEvent.keyboard("{ArrowLeft}");
    await expect(italic).toHaveFocus();

    // The focused toggle activates with the keyboard (flips aria-pressed).
    await expect(italic).toHaveAttribute("aria-pressed", "false");
    await userEvent.keyboard("{Enter}");
    await expect(italic).toHaveAttribute("aria-pressed", "true");
    await userEvent.keyboard(" ");
    await expect(italic).toHaveAttribute("aria-pressed", "false");
  },
};

/**
 * An inline filter input in the roving tab order — a miniature field whose height tracks the
 * toolbar's density. Invented pending a Figma spec (flagged for design polish).
 */
export const WithFilter: Story = {
  render: (args) => (
    <Toolbar {...args} aria-label="Issue actions">
      <ToolbarInput aria-label="Filter issues" placeholder="Filter…" />
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold">
          <Bold />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Italic">
          <Italic />
        </ToolbarToggle>
      </ToolbarGroup>
    </Toolbar>
  ),
};

/**
 * Interaction test: the input participates in the toolbar and takes text. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const WithFilterInteraction: Story = {
  ...WithFilter,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Filter issues" });
    await userEvent.type(input, "bug");
    await expect(input).toHaveValue("bug");
  },
};
