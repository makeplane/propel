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
  History,
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
import { expect, waitFor, within } from "storybook/test";

import { Icon } from "../icon";
import { Menu, MenuContent, MenuItem, MenuSeparator } from "../menu";
import { Tooltip, TooltipProvider } from "../tooltip";
import {
  Toolbar,
  ToolbarInput,
  ToolbarButton,
  ToolbarLink,
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
        <ToolbarMenuTrigger aria-label="Text style" label="Text" />
        <MenuContent>
          {TEXT_STYLES.map((style) => (
            <MenuItem key={style} label={style} />
          ))}
        </MenuContent>
      </Menu>
      <Menu>
        <ToolbarMenuTrigger aria-label="Font" label="Aa" />
        <MenuContent>
          {FONTS.map((font) => (
            <MenuItem key={font} label={font} />
          ))}
        </MenuContent>
      </Menu>
      <ToolbarButton aria-label="Comment" icon={<Icon icon={MessageSquare} />} />
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
        <ToolbarToggle aria-label="Italic" icon={<Icon icon={Italic} />} />
        <ToolbarToggle aria-label="Underline" icon={<Icon icon={Underline} />} />
        <ToolbarToggle aria-label="Strikethrough" icon={<Icon icon={Strikethrough} />} />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup defaultValue={["left"]} aria-label="Text alignment">
        <ToolbarToggle value="left" aria-label="Align left" icon={<Icon icon={AlignLeft} />} />
        <ToolbarToggle
          value="center"
          aria-label="Align center"
          icon={<Icon icon={AlignCenter} />}
        />
        <ToolbarToggle value="right" aria-label="Align right" icon={<Icon icon={AlignRight} />} />
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Lists">
        <ToolbarToggle aria-label="Bullet list" icon={<Icon icon={List} />} />
        <ToolbarToggle aria-label="Numbered list" icon={<Icon icon={ListOrdered} />} />
        <ToolbarToggle aria-label="Checklist" icon={<Icon icon={ListChecks} />} />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Blocks">
        <ToolbarToggle aria-label="Quote" icon={<Icon icon={Quote} />} />
        <ToolbarToggle aria-label="Code block" icon={<Icon icon={Code} />} />
        <ToolbarButton aria-label="Insert table" icon={<Icon icon={Table} />} />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Insert link" icon={<Icon icon={Link} />} />
      <ToolbarButton aria-label="Insert image" icon={<Icon icon={Image} />} />
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
    ToolbarLink,
    ToolbarToggle,
    ToolbarToggleGroup,
    ToolbarSeparator,
    Menu,
    ToolbarMenuTrigger,
    MenuContent,
    MenuItem,
    MenuSeparator,
    Tooltip,
    TooltipProvider,
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
      <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
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
        <ToolbarMenuTrigger aria-label="Text style" label="Text" />
        <MenuContent>
          <MenuItem icon={<Icon icon={Pilcrow} tint="secondary" />} selected label="Paragraph" />
          <MenuItem icon={<Icon icon={Heading1} tint="secondary" />} label="Heading 1" />
          <MenuItem icon={<Icon icon={Heading2} tint="secondary" />} label="Heading 2" />
          <MenuItem icon={<Icon icon={Heading3} tint="secondary" />} label="Heading 3" />
          <MenuSeparator />
          <MenuItem icon={<Icon icon={Code} tint="secondary" />} disabled label="Code block" />
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
      <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
      <ToolbarToggle aria-label="Italic" icon={<Icon icon={Italic} />} />
      <ToolbarToggle aria-label="Underline" icon={<Icon icon={Underline} />} />
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
        <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
        <ToolbarToggle aria-label="Italic" icon={<Icon icon={Italic} />} />
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

/**
 * A toolbar item that navigates instead of acting: `ToolbarLink` is an `<a>` sharing the same
 * roving tab order and icon chrome as the buttons around it — here linking to the document's edit
 * history. Like the icon buttons it wraps a bare glyph in the shared slot, so its accessible name
 * comes from `aria-label`.
 */
export const WithLink: Story = {
  render: (args) => (
    <Toolbar {...args} aria-label="Document actions">
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
        <ToolbarToggle aria-label="Italic" icon={<Icon icon={Italic} />} />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#history" aria-label="View edit history" icon={<Icon icon={History} />} />
    </Toolbar>
  ),
};

/**
 * Interaction test: the link is a named `<a>` that participates in the toolbar's roving tab order —
 * the separator is skipped, Arrow Right reaches the link, and the roving `tabindex=0` follows.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const WithLinkInteraction: Story = {
  ...WithLink,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole("link", { name: "View edit history" });
    await expect(link).toHaveAttribute("href", "#history");

    // The link starts out of the tab order — the toolbar is a single tab stop.
    await expect(link).toHaveAttribute("tabindex", "-1");
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Bold" })).toHaveFocus();

    // Arrow Right roams past the toggles (skipping the separator) onto the link,
    // and the roving tabindex follows it.
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    await expect(link).toHaveFocus();
    await expect(link).toHaveAttribute("tabindex", "0");
  },
};

/**
 * Toolbar controls are icon-only, so pair each with a `Tooltip` naming it (plus a dimmed shortcut
 * hint). The control goes in as the tooltip's trigger child — the tooltip grafts its hover/focus
 * behavior onto the control without disturbing the toolbar's roving focus — and a shared
 * `TooltipProvider` keeps open/close timing consistent while sweeping across the bar.
 */
export const WithTooltips: Story = {
  render: (args) => (
    <TooltipProvider>
      <Toolbar {...args} aria-label="Text formatting">
        <Tooltip label="Bold" shortcut="⌘ B">
          <ToolbarToggle aria-label="Bold" aria-keyshortcuts="Meta+B" icon={<Icon icon={Bold} />} />
        </Tooltip>
        <Tooltip label="Italic" shortcut="⌘ I">
          <ToolbarToggle
            aria-label="Italic"
            aria-keyshortcuts="Meta+I"
            icon={<Icon icon={Italic} />}
          />
        </Tooltip>
        <Tooltip label="Underline" shortcut="⌘ U">
          <ToolbarToggle
            aria-label="Underline"
            aria-keyshortcuts="Meta+U"
            icon={<Icon icon={Underline} />}
          />
        </Tooltip>
      </Toolbar>
    </TooltipProvider>
  ),
};

/**
 * Interaction test: focusing a toolbar item opens its tooltip (focus opens immediately, no hover
 * delay), and the toolbar's roving focus keeps working with the tooltip grafted on — Arrow Right
 * moves to the next control and the tooltip follows. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const WithTooltipsInteraction: Story = {
  ...WithTooltips,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    // The tooltip popup portals outside the story canvas, so query the document.
    const body = within(document.body);

    // Tab enters the toolbar; the focused control's tooltip opens.
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Bold" })).toHaveFocus();
    const tooltip = await body.findByRole("tooltip");
    await expect(tooltip).toHaveTextContent("Bold");

    // Roving focus still works with the tooltip grafted on: Arrow Right moves to the
    // next control and the tooltip swaps (the old one leaves asynchronously, so retry
    // until only the new one remains).
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("button", { name: "Italic" })).toHaveFocus();
    await waitFor(() => expect(body.getByRole("tooltip")).toHaveTextContent("Italic"));
  },
};
