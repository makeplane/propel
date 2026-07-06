import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ClipboardPaste,
  Copy,
  ExternalLink,
  FolderInput,
  Link2,
  PencilLine,
  Scissors,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { expect, fireEvent, userEvent, waitFor, within } from "storybook/test";

import { Icon } from "../icon";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from "./index";

// Components-tier story: the ready-made `ContextMenu` root and `ContextMenuContent` surface graft
// Base UI's portal/positioner/popup, and the rich `ContextMenuItem` lays out an icon + label +
// `endContent`. `ContextMenuTrigger` is the behavior surface that opens the menu, and
// `ContextMenuSeparator` is the ready-made divider. The elements-tier story composes the raw
// `ContextMenuItem` rows by hand.
const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  subcomponents: {
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLinkItem,
    ContextMenuSeparator,
    ContextMenuSubmenu,
    ContextMenuSubmenuTrigger,
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerClass =
  "flex h-32 w-72 items-center justify-center rounded-lg border-sm border-dashed border-subtle text-13 text-tertiary select-none";

/** Right-click the area to open a ready-made menu of icon + label rows. */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger render={<div className={triggerClass} />}>
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          tone="neutral"
          icon={<Icon icon={Scissors} />}
          endContent="⌘X"
          label="Cut"
        />
        <ContextMenuItem tone="neutral" icon={<Icon icon={Copy} />} endContent="⌘C" label="Copy" />
        <ContextMenuItem
          tone="neutral"
          icon={<Icon icon={ClipboardPaste} />}
          endContent="⌘V"
          label="Paste"
        />
        <ContextMenuSeparator />
        <ContextMenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Copy");
    await expect(document.body).toHaveTextContent("Delete");
  },
};

/**
 * Tone selects the row palette: `neutral` rows use the standard text hierarchy and `danger` rows
 * use the error palette — both inside one menu, with the destructive action set off by a separator
 * the way a real product menu groups it. Right-click the area to open it.
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger render={<div className={triggerClass} />}>
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem tone="neutral" icon={<Icon icon={PencilLine} />} label="Rename" />
        <ContextMenuItem tone="neutral" icon={<Icon icon={Copy} />} label="Duplicate" />
        <ContextMenuSeparator />
        <ContextMenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// The menu surface is portaled and only mounts on open, so without this twin the Tones menu (and
// its danger-tone row) would never render under the test/a11y gate.
export const TonesInteraction: Story = {
  ...Tones,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Rename");
    await expect(document.body).toHaveTextContent("Duplicate");
    await expect(document.body).toHaveTextContent("Delete");
  },
};

/**
 * A nested menu: `ContextMenuSubmenu` groups a `ContextMenuSubmenuTrigger` row (label + caret) with
 * its own `ContextMenuContent`, so hovering or clicking "Move to" reveals the destinations beside
 * the parent menu. Right-click the area to open it.
 */
export const Submenu: Story = {
  parameters: {
    controls: { disable: true },
    a11y: {
      // When a submenu is open, Base UI's FloatingPortal emits a visually-hidden `aria-owns`
      // owner `<span>` next to the trigger. It reparents the portaled submenu to the correct
      // place in the accessibility tree (next to its trigger), but in the DOM that span lands
      // as a child of the parent `role="menu"`. axe's aria-required-children reads the DOM tree
      // rather than the a11y tree, so it flags the span as a disallowed menu child. This is a
      // static-analysis false-positive on axe's side, not invalid markup (tracked at
      // dequelabs/axe-core#4048; the floating-ui maintainer confirmed the span is doing correct
      // a11y-tree placement in floating-ui/floating-ui#3424). Suppress just this rule here.
      config: { rules: [{ id: "aria-required-children", enabled: false }] },
    },
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger render={<div className={triggerClass} />}>
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem tone="neutral" icon={<Icon icon={PencilLine} />} label="Rename" />
        <ContextMenuItem tone="neutral" icon={<Icon icon={Copy} />} label="Duplicate" />
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger
            tone="neutral"
            icon={<Icon icon={FolderInput} />}
            label="Move to"
          />
          <ContextMenuContent>
            <ContextMenuItem tone="neutral" label="Mobile app" />
            <ContextMenuItem tone="neutral" label="Web app" />
            <ContextMenuItem tone="neutral" label="Design system" />
          </ContextMenuContent>
        </ContextMenuSubmenu>
        <ContextMenuSeparator />
        <ContextMenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const SubmenuInteraction: Story = {
  ...Submenu,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    const moveTo = (await waitFor(() => {
      const item = Array.from(document.body.querySelectorAll('[role="menuitem"]')).find((el) =>
        el.textContent?.includes("Move to"),
      );
      void expect(item).toBeDefined();
      return item;
    })) as HTMLElement;
    await expect(moveTo).toHaveAttribute("aria-haspopup", "menu");
    await userEvent.click(moveTo);
    await waitFor(() =>
      expect(document.body.querySelectorAll('[role="menu"]').length).toBeGreaterThan(1),
    );
    await expect(document.body).toHaveTextContent("Design system");
  },
};

/**
 * Navigation rows: `ContextMenuLinkItem` renders a real `<a>` element with menu-item behavior, so a
 * right-click menu can send you to another page — here alongside a plain action row, the way a
 * work-item card mixes "open" destinations with clipboard actions. Right-click the area to open
 * it.
 */
export const LinkItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger render={<div className={triggerClass} />}>
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLinkItem
          tone="neutral"
          icon={<Icon icon={ExternalLink} />}
          href="#work-item"
          target="_blank"
          rel="noopener noreferrer"
          label="Open in new tab"
        />
        <ContextMenuLinkItem
          tone="neutral"
          icon={<Icon icon={Link2} />}
          href="#activity"
          label="Go to activity"
        />
        <ContextMenuSeparator />
        <ContextMenuItem
          tone="neutral"
          icon={<Icon icon={Copy} />}
          endContent="⌘C"
          label="Copy link"
        />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// Asserts the link rows are real anchors (href/target survive) that still participate in the menu
// as `menuitem`s — the surface is portaled and mount-on-open, so the twin also feeds the a11y gate.
export const LinkItemsInteraction: Story = {
  ...LinkItems,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    const link = (await waitFor(() => {
      const item = Array.from(document.body.querySelectorAll('[role="menuitem"]')).find((el) =>
        el.textContent?.includes("Open in new tab"),
      );
      void expect(item).toBeDefined();
      return item;
    })) as HTMLElement;
    await expect(link.tagName).toBe("A");
    await expect(link).toHaveAttribute("href", "#work-item");
    await expect(link).toHaveAttribute("target", "_blank");
  },
};

const SORT_OPTIONS = [
  { key: "manual", label: "Manual" },
  { key: "created", label: "Created date" },
  { key: "due", label: "Due date" },
  { key: "priority", label: "Priority" },
];

/**
 * Single-select rows: the chosen row shows a trailing check via `selected`, and each row forwards
 * Base UI's `closeOnClick={false}` so picking a sort key moves the check without dismissing the
 * menu. Right-click the area, then click rows to move the selection.
 */
export const SingleSelect: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [sortBy, setSortBy] = React.useState("manual");
    return (
      <ContextMenu>
        <ContextMenuTrigger render={<div className={triggerClass} />}>
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          {SORT_OPTIONS.map((option) => (
            <ContextMenuItem
              key={option.key}
              tone="neutral"
              selected={sortBy === option.key}
              closeOnClick={false}
              onClick={() => setSortBy(option.key)}
              label={option.label}
            />
          ))}
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

// Clicks a row and asserts the menu stays open (`closeOnClick={false}`) while the trailing check
// (the row's only svg — these rows have no leading icon) moves to the newly selected row.
export const SingleSelectInteraction: Story = {
  ...SingleSelect,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const findItem = (label: string) =>
      Array.from(document.body.querySelectorAll('[role="menuitem"]')).find((el) =>
        el.textContent?.includes(label),
      ) as HTMLElement | undefined;
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await waitFor(() => expect(findItem("Manual")).toBeDefined());
    await expect(findItem("Manual")?.querySelector("svg")).not.toBeNull();
    await expect(findItem("Due date")?.querySelector("svg")).toBeNull();
    await userEvent.click(findItem("Due date") as HTMLElement);
    await waitFor(() => expect(findItem("Due date")?.querySelector("svg")).not.toBeNull());
    await expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();
    await expect(findItem("Manual")?.querySelector("svg")).toBeNull();
  },
};

/**
 * Selection rows: `ContextMenuCheckboxItem` toggles independently (a kept-mounted tick), and a
 * `ContextMenuRadioGroup` of `ContextMenuRadioItem`s carries one selection (a kept-mounted dot).
 */
export const SelectionRows: Story = {
  render: function Render() {
    const [wrap, setWrap] = React.useState(true);
    const [sort, setSort] = React.useState("manual");
    return (
      <ContextMenu>
        <ContextMenuTrigger
          render={
            <div className="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed border-subtle text-13 text-tertiary" />
          }
        >
          Right-click for view options
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem
            tone="neutral"
            checked={wrap}
            onCheckedChange={setWrap}
            closeOnClick={false}
            label="Wrap titles"
          />
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={sort} onValueChange={setSort}>
            <ContextMenuRadioItem
              tone="neutral"
              value="manual"
              closeOnClick={false}
              label="Manual order"
            />
            <ContextMenuRadioItem
              tone="neutral"
              value="updated"
              closeOnClick={false}
              label="Last updated"
            />
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/**
 * Interaction test: the checkbox row exposes `menuitemcheckbox` and toggles; the radio rows expose
 * `menuitemradio` and move a single selection. Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const SelectionRowsInteraction: Story = {
  ...SelectionRows,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const surface = canvas.getByText("Right-click for view options");
    await fireEvent.contextMenu(surface);
    const body = within(document.body);
    const wrap = await body.findByRole("menuitemcheckbox", { name: "Wrap titles" });
    await expect(wrap).toHaveAttribute("aria-checked", "true");
    await userEvent.click(wrap);
    await expect(wrap).toHaveAttribute("aria-checked", "false");

    await expect(body.getByRole("menuitemradio", { name: "Manual order" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await userEvent.click(body.getByRole("menuitemradio", { name: "Last updated" }));
    await expect(body.getByRole("menuitemradio", { name: "Last updated" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  },
};
