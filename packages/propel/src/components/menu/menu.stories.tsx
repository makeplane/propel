import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleX,
  Copy,
  ExternalLink,
  Globe,
  Link2,
  Lock,
  Pencil,
  Plus,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Avatar } from "../avatar/index";
import { Badge } from "../badge/index";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuFooter,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuSearch,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "./index";

const meta = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=30-1078",
    },
  },
  // Menu is a compound component; document every menu part alongside the root so
  // their props appear in the args table and the relationship is recorded in the
  // manifest (the same pattern AvatarGroup uses for Avatar).
  subcomponents: {
    MenuTrigger,
    MenuContent,
    MenuItem,
    MenuCheckboxItem,
    MenuSeparator,
    MenuGroup,
    MenuLabel,
    MenuSearch,
    MenuFooter,
    MenuSubmenu,
    MenuSubmenuTrigger,
    MenuSubmenuContent,
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// A plain trigger button styled with propel tokens — the menu itself doesn't
// ship a trigger style, so stories provide one to keep the focus on the menu.
const triggerClass =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

// Open the menu and wait for its portal popup to mount. Shared by the play tests.
async function openMenu(canvas: ReturnType<typeof within>, name: string) {
  await userEvent.click(canvas.getByRole("button", { name }));
  await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
}

function findItem(role: string, text: string) {
  return Array.from(document.body.querySelectorAll(`[role="${role}"]`)).find((el) =>
    el.textContent?.includes(text),
  ) as HTMLElement | undefined;
}

// True when a CSS color string is fully transparent (the bug: a tone-less checked
// box rendered with no fill, i.e. `transparent` / `rgba(...,0)`).
function isTransparent(color: string) {
  if (color === "transparent" || color === "rgba(0, 0, 0, 0)") return true;
  const match = /rgba?\([^)]*?,\s*([\d.]+)\s*\)/.exec(color);
  return match != null && Number(match[1]) === 0;
}

// Resolve the `bg-accent-primary` token to a concrete, browser-normalized rgb
// string by probing a throwaway element. Lets the assertion compare against the
// real accent color without hardcoding a hex/rgb that could drift from the token.
function resolveAccentPrimary() {
  const probe = document.createElement("span");
  probe.className = "bg-accent-primary";
  probe.style.position = "fixed";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).backgroundColor;
  probe.remove();
  return color;
}

// The presentational box inside a `menuitemcheckbox` row is the leading
// `aria-hidden` span (CheckboxVisual). Returns its computed background-color.
function checkboxBoxBgColor(row: HTMLElement) {
  const box = row.querySelector("span[aria-hidden]") as HTMLElement | null;
  if (box == null) throw new Error("CheckboxVisual box not found in row");
  return getComputedStyle(box).backgroundColor;
}

// ---------------------------------------------------------------------------
// Small demo-only fixtures. Where a demo needs a propel primitive that does not
// exist yet (a selectable pill/chip, a sort-direction button group), a minimal
// local version is defined inline and flagged in the PR — it is NOT part of the
// Menu API.
// ---------------------------------------------------------------------------

// Status glyphs (Figma "Status" demo).
const STATUSES = [
  { key: "backlog", label: "Backlog", icon: <CircleDashed className="size-4 text-tertiary" /> },
  { key: "todo", label: "Todo", icon: <Circle className="size-4 text-tertiary" /> },
  {
    key: "in_progress",
    label: "In Progress",
    icon: <CircleDot className="size-4 text-warning-primary" />,
  },
  { key: "done", label: "Done", icon: <CircleCheck className="size-4 text-success-primary" /> },
  { key: "cancelled", label: "Cancelled", icon: <CircleX className="size-4 text-tertiary" /> },
] as const;

// Priority glyphs (Figma "Priority" demo).
const PRIORITIES = [
  { key: "urgent", label: "Urgent", icon: <span className="text-12">⛔</span> },
  { key: "high", label: "High", icon: <SignalHigh className="size-4 text-label-orange-icon" /> },
  {
    key: "medium",
    label: "Medium",
    icon: <SignalMedium className="size-4 text-label-yellow-icon" />,
  },
  { key: "low", label: "Low", icon: <SignalLow className="size-4 text-label-indigo-icon" /> },
  { key: "none", label: "None", icon: <span className="text-tertiary">—</span> },
] as const;

const LABELS = [
  { key: "customer", label: "Customer request", color: "bg-label-orange-bg-strong" },
  { key: "feedback", label: "Feedback", color: "bg-label-emerald-bg-strong" },
  { key: "design", label: "Design", color: "bg-label-purple-bg-strong" },
  { key: "dev", label: "Dev", color: "bg-label-indigo-bg-strong" },
  { key: "feature", label: "Feature", color: "bg-label-crimson-bg-strong" },
] as const;

const ASSIGNEES: ReadonlyArray<{ key: string; name: string; disabled?: boolean }> = [
  { key: "amelia", name: "Amelia Parker" },
  { key: "david", name: "David Wilson" },
  { key: "samuel", name: "Samuel Wright", disabled: true },
  { key: "sarah", name: "Sarah Jones" },
  { key: "ethan", name: "Ethan Parker" },
];

const LANGUAGES = [
  { key: "en", label: "English", secondary: "English" },
  { key: "es", label: "Español", secondary: "Spanish" },
  { key: "fr", label: "Français", secondary: "French" },
  { key: "de", label: "Deutsch", secondary: "German" },
  { key: "it", label: "Italiano", secondary: "Italian" },
  { key: "pt", label: "Português", secondary: "Portuguese" },
  { key: "nl", label: "Nederlands", secondary: "Dutch" },
] as const;

// A small color swatch, used as the leading control alongside the Checkbox for
// labels. Not a propel primitive — local to the demo.
function ColorSwatch({ className }: { className: string }) {
  return <span className={`size-3.5 shrink-0 rounded-xs ${className}`} aria-hidden />;
}

// Initials for an Avatar fallback ("Amelia Parker" -> "AP").
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/**
 * Demo 1 — **Status**. Single-select with status icons, a sticky search header, and a leading
 * checkmark on the selected row only.
 */
export const Status: Story = {
  render: function StatusStory() {
    const [selected, setSelected] = React.useState<string>("backlog");
    const [query, setQuery] = React.useState("");
    const visible = STATUSES.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          {STATUSES.find((s) => s.key === selected)?.label ?? "Status"}
        </MenuTrigger>
        <MenuContent width="sm" search={<MenuSearch value={query} onValueChange={setQuery} />}>
          {visible.map((s) => (
            <MenuItem
              emphasis="default"
              key={s.key}
              inlineStartNode={s.icon}
              selected={selected === s.key}
              closeOnClick={false}
              onClick={() => setSelected(s.key)}
            >
              {s.label}
            </MenuItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and pick a status", async () => {
      await openMenu(canvas, "Backlog");
      const done = await waitFor(() => findItem("menuitem", "Done") as HTMLElement);
      await userEvent.click(done);
      await waitFor(() =>
        expect(canvas.getByRole("button").textContent?.includes("Done")).toBe(true),
      );
    });
  },
};

/**
 * Demo 2 — **Labels**. Multi-select: each row is a `MenuCheckboxItem` (the propel `Checkbox` as the
 * leading control) plus a color swatch, with a search header. When the typed query has no exact
 * match, an "Add label" option (Figma `64-626`) appears, separated from the search by a single
 * divider line.
 */
export const Labels: Story = {
  render: function LabelsStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ customer: true });
    const [query, setQuery] = React.useState("");
    const trimmed = query.trim();
    const visible = LABELS.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()));
    // Offer "Add label" whenever the query doesn't exactly match an existing label.
    const canAdd =
      trimmed.length > 0 && !LABELS.some((l) => l.label.toLowerCase() === trimmed.toLowerCase());
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>Labels</MenuTrigger>
        <MenuContent width="sm" search={<MenuSearch value={query} onValueChange={setQuery} />}>
          {canAdd ? (
            // A single horizontal divider separates the search from the new-label item
            // (Figma 64-626): the sticky MenuSearch already draws its own bottom
            // rule, so the "Add label" row mounts directly beneath it with no extra line.
            <MenuItem
              emphasis="default"
              inlineStartNode={<Plus className="text-icon-secondary" />}
              closeOnClick={false}
            >{`Add label "${trimmed}"`}</MenuItem>
          ) : null}
          {visible.map((l) => (
            <MenuCheckboxItem
              key={l.key}
              inlineStartNode={<ColorSwatch className={l.color} />}
              checked={Boolean(checked[l.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [l.key]: next }))}
            >
              {l.label}
            </MenuCheckboxItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and toggle a label", async () => {
      await openMenu(canvas, "Labels");
      const feedback = (await waitFor(() =>
        findItem("menuitemcheckbox", "Feedback"),
      )) as HTMLElement;
      await expect(feedback).toHaveAttribute("aria-checked", "false");
      await userEvent.click(feedback);
      await waitFor(() => expect(feedback).toHaveAttribute("aria-checked", "true"));
      // Multi-select stays open.
      await expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();
    });
    await step("typing a new name reveals the Add label option", async () => {
      const search = document.body.querySelector('input[type="text"]') as HTMLInputElement;
      await userEvent.type(search, "Product");
      await waitFor(() => expect(findItem("menuitem", 'Add label "Product"')).toBeDefined());
    });
  },
};

/**
 * Demo 3 — **ActionMenu**. Icon items, a trailing keyboard shortcut (⌘L), a disabled item with a
 * description, a destructive Delete, and separators between groups.
 */
export const ActionMenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<button type="button" className={triggerClass} />}>Actions</MenuTrigger>
      <MenuContent width="sm">
        <MenuItem emphasis="default" inlineStartNode={<Pencil />}>
          Edit
        </MenuItem>
        <MenuItem emphasis="default" inlineStartNode={<Copy />}>
          Make a copy
        </MenuItem>
        <MenuItem emphasis="default" inlineStartNode={<ExternalLink />}>
          Open in new tab
        </MenuItem>
        <MenuItem
          emphasis="default"
          inlineStartNode={<Link2 />}
          inlineEndNode={<span className="text-12 text-tertiary">⌘L</span>}
        >
          Copy link
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          emphasis="default"
          inlineStartNode={<Trash2 />}
          description="Only completed or cancelled work items can be archived"
          disabled
        >
          Archive
        </MenuItem>
        <MenuSeparator />
        <MenuItem emphasis="default" inlineStartNode={<Trash2 className="text-danger-primary" />}>
          {<span className="text-danger-primary">Delete</span>}
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
  play: async ({ canvas, step }) => {
    await step("open and confirm the disabled Archive row", async () => {
      await openMenu(canvas, "Actions");
      const archive = (await waitFor(() => findItem("menuitem", "Archive"))) as HTMLElement;
      await expect(archive).toHaveAttribute("data-disabled");
    });

    // Keyboard ARIA pattern (WAI-ARIA menu button): on the trigger, Enter/Space/
    // ArrowDown open the menu and focus the first item; Arrow Down/Up navigate;
    // Enter activates + closes + returns focus to the trigger; Escape closes +
    // returns focus. The menu portals to <body>, so query items by unique text.
    await step("Escape closes and returns focus to the trigger", async () => {
      const trigger = canvas.getByRole("button", { name: "Actions" });
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument(),
      );
      await expect(trigger).toHaveFocus();
    });

    await step("ArrowDown opens the menu and highlights the first item", async () => {
      const trigger = canvas.getByRole("button", { name: "Actions" });
      trigger.focus();
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
      const edit = (await waitFor(() => findItem("menuitem", "Edit"))) as HTMLElement;
      await waitFor(() => expect(edit).toHaveFocus());
    });

    await step("ArrowDown/ArrowUp move highlight between items", async () => {
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() => expect(findItem("menuitem", "Make a copy")).toHaveFocus());
      await userEvent.keyboard("{ArrowUp}");
      await waitFor(() => expect(findItem("menuitem", "Edit")).toHaveFocus());
    });

    await step("Enter activates the item, closes the menu, and restores focus", async () => {
      const trigger = canvas.getByRole("button", { name: "Actions" });
      await userEvent.keyboard("{Enter}");
      await waitFor(() =>
        expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument(),
      );
      await waitFor(() => expect(trigger).toHaveFocus());
    });
  },
};

/**
 * Demo 4 — **Description**. Single-select with a two-line label + muted description, laid out in a
 * wider menu.
 */
export const Description: Story = {
  render: function DescriptionStory() {
    const [selected, setSelected] = React.useState("private");
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Visibility
        </MenuTrigger>
        <MenuContent width="lg">
          <MenuItem
            emphasis="default"
            inlineStartNode={<Lock />}
            description="Accessible only by invite"
            selected={selected === "private"}
            closeOnClick={false}
            onClick={() => setSelected("private")}
          >
            Private
          </MenuItem>
          <MenuItem
            emphasis="default"
            inlineStartNode={<Globe />}
            description="Anyone in the workspace except Guests can join"
            selected={selected === "public"}
            closeOnClick={false}
            onClick={() => setSelected("public")}
          >
            Public
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and select Public", async () => {
      await openMenu(canvas, "Visibility");
      const pub = (await waitFor(() => findItem("menuitem", "Public"))) as HTMLElement;
      await userEvent.click(pub);
      await waitFor(() =>
        expect(findItem("menuitem", "Public")?.querySelector("svg")).toBeInTheDocument(),
      );
    });
  },
};

/**
 * `MenuLabel` titles a grouped section and can carry inline-end metadata; `MenuFooter` renders
 * sticky non-menu chrome outside the `role="menu"` list.
 */
export const LabelAndFooterSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Menu>
      <MenuTrigger render={<button type="button" className={triggerClass} />}>
        Grouped menu
      </MenuTrigger>
      <MenuContent width="sm" footer={<MenuFooter>Type to add another item.</MenuFooter>}>
        <MenuGroup>
          <MenuLabel inlineEndNode={<span>3</span>}>Section</MenuLabel>
          <MenuItem emphasis="default">First item</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
  play: async ({ canvas }) => {
    await openMenu(canvas, "Grouped menu");
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Section");
    await expect(document.body).toHaveTextContent("3");
    await expect(document.body).toHaveTextContent("Type to add another item.");
  },
};

/**
 * Demo 5 — **Assignees**. Multi-select: a `MenuCheckboxItem` (propel `Checkbox`) with a propel
 * `Avatar` as the leading content, a search header, and a disabled row.
 */
export const Assignees: Story = {
  render: function AssigneesStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ amelia: true });
    const [query, setQuery] = React.useState("");
    const visible = ASSIGNEES.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Assignees
        </MenuTrigger>
        <MenuContent
          width="sm"
          search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {visible.map((a) => (
            <MenuCheckboxItem
              key={a.key}
              inlineStartNode={<Avatar magnitude="2xs" fallback={initials(a.name)} alt={a.name} />}
              checked={Boolean(checked[a.key])}
              disabled={a.disabled}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [a.key]: next }))}
            >
              {a.name}
            </MenuCheckboxItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and toggle an assignee", async () => {
      await openMenu(canvas, "Assignees");
      const david = (await waitFor(() =>
        findItem("menuitemcheckbox", "David Wilson"),
      )) as HTMLElement;
      await userEvent.click(david);
      await waitFor(() => expect(david).toHaveAttribute("aria-checked", "true"));
    });
    await step("the disabled row cannot be toggled", async () => {
      const samuel = findItem("menuitemcheckbox", "Samuel Wright") as HTMLElement;
      await expect(samuel).toHaveAttribute("data-disabled");
    });
  },
};

/**
 * Demo 6 — **LanguagePicker**. Single-select; each row pairs a label with muted secondary text
 * inline (the English name), a search header, and a selected checkmark.
 */
export const LanguagePicker: Story = {
  render: function LanguagePickerStory() {
    const [selected, setSelected] = React.useState("en");
    const [query, setQuery] = React.useState("");
    const visible = LANGUAGES.filter((l) =>
      `${l.label} ${l.secondary}`.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          {LANGUAGES.find((l) => l.key === selected)?.label ?? "Language"}
        </MenuTrigger>
        <MenuContent width="sm" search={<MenuSearch value={query} onValueChange={setQuery} />}>
          {visible.map((l) => (
            <MenuItem
              emphasis="default"
              key={l.key}
              secondaryText={l.secondary}
              selected={selected === l.key}
              closeOnClick={false}
              onClick={() => setSelected(l.key)}
            >
              {l.label}
            </MenuItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("filter and select a language", async () => {
      await openMenu(canvas, "English");
      const search = (await waitFor(() =>
        document.body.querySelector('input[type="text"]'),
      )) as HTMLInputElement;
      await userEvent.type(search, "Span");
      await waitFor(() => expect(findItem("menuitem", "Español")).toBeDefined());
      await userEvent.click(findItem("menuitem", "Español") as HTMLElement);
      await waitFor(() =>
        expect(canvas.getByRole("button").textContent?.includes("Español")).toBe(true),
      );
    });
  },
};

/**
 * Demo 7 — **Priority**. Multi-select: a `MenuCheckboxItem` (propel `Checkbox`) with a leading
 * priority glyph, plus a search header.
 */
export const Priority: Story = {
  render: function PriorityStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    const [query, setQuery] = React.useState("");
    const visible = PRIORITIES.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Priority
        </MenuTrigger>
        <MenuContent width="sm" search={<MenuSearch value={query} onValueChange={setQuery} />}>
          {visible.map((p) => (
            <MenuCheckboxItem
              key={p.key}
              inlineStartNode={p.icon}
              checked={Boolean(checked[p.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [p.key]: next }))}
            >
              {p.label}
            </MenuCheckboxItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and toggle High", async () => {
      await openMenu(canvas, "Priority");
      const high = (await waitFor(() => findItem("menuitemcheckbox", "High"))) as HTMLElement;
      await userEvent.click(high);
      await waitFor(() => expect(high).toHaveAttribute("aria-checked", "true"));
    });
  },
};

// How many rows a `viewAll` section shows before the "View all" toggle. The rest stay
// collapsed inline until the toggle is activated.
const VIEW_ALL_PREVIEW = 2;

/**
 * Regression — **CheckedFillVisible**. Locks in the fix for the invisible checked checkbox: a
 * tone-less `CheckboxVisual` (as rendered by `MenuCheckboxItem`) used to inherit no fill, so the
 * white check sat on a transparent box and disappeared. Toggling a row to CHECKED must give its box
 * a VISIBLE `bg-accent-primary` fill — a non-transparent background-color equal to the
 * accent-primary token. Not a documented demo; this is a test-only fixture.
 */
export const CheckedFillVisible: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: function CheckedFillVisibleStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Priority
        </MenuTrigger>
        <MenuContent width="sm">
          {PRIORITIES.map((p) => (
            <MenuCheckboxItem
              key={p.key}
              inlineStartNode={p.icon}
              checked={Boolean(checked[p.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [p.key]: next }))}
            >
              {p.label}
            </MenuCheckboxItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("an unchecked row's box has no fill", async () => {
      await openMenu(canvas, "Priority");
      const high = (await waitFor(() => findItem("menuitemcheckbox", "High"))) as HTMLElement;
      await expect(high).toHaveAttribute("aria-checked", "false");
      // Sanity: before checking, the box really is transparent (no fill).
      await expect(isTransparent(checkboxBoxBgColor(high))).toBe(true);
    });

    await step("toggling to checked fills the box with the accent token", async () => {
      await userEvent.click(findItem("menuitemcheckbox", "High") as HTMLElement);
      await waitFor(() =>
        expect(findItem("menuitemcheckbox", "High")).toHaveAttribute("aria-checked", "true"),
      );

      // The fix: the checked box must paint a VISIBLE accent fill — not
      // transparent, and exactly the `bg-accent-primary` token. A regression
      // (dropping the base fill) would leave it transparent and fail here.
      // Re-query the row each read: Base UI re-renders the menu item on toggle,
      // so an old reference can go stale (a detached node reports no fill). Poll
      // inside `waitFor` to let the box's color transition settle.
      const accent = resolveAccentPrimary();
      // Equality with the (non-transparent) accent token implies a visible fill;
      // poll until the box's color transition settles to the accent.
      await waitFor(() =>
        expect(checkboxBoxBgColor(findItem("menuitemcheckbox", "High") as HTMLElement)).toBe(
          accent,
        ),
      );
      // Spell out the regression guard: the settled fill is explicitly NOT
      // transparent (the bug rendered a white check on a `rgba(...,0)` box).
      await expect(
        isTransparent(checkboxBoxBgColor(findItem("menuitemcheckbox", "High") as HTMLElement)),
      ).toBe(false);
    });
  },
};

/**
 * Demo 8 — **Filters**. Multi-select across several titled, collapsible sections (Priority, State,
 * Assignee, …). Each item carries a leading icon; a chevron on the heading collapses/expands the
 * category; categories are separated by a divider; and a long category previews only its first few
 * rows with a "View all" toggle that expands the remaining rows inline (and collapses back to "Show
 * less").
 */
export const Filters: Story = {
  render: function FiltersStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
    // Which `viewAll` sections have been expanded to show every row.
    const [expandedAll, setExpandedAll] = React.useState<Record<string, boolean>>({});
    const [query, setQuery] = React.useState("");
    const toggle = (key: string) => (next: boolean) => setChecked((c) => ({ ...c, [key]: next }));
    const match = (label: string) => label.toLowerCase().includes(query.toLowerCase());
    const sections = [
      {
        title: "Priority",
        items: PRIORITIES.map((p) => ({ key: `p-${p.key}`, label: p.label, icon: p.icon })),
      },
      {
        title: "State",
        items: STATUSES.map((s) => ({ key: `s-${s.key}`, label: s.label, icon: s.icon })),
      },
      {
        title: "Assignee",
        viewAll: true,
        items: ASSIGNEES.map((a) => ({
          key: `a-${a.key}`,
          label: a.name,
          icon: <Avatar magnitude="2xs" fallback={initials(a.name)} alt={a.name} />,
        })),
      },
    ];
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Filters
        </MenuTrigger>
        <MenuContent width="sm" search={<MenuSearch value={query} onValueChange={setQuery} />}>
          {sections.map((section, index) => {
            const items = section.items.filter((i) => match(i.label));
            if (items.length === 0) return null;
            const isCollapsed = Boolean(collapsed[section.title]);
            const isExpandedAll = Boolean(expandedAll[section.title]);
            // A `viewAll` section previews only its first rows until expanded; the
            // toggle appears only when there are more rows than the preview shows.
            const hasOverflow = Boolean(section.viewAll) && items.length > VIEW_ALL_PREVIEW;
            const visibleItems =
              hasOverflow && !isExpandedAll ? items.slice(0, VIEW_ALL_PREVIEW) : items;
            return (
              <React.Fragment key={section.title}>
                {/* Divider between categories. */}
                {index > 0 ? <MenuSeparator /> : null}
                <MenuGroup>
                  {/* The category heading is itself a menuitem (valid `role="menu"`
                      child) so its collapse chevron stays interactive without breaking
                      ARIA. The label is the section title; the chevron is the
                      inlineEndNode. */}
                  <MenuItem
                    emphasis="default"
                    aria-expanded={!isCollapsed}
                    inlineEndNode={
                      isCollapsed ? (
                        <ChevronRight aria-hidden="true" />
                      ) : (
                        <ChevronDown aria-hidden="true" />
                      )
                    }
                    closeOnClick={false}
                    onClick={() => setCollapsed((c) => ({ ...c, [section.title]: !isCollapsed }))}
                  >
                    {section.title}
                  </MenuItem>
                  {!isCollapsed
                    ? visibleItems.map((i) => (
                        <MenuCheckboxItem
                          key={i.key}
                          inlineStartNode={i.icon}
                          checked={Boolean(checked[i.key])}
                          onCheckedChange={toggle(i.key)}
                        >
                          {i.label}
                        </MenuCheckboxItem>
                      ))
                    : null}
                  {/* "View all" is its own menuitem (keyboard-focusable like any row)
                      with link emphasis: no hover background + cursor-pointer. Clicking
                      it reveals the remaining rows inline; once expanded it becomes
                      "Show less". `aria-expanded` reflects the inline-expansion state. */}
                  {!isCollapsed && hasOverflow ? (
                    <MenuItem
                      emphasis="link"
                      aria-expanded={isExpandedAll}
                      closeOnClick={false}
                      onClick={() =>
                        setExpandedAll((s) => ({ ...s, [section.title]: !isExpandedAll }))
                      }
                    >
                      {
                        <span className="text-accent-primary">
                          {isExpandedAll ? "Show less" : `View all (${items.length})`}
                        </span>
                      }
                    </MenuItem>
                  ) : null}
                </MenuGroup>
              </React.Fragment>
            );
          })}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and confirm multiple sections render", async () => {
      await openMenu(canvas, "Filters");
      await waitFor(() => expect(findItem("menuitemcheckbox", "Urgent")).toBeDefined());
      await expect(findItem("menuitemcheckbox", "Backlog")).toBeDefined();
      // The Assignee section previews only its first rows; later assignees are hidden
      // behind "View all" until it is activated.
      await expect(findItem("menuitemcheckbox", "Amelia Parker")).toBeDefined();
      await expect(findItem("menuitemcheckbox", "Ethan Parker")).toBeUndefined();
    });
    await step("View all expands the remaining rows inline", async () => {
      const viewAll = (await waitFor(() => findItem("menuitem", "View all"))) as HTMLElement;
      await expect(viewAll).toHaveAttribute("aria-expanded", "false");
      // Keyboard-accessible: activate the menuitem with Enter rather than a pointer.
      viewAll.focus();
      await userEvent.keyboard("{Enter}");
      await waitFor(() => expect(findItem("menuitemcheckbox", "Ethan Parker")).toBeDefined());
      // The toggle now offers to collapse again.
      const showLess = findItem("menuitem", "Show less") as HTMLElement;
      await expect(showLess).toHaveAttribute("aria-expanded", "true");
      await userEvent.click(showLess);
      await waitFor(() => expect(findItem("menuitemcheckbox", "Ethan Parker")).toBeUndefined());
    });
    await step("collapse a category from its heading", async () => {
      const heading = (await waitFor(() =>
        Array.from(document.body.querySelectorAll('[role="menuitem"]')).find(
          (el) =>
            el.getAttribute("aria-expanded") === "true" && el.textContent?.includes("Priority"),
        ),
      )) as HTMLElement;
      await userEvent.click(heading);
      await waitFor(() => expect(findItem("menuitemcheckbox", "Urgent")).toBeUndefined());
    });
  },
};

/**
 * Demo 9 — **EmptyState**. Searching filters the list; when nothing matches, the menu shows a "No
 * matching results" message instead of items.
 */
export const EmptyState: Story = {
  render: function EmptyStateStory() {
    const [query, setQuery] = React.useState("Product");
    const visible = STATUSES.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Menu defaultOpen>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>Status</MenuTrigger>
        <MenuContent width="sm" search={<MenuSearch value={query} onValueChange={setQuery} />}>
          {visible.length > 0 ? (
            visible.map((s) => (
              <MenuItem emphasis="default" key={s.key} inlineStartNode={s.icon}>
                {s.label}
              </MenuItem>
            ))
          ) : (
            <div className="px-2 py-2 text-13 text-tertiary">No matching results</div>
          )}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ step }) => {
    await step("the no-results message shows for a non-matching query", async () => {
      await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
      await waitFor(() =>
        expect(document.body.textContent?.includes("No matching results")).toBe(true),
      );
    });
    await step("clearing the search restores the list", async () => {
      const search = document.body.querySelector('input[type="text"]') as HTMLInputElement;
      await userEvent.clear(search);
      await waitFor(() => expect(findItem("menuitem", "Backlog")).toBeDefined());
    });
  },
};

/**
 * Demo 10 — **Submenu**. Rows carry a trailing count `Badge` and a chevron; hovering one opens a
 * nested submenu of options (built on `MenuSubmenu`).
 */
export const Submenu: Story = {
  parameters: {
    a11y: {
      // When a submenu is open, Base UI's FloatingPortal emits a visually-hidden
      // `aria-owns` owner `<span>` next to the trigger. It reparents the portaled
      // submenu to the correct place in the accessibility tree (next to its trigger),
      // but in the DOM that span lands as a child of the parent `role="menu"`. axe's
      // aria-required-children reads the DOM tree rather than the a11y tree, so it
      // flags the span as a disallowed menu child. This is a static-analysis
      // false-positive on axe's side, not invalid markup (tracked at
      // dequelabs/axe-core#4048; the floating-ui maintainer confirmed the span is doing
      // correct a11y-tree placement in floating-ui/floating-ui#3424). Suppress just
      // this rule for this story.
      config: { rules: [{ id: "aria-required-children", enabled: false }] },
    },
  },
  render: () => (
    <Menu>
      <MenuTrigger render={<button type="button" className={triggerClass} />}>
        Filter by
      </MenuTrigger>
      <MenuContent width="sm">
        <MenuSubmenu>
          <MenuSubmenuTrigger
            inlineEndNode={
              <Badge magnitude="sm" tone="neutral">
                5
              </Badge>
            }
          >
            Priority
          </MenuSubmenuTrigger>
          <MenuSubmenuContent width="sm">
            {PRIORITIES.map((p) => (
              <MenuItem
                emphasis="default"
                key={p.key}
                inlineStartNode={p.icon}
                closeOnClick={false}
              >
                {p.label}
              </MenuItem>
            ))}
          </MenuSubmenuContent>
        </MenuSubmenu>
        <MenuSubmenu>
          <MenuSubmenuTrigger
            inlineEndNode={
              <Badge magnitude="sm" tone="neutral">
                5
              </Badge>
            }
          >
            State
          </MenuSubmenuTrigger>
          <MenuSubmenuContent width="sm">
            {STATUSES.map((s) => (
              <MenuItem
                emphasis="default"
                key={s.key}
                inlineStartNode={s.icon}
                closeOnClick={false}
              >
                {s.label}
              </MenuItem>
            ))}
          </MenuSubmenuContent>
        </MenuSubmenu>
        <MenuSubmenu>
          <MenuSubmenuTrigger
            inlineEndNode={
              <Badge magnitude="sm" tone="neutral">
                5
              </Badge>
            }
          >
            Assignee
          </MenuSubmenuTrigger>
          <MenuSubmenuContent width="sm">
            {ASSIGNEES.map((a) => (
              <MenuItem
                emphasis="default"
                key={a.key}
                inlineStartNode={
                  <Avatar magnitude="2xs" fallback={initials(a.name)} alt={a.name} />
                }
                closeOnClick={false}
              >
                {a.name}
              </MenuItem>
            ))}
          </MenuSubmenuContent>
        </MenuSubmenu>
      </MenuContent>
    </Menu>
  ),
  play: async ({ canvas, step }) => {
    await step("open the menu and reveal a submenu", async () => {
      await openMenu(canvas, "Filter by");
      const priority = (await waitFor(() => findItem("menuitem", "Priority"))) as HTMLElement;
      await expect(priority).toHaveAttribute("aria-haspopup", "menu");
      await userEvent.click(priority);
      await waitFor(() =>
        expect(document.body.querySelectorAll('[role="menu"]').length).toBeGreaterThan(1),
      );
      await waitFor(() => expect(findItem("menuitem", "Urgent")).toBeDefined());
    });
  },
};
