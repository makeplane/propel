import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Image,
  Italic,
  Link,
  MessageSquare,
  Strikethrough,
  Underline,
} from "lucide-react";
import { expect } from "storybook/test";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDropdown,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
  ToolbarToggleGroup,
} from "./index";

const TEXT_STYLES = [
  { value: "paragraph", label: "Paragraph" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" },
];

const FONTS = [
  { value: "sans", label: "Sans" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" },
];

// A representative rich-text formatting toolbar: a Text/Aa style picker, an inline
// B/I/U/S cluster, an alignment toggle-group, and link/image buttons.
function FormattingToolbar(args: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar {...args}>
      <ToolbarDropdown label="Text" items={TEXT_STYLES} aria-label="Text style" />
      <ToolbarDropdown label="Aa" items={FONTS} aria-label="Font" />
      <ToolbarButton aria-label="Comment">
        <MessageSquare aria-hidden />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold">
          <Bold aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Italic">
          <Italic aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Underline">
          <Underline aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Strikethrough">
          <Strikethrough aria-hidden />
        </ToolbarToggle>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup aria-label="Text alignment" defaultValue={["left"]}>
        <ToolbarToggle value="left" aria-label="Align left">
          <AlignLeft aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle value="center" aria-label="Align center">
          <AlignCenter aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle value="right" aria-label="Align right">
          <AlignRight aria-hidden />
        </ToolbarToggle>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Insert link">
        <Link aria-hidden />
      </ToolbarButton>
      <ToolbarButton aria-label="Insert image">
        <Image aria-hidden />
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
    ToolbarGroup,
    ToolbarButton,
    ToolbarToggle,
    ToolbarToggleGroup,
    ToolbarSeparator,
    ToolbarDropdown,
  },
  tags: ["ai-generated"],
  args: { variant: "floater" },
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

/** The default `floater`: a self-contained card with a border + shadow. */
export const Default: Story = {};

/** The three placements: a floating card, a flat topbar, and a flat bottom bar. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <FormattingToolbar variant="floater" />
      <FormattingToolbar variant="topbar" />
      <FormattingToolbar variant="bottom-bar" />
    </div>
  ),
};

/**
 * Behavioral checks that run in the browser: the root exposes `role="toolbar"`,
 * every icon button is reachable by its accessible name, and clicking a toggle
 * flips its `aria-pressed`. Tagged out of the sidebar/docs/manifest — it's a test,
 * not a designer- or agent-facing example — but still runs under the `test` tag.
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
 * Keyboard ARIA pattern (WAI-ARIA toolbar, roving tabindex): the toolbar is a single
 * tab stop — only the active item has `tabindex=0`, the rest `tabindex=-1` — so Tab
 * enters the toolbar once. **Arrow Left/Right** roam focus between items, and a
 * focused button activates with **Enter/Space**. A simple all-button toolbar keeps
 * the navigation deterministic. Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const KeyboardRovingFocus: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Toolbar variant="floater">
      <ToolbarToggle aria-label="Bold">
        <Bold aria-hidden />
      </ToolbarToggle>
      <ToolbarToggle aria-label="Italic">
        <Italic aria-hidden />
      </ToolbarToggle>
      <ToolbarToggle aria-label="Underline">
        <Underline aria-hidden />
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
