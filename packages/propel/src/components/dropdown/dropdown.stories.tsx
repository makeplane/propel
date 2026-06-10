import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArrowDownUp,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  ChevronUp,
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
import { Checkbox } from "../checkbox/index";
import { Radio, RadioGroup } from "../radio/index";
import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownFooter,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownSearch,
  DropdownSeparator,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownTrigger,
} from "./index";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=30-1078",
    },
  },
  // Dropdown is a compound component; document every menu part alongside the root so
  // their props appear in the args table and the relationship is recorded in the
  // manifest (the same pattern AvatarGroup uses for Avatar).
  subcomponents: {
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownCheckboxItem,
    DropdownSeparator,
    DropdownGroup,
    DropdownLabel,
    DropdownSearch,
    DropdownFooter,
    DropdownSub,
    DropdownSubTrigger,
    DropdownSubContent,
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// A plain trigger button styled with propel tokens — the dropdown itself doesn't
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
// Dropdown API.
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
  { key: "high", label: "High", icon: <SignalHigh className="size-4 text-orange-500" /> },
  { key: "medium", label: "Medium", icon: <SignalMedium className="size-4 text-amber-500" /> },
  { key: "low", label: "Low", icon: <SignalLow className="size-4 text-blue-500" /> },
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

// A selectable display-property pill matching Figma `56-366` (default / hover /
// selected). NOTE: the real propel Pills component isn't built yet — this is a
// minimal demo-local stand-in, flagged in the PR.
function DisplayPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`cursor-pointer rounded-md border px-2 py-1 text-13 outline-none ${
        selected
          ? "border-subtle-1 bg-layer-2-active text-primary shadow-raised-100"
          : "border-subtle-1 bg-layer-2 text-tertiary hover:border-subtle hover:bg-layer-2-hover hover:text-secondary hover:shadow-raised-100"
      }`}
    >
      {label}
    </button>
  );
}

// Initials for an Avatar fallback ("Amelia Parker" -> "AP").
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

// ---------------------------------------------------------------------------
// Panel-row helpers for the two "settings panel" demos (DisplayProperties,
// DisplayAccordion). Those popovers mix radios / checkbox toggles / pills, which
// are NOT valid children of an ARIA `role="menu"`. So the panels render with
// `role="group"` (via DropdownContent's `role` prop) and use these plain rows
// instead of the menuitem-flavored `DropdownItem` / `DropdownCheckboxItem`.
// ---------------------------------------------------------------------------

// A section heading inside a settings panel.
function PanelLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1.5 text-12 text-tertiary">{children}</div>;
}

// A row whose leading control is a propel Radio, for single-select sort lists.
function PanelRadioRow({
  value,
  label,
  trailing,
}: {
  value: string;
  label: string;
  trailing?: React.ReactNode;
}) {
  return (
    <label className="flex h-8 cursor-pointer items-center gap-2 rounded-sm px-2 text-13 text-secondary hover:bg-layer-transparent-hover">
      <Radio value={value} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {trailing != null ? <span className="flex shrink-0 items-center">{trailing}</span> : null}
    </label>
  );
}

// A row whose leading control is a propel Checkbox, for boolean toggles in a panel.
function PanelCheckboxRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
}) {
  return (
    <Checkbox
      tone="neutral"
      checked={checked}
      onCheckedChange={(next) => onCheckedChange(Boolean(next))}
      label={<span className="flex-1">{label}</span>}
    />
  );
}

/**
 * Demo 1 — **Status**. Single-select with status icons, a sticky search header, and
 * a leading checkmark on the selected row only.
 */
export const Status: Story = {
  render: function StatusStory() {
    const [selected, setSelected] = React.useState<string>("backlog");
    const [query, setQuery] = React.useState("");
    const visible = STATUSES.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          {STATUSES.find((s) => s.key === selected)?.label ?? "Status"}
        </DropdownTrigger>
        <DropdownContent
          width="sm"
          search={<DropdownSearch value={query} onValueChange={setQuery} />}
        >
          {visible.map((s) => (
            <DropdownItem
              key={s.key}
              variant="default"
              icon={s.icon}
              label={s.label}
              selected={selected === s.key}
              closeOnClick={false}
              onClick={() => setSelected(s.key)}
            />
          ))}
        </DropdownContent>
      </Dropdown>
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
 * Demo 2 — **Labels**. Multi-select: each row is a `DropdownCheckboxItem` (the propel
 * `Checkbox` as the leading control) plus a color swatch, with a search header. When
 * the typed query has no exact match, an "Add label" option (Figma `64-626`) appears,
 * separated from the search by a double divider line.
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
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Labels
        </DropdownTrigger>
        <DropdownContent
          width="sm"
          search={<DropdownSearch value={query} onValueChange={setQuery} />}
        >
          {canAdd ? (
            <>
              {/* Two horizontal divider lines between the search and the new-label
                  item (Figma 64-626): the sticky search already draws a bottom rule;
                  this adds the second one directly above the add-label row. */}
              <div className="-mx-1 mb-1 border-t border-subtle" />
              <DropdownItem
                variant="default"
                icon={<Plus className="text-icon-secondary" />}
                label={`Add label "${trimmed}"`}
                closeOnClick={false}
              />
            </>
          ) : null}
          {visible.map((l) => (
            <DropdownCheckboxItem
              key={l.key}
              icon={<ColorSwatch className={l.color} />}
              label={l.label}
              checked={Boolean(checked[l.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [l.key]: next }))}
            />
          ))}
        </DropdownContent>
      </Dropdown>
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
 * Demo 3 — **ActionMenu**. Icon items, a trailing keyboard shortcut (⌘L), a disabled
 * item with a description, a destructive Delete, and separators between groups.
 */
export const ActionMenu: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger render={<button type="button" className={triggerClass} />}>
        Actions
      </DropdownTrigger>
      <DropdownContent width="sm">
        <DropdownItem variant="default" icon={<Pencil />} label="Edit" />
        <DropdownItem variant="default" icon={<Copy />} label="Make a copy" />
        <DropdownItem variant="default" icon={<ExternalLink />} label="Open in new tab" />
        <DropdownItem variant="with-value" icon={<Link2 />} label="Copy link" value="⌘L" />
        <DropdownSeparator />
        <DropdownItem
          icon={<Trash2 />}
          label="Archive"
          variant="with-description"
          description="Only completed or cancelled work items can be archived"
          disabled
        />
        <DropdownSeparator />
        <DropdownItem
          variant="default"
          icon={<Trash2 className="text-danger-primary" />}
          label={<span className="text-danger-primary">Delete</span>}
        />
      </DropdownContent>
    </Dropdown>
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
 * Demo 4 — **Description**. Single-select with a two-line label + muted description,
 * laid out in a wider menu.
 */
export const Description: Story = {
  render: function DescriptionStory() {
    const [selected, setSelected] = React.useState("private");
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Visibility
        </DropdownTrigger>
        <DropdownContent width="lg">
          <DropdownItem
            icon={<Lock />}
            label="Private"
            variant="with-description"
            description="Accessible only by invite"
            selected={selected === "private"}
            closeOnClick={false}
            onClick={() => setSelected("private")}
          />
          <DropdownItem
            icon={<Globe />}
            label="Public"
            variant="with-description"
            description="Anyone in the workspace except Guests can join"
            selected={selected === "public"}
            closeOnClick={false}
            onClick={() => setSelected("public")}
          />
        </DropdownContent>
      </Dropdown>
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
 * Demo 5 — **Assignees**. Multi-select: a `DropdownCheckboxItem` (propel `Checkbox`)
 * with a propel `Avatar` as the leading content, a search header, and a disabled row.
 */
export const Assignees: Story = {
  render: function AssigneesStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ amelia: true });
    const [query, setQuery] = React.useState("");
    const visible = ASSIGNEES.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Assignees
        </DropdownTrigger>
        <DropdownContent
          width="sm"
          search={<DropdownSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {visible.map((a) => (
            <DropdownCheckboxItem
              key={a.key}
              icon={<Avatar magnitude="2xs" fallback={initials(a.name)} alt={a.name} />}
              label={a.name}
              checked={Boolean(checked[a.key])}
              disabled={a.disabled}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [a.key]: next }))}
            />
          ))}
        </DropdownContent>
      </Dropdown>
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
 * Demo 6 — **LanguagePicker**. Single-select; each row pairs a label with muted
 * secondary text inline (the English name), a search header, and a selected checkmark.
 */
export const LanguagePicker: Story = {
  render: function LanguagePickerStory() {
    const [selected, setSelected] = React.useState("en");
    const [query, setQuery] = React.useState("");
    const visible = LANGUAGES.filter((l) =>
      `${l.label} ${l.secondary}`.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          {LANGUAGES.find((l) => l.key === selected)?.label ?? "Language"}
        </DropdownTrigger>
        <DropdownContent
          width="sm"
          search={<DropdownSearch value={query} onValueChange={setQuery} />}
        >
          {visible.map((l) => (
            <DropdownItem
              key={l.key}
              variant="default"
              label={l.label}
              secondaryText={l.secondary}
              selected={selected === l.key}
              closeOnClick={false}
              onClick={() => setSelected(l.key)}
            />
          ))}
        </DropdownContent>
      </Dropdown>
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
 * Demo 7 — **Priority**. Multi-select: a `DropdownCheckboxItem` (propel `Checkbox`)
 * with a leading priority glyph, plus a search header.
 */
export const Priority: Story = {
  render: function PriorityStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    const [query, setQuery] = React.useState("");
    const visible = PRIORITIES.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Priority
        </DropdownTrigger>
        <DropdownContent
          width="sm"
          search={<DropdownSearch value={query} onValueChange={setQuery} />}
        >
          {visible.map((p) => (
            <DropdownCheckboxItem
              key={p.key}
              icon={p.icon}
              label={p.label}
              checked={Boolean(checked[p.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [p.key]: next }))}
            />
          ))}
        </DropdownContent>
      </Dropdown>
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

/**
 * Regression — **CheckedFillVisible**. Locks in the fix for the invisible
 * checked checkbox: a tone-less `CheckboxVisual` (as rendered by
 * `DropdownCheckboxItem`) used to inherit no fill, so the white check sat on a
 * transparent box and disappeared. Toggling a row to CHECKED must give its box a
 * VISIBLE `bg-accent-primary` fill — a non-transparent background-color equal to
 * the accent-primary token. Not a documented demo; this is a test-only fixture.
 */
export const CheckedFillVisible: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: function CheckedFillVisibleStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Priority
        </DropdownTrigger>
        <DropdownContent width="sm">
          {PRIORITIES.map((p) => (
            <DropdownCheckboxItem
              key={p.key}
              icon={p.icon}
              label={p.label}
              checked={Boolean(checked[p.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [p.key]: next }))}
            />
          ))}
        </DropdownContent>
      </Dropdown>
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
 * Demo 8 — **Filters**. Multi-select across several titled, collapsible sections
 * (Priority, State, Assignee, …). Each item carries a leading icon; a chevron on the
 * heading collapses/expands the category; categories are separated by a divider; and
 * the "View all" link sits in the heading's trailing slot (no hover background,
 * `cursor-pointer`).
 */
export const Filters: Story = {
  render: function FiltersStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
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
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Filters
        </DropdownTrigger>
        <DropdownContent
          width="sm"
          search={<DropdownSearch value={query} onValueChange={setQuery} />}
        >
          {sections.map((section, index) => {
            const items = section.items.filter((i) => match(i.label));
            if (items.length === 0) return null;
            const isCollapsed = Boolean(collapsed[section.title]);
            return (
              <React.Fragment key={section.title}>
                {/* Divider between categories. */}
                {index > 0 ? <DropdownSeparator /> : null}
                <DropdownGroup>
                  {/* The category heading is itself a menuitem (valid `role="menu"`
                      child) so its collapse chevron stays interactive without breaking
                      ARIA. The label is the section title; the chevron is the endIcon. */}
                  <DropdownItem
                    variant="default"
                    label={section.title}
                    aria-expanded={!isCollapsed}
                    endIcon={
                      isCollapsed ? (
                        <ChevronRight aria-hidden="true" />
                      ) : (
                        <ChevronDown aria-hidden="true" />
                      )
                    }
                    closeOnClick={false}
                    onClick={() => setCollapsed((c) => ({ ...c, [section.title]: !isCollapsed }))}
                  />
                  {!isCollapsed
                    ? items.map((i) => (
                        <DropdownCheckboxItem
                          key={i.key}
                          icon={i.icon}
                          label={i.label}
                          checked={Boolean(checked[i.key])}
                          onCheckedChange={toggle(i.key)}
                        />
                      ))
                    : null}
                  {/* "View all" is its own menuitem with link emphasis: no hover
                      background + cursor-pointer. */}
                  {!isCollapsed && section.viewAll ? (
                    <DropdownItem
                      variant="default"
                      emphasis="link"
                      label={<span className="text-accent-primary">View all</span>}
                      closeOnClick={false}
                    />
                  ) : null}
                </DropdownGroup>
              </React.Fragment>
            );
          })}
        </DropdownContent>
      </Dropdown>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and confirm multiple sections render", async () => {
      await openMenu(canvas, "Filters");
      await waitFor(() => expect(findItem("menuitemcheckbox", "Urgent")).toBeDefined());
      await expect(findItem("menuitemcheckbox", "Backlog")).toBeDefined();
      await expect(findItem("menuitemcheckbox", "David Wilson")).toBeDefined();
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
 * Demo 9 — **DisplayProperties**. A selectable pill/chip group at the top, a
 * single-select section (Group by, via `Radio`), and a checkbox-toggle footer.
 *
 * NOTE: the selectable pill/chip group is a minimal local primitive — propel has no
 * "chip" component yet (flagged in the PR).
 */
export const DisplayProperties: Story = {
  parameters: {
    a11y: {
      // This is a settings *panel*, not an ARIA menu, so DropdownContent is rendered
      // with role="group". Base UI's menu popup still injects `aria-orientation` (a
      // composite-widget attribute), which axe disallows on role="group". The attribute
      // is a framework artifact, not author markup; suppress just that rule here.
      // A dedicated non-menu Popover surface (flagged in the PR) would remove the need.
      config: { rules: [{ id: "aria-allowed-attr", enabled: false }] },
    },
  },
  render: function DisplayPropertiesStory() {
    const PILLS = ["ID", "Work item type", "Assignee", "Start date", "Due date", "Labels"];
    const [pills, setPills] = React.useState<Record<string, boolean>>({
      ID: true,
      "Work item type": true,
      Assignee: true,
      "Due date": true,
    });
    const [groupBy, setGroupBy] = React.useState("state");
    const [toggles, setToggles] = React.useState<Record<string, boolean>>({});
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Display
        </DropdownTrigger>
        {/* role="group": this is a settings panel (pills + radios + toggles), not a menu */}
        <DropdownContent width="md" role="group" aria-label="Display options">
          <PanelLabel>Display Properties</PanelLabel>
          <div className="flex flex-wrap gap-1.5 px-2 py-1.5">
            {PILLS.map((p) => (
              <DisplayPill
                key={p}
                label={p}
                selected={Boolean(pills[p])}
                onClick={() => setPills((s) => ({ ...s, [p]: !s[p] }))}
              />
            ))}
          </div>
          <DropdownSeparator />
          <PanelLabel>Group by</PanelLabel>
          <RadioGroup value={groupBy} onValueChange={(v) => setGroupBy(String(v))}>
            {["Priority", "State", "Cycle", "Labels"].map((g) => (
              <PanelRadioRow key={g} value={g.toLowerCase()} label={g} />
            ))}
          </RadioGroup>
          <DropdownSeparator />
          <div className="flex flex-col gap-2 px-2 py-1.5">
            <PanelCheckboxRow
              label="Show sub-work items"
              checked={Boolean(toggles.sub)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, sub: next }))}
            />
            <PanelCheckboxRow
              label="Show empty groups"
              checked={Boolean(toggles.empty)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, empty: next }))}
            />
          </div>
        </DropdownContent>
      </Dropdown>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and toggle a property pill", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Display" }));
      await waitFor(() =>
        expect(document.body.querySelector('[role="group"]')).toBeInTheDocument(),
      );
      const labelsPill = (await waitFor(() =>
        Array.from(document.body.querySelectorAll("button[aria-pressed]")).find(
          (b) => b.textContent === "Labels",
        ),
      )) as HTMLElement;
      await expect(labelsPill).toHaveAttribute("aria-pressed", "false");
      await userEvent.click(labelsPill);
      await waitFor(() => expect(labelsPill).toHaveAttribute("aria-pressed", "true"));
    });
  },
};

// A minimal sort-direction toggle (asc/desc). propel has no ButtonGroup yet — local
// to this demo and flagged in the PR.
function SortDirectionToggle({
  value,
  onValueChange,
}: {
  value: "asc" | "desc";
  onValueChange: (v: "asc" | "desc") => void;
}) {
  return (
    <span className="inline-flex overflow-hidden rounded-md border border-subtle">
      <button
        type="button"
        aria-label="Sort ascending"
        aria-pressed={value === "asc"}
        onClick={(e) => {
          e.stopPropagation();
          onValueChange("asc");
        }}
        className={`flex size-5 items-center justify-center outline-none ${
          value === "asc" ? "bg-accent-subtle text-accent-primary" : "text-icon-tertiary"
        }`}
      >
        <ArrowUpDown className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label="Sort descending"
        aria-pressed={value === "desc"}
        onClick={(e) => {
          e.stopPropagation();
          onValueChange("desc");
        }}
        className={`flex size-5 items-center justify-center border-l border-subtle outline-none ${
          value === "desc" ? "bg-accent-subtle text-accent-primary" : "text-icon-tertiary"
        }`}
      >
        <ArrowDownUp className="size-3.5" />
      </button>
    </span>
  );
}

/**
 * Demo 10 — **DisplayAccordion**. Collapsible sections; an open "Order by" section is
 * a single-select `Radio` sort list with a sort-direction toggle on the selected row,
 * plus checkbox toggles in a footer.
 *
 * NOTE: the sort-direction toggle (`ButtonGroup`) is a minimal local primitive —
 * flagged in the PR.
 */
export const DisplayAccordion: Story = {
  parameters: {
    a11y: {
      // Same as DisplayProperties: a settings panel (role="group") where Base UI's
      // menu popup injects an `aria-orientation` that axe disallows on role="group".
      // Framework artifact, not author markup — suppress just that rule.
      config: { rules: [{ id: "aria-allowed-attr", enabled: false }] },
    },
  },
  render: function DisplayAccordionStory() {
    const [open, setOpen] = React.useState<string | null>("order");
    const [order, setOrder] = React.useState("priority");
    const [dir, setDir] = React.useState<"asc" | "desc">("asc");
    const [toggles, setToggles] = React.useState<Record<string, boolean>>({});
    const SECTIONS = ["Display Properties", "Group by", "Sub Group by", "Order by"];
    const ORDER = ["Manual - Rank", "Last created", "Last updated", "Priority", "Due date"];
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Display options
        </DropdownTrigger>
        {/* role="group": a settings panel (accordion + radios + toggles), not a menu */}
        <DropdownContent width="md" role="group" aria-label="Display options">
          {SECTIONS.map((title) => {
            const key = title.split(" ")[0].toLowerCase();
            const isOpen = open === key;
            return (
              <div key={title}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="flex h-8 w-full items-center gap-2 rounded-sm px-2 text-13 text-secondary outline-none hover:bg-layer-transparent-hover"
                >
                  <span className="min-w-0 flex-1 truncate text-left">{title}</span>
                  {isOpen ? (
                    <ChevronUp className="size-4 shrink-0 text-icon-tertiary" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-icon-tertiary" />
                  )}
                </button>
                {isOpen && key === "order" ? (
                  // Items within an expanded category sit flush (0 spacing): collapse
                  // RadioGroup's default row gap from the parent.
                  <div className="[&>[role=radiogroup]]:gap-0">
                    <RadioGroup value={order} onValueChange={(v) => setOrder(String(v))}>
                      {ORDER.map((o) => {
                        const v = o.toLowerCase();
                        return (
                          <PanelRadioRow
                            key={o}
                            value={v}
                            label={o}
                            trailing={
                              order === v ? (
                                <SortDirectionToggle value={dir} onValueChange={setDir} />
                              ) : undefined
                            }
                          />
                        );
                      })}
                    </RadioGroup>
                  </div>
                ) : null}
              </div>
            );
          })}
          <DropdownSeparator />
          <div className="flex flex-col gap-2 px-2 py-1.5">
            <PanelCheckboxRow
              label="Show sub-work items"
              checked={Boolean(toggles.sub)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, sub: next }))}
            />
            <PanelCheckboxRow
              label="Show empty groups"
              checked={Boolean(toggles.empty)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, empty: next }))}
            />
          </div>
        </DropdownContent>
      </Dropdown>
    );
  },
  play: async ({ canvas, step }) => {
    const findHeader = (text: string) =>
      Array.from(document.body.querySelectorAll("button[aria-expanded]")).find((b) =>
        b.textContent?.includes(text),
      ) as HTMLElement | undefined;
    const hasText = (text: string) =>
      Boolean(document.body.querySelector('[role="group"]')?.textContent?.includes(text));

    await step("open the panel with Order by expanded", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Display options" }));
      await waitFor(() =>
        expect(document.body.querySelector('[role="group"]')).toBeInTheDocument(),
      );
      await waitFor(() => expect(hasText("Last created")).toBe(true));
    });

    await step("collapse and re-expand the Order by section", async () => {
      await userEvent.click(findHeader("Order by") as HTMLElement);
      await waitFor(() => expect(hasText("Last created")).toBe(false));
      await userEvent.click(findHeader("Order by") as HTMLElement);
      await waitFor(() => expect(hasText("Last created")).toBe(true));
    });
  },
};

/**
 * Demo 11 — **EmptyState**. Searching filters the list; when nothing matches, the menu
 * shows a "No matching results" message instead of items.
 */
export const EmptyState: Story = {
  render: function EmptyStateStory() {
    const [query, setQuery] = React.useState("Product");
    const visible = STATUSES.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Dropdown defaultOpen>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Status
        </DropdownTrigger>
        <DropdownContent
          width="sm"
          search={<DropdownSearch value={query} onValueChange={setQuery} />}
        >
          {visible.length > 0 ? (
            visible.map((s) => (
              <DropdownItem key={s.key} variant="default" icon={s.icon} label={s.label} />
            ))
          ) : (
            <div className="px-2 py-2 text-13 text-tertiary">No matching results</div>
          )}
        </DropdownContent>
      </Dropdown>
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
 * Demo 12 — **Submenu**. Rows carry a trailing count `Badge` and a chevron; hovering
 * one opens a nested submenu of options (built on `DropdownSub`).
 */
export const Submenu: Story = {
  parameters: {
    a11y: {
      // Base UI renders each submenu trigger as a `<span aria-owns>` inside the parent
      // `role="menu"` — its own (valid) pattern for associating the trigger with the
      // nested menu in the a11y tree. axe's aria-required-children flags that span as a
      // disallowed menu child even though it is the framework's prescribed markup; the
      // submenu trigger keeps `role="menuitem"` + `aria-haspopup="menu"`. Suppress just
      // that rule for this story.
      config: { rules: [{ id: "aria-required-children", enabled: false }] },
    },
  },
  render: () => (
    <Dropdown>
      <DropdownTrigger render={<button type="button" className={triggerClass} />}>
        Filter by
      </DropdownTrigger>
      <DropdownContent width="sm">
        <DropdownSub>
          <DropdownSubTrigger
            label="Priority"
            trailing={
              <Badge magnitude="sm" tone="neutral">
                5
              </Badge>
            }
          />
          <DropdownSubContent width="sm">
            {PRIORITIES.map((p) => (
              <DropdownItem
                key={p.key}
                variant="default"
                icon={p.icon}
                label={p.label}
                closeOnClick={false}
              />
            ))}
          </DropdownSubContent>
        </DropdownSub>
        <DropdownSub>
          <DropdownSubTrigger
            label="State"
            trailing={
              <Badge magnitude="sm" tone="neutral">
                5
              </Badge>
            }
          />
          <DropdownSubContent width="sm">
            {STATUSES.map((s) => (
              <DropdownItem
                key={s.key}
                variant="default"
                icon={s.icon}
                label={s.label}
                closeOnClick={false}
              />
            ))}
          </DropdownSubContent>
        </DropdownSub>
        <DropdownSub>
          <DropdownSubTrigger
            label="Assignee"
            trailing={
              <Badge magnitude="sm" tone="neutral">
                5
              </Badge>
            }
          />
          <DropdownSubContent width="sm">
            {ASSIGNEES.map((a) => (
              <DropdownItem
                key={a.key}
                variant="default"
                icon={<Avatar magnitude="2xs" fallback={initials(a.name)} alt={a.name} />}
                label={a.name}
                closeOnClick={false}
              />
            ))}
          </DropdownSubContent>
        </DropdownSub>
      </DropdownContent>
    </Dropdown>
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
