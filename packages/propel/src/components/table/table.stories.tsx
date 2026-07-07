import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pencil, Trash2 } from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Avatar } from "../avatar/index";
import { Icon } from "../icon";
import { MenuContent, MenuItem } from "../menu/index";
import { Pagination } from "../pagination/index";
import {
  Table,
  TableActionCell,
  TableBody,
  TableCell,
  TableEditableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableHeadSort,
} from "./index";

const meta = {
  title: "Components/Table",
  component: Table,
  // Table is a compound component; document its parts alongside the root so the
  // args table gets a tab per part and the manifest records the relationship.
  subcomponents: {
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableEditableCell,
    TableActionCell,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=5196-4084",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type Person = { name: string; display: string; email: string; role: string; billing: string };

const PEOPLE: Person[] = [
  {
    name: "Chargers",
    display: "astra",
    email: "astra.terra@example.com",
    role: "Admin",
    billing: "Active",
  },
  {
    name: "Alpha",
    display: "nova",
    email: "nova.star@example.com",
    role: "Member",
    billing: "Inactive",
  },
  {
    name: "Beta",
    display: "lyra",
    email: "lyra.constellation@example.com",
    role: "Member",
    billing: "Active",
  },
  {
    name: "Gamma",
    display: "pulsar",
    email: "vega.pulsar@example.com",
    role: "Guest",
    billing: "Inactive",
  },
];

const COLUMNS = ["Name", "Display name", "Email", "Account type", "Billing status"];

/**
 * The standard **Table** (`mode="table"`): a rounded outer border with row dividers only (no
 * vertical rules). Header on `layer-1`, body on `surface-1`.
 */
export const Default: Story = {
  args: { mode: "table" },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((c) => (
            <TableHead pinned="none" label={c} key={c} />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((person) => (
          <TableRow key={person.email}>
            <TableCell
              pinned="none"
              padding="cell"
              startIcon={
                <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
              }
            >
              {person.name}
            </TableCell>
            <TableCell pinned="none" padding="cell">
              {person.display}
            </TableCell>
            <TableCell pinned="none" padding="cell">
              {person.email}
            </TableCell>
            <TableCell pinned="none" padding="cell">
              {person.role}
            </TableCell>
            <TableCell pinned="none" padding="cell">
              {person.billing}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Interaction test: the table renders 5 column headers, 5 rows (1 header + 4 data), and 20 cells.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(5);
    // 1 header row + 4 data rows.
    await expect(canvas.getAllByRole("row")).toHaveLength(5);
    await expect(canvas.getAllByRole("cell")).toHaveLength(20);
  },
};

/**
 * The denser **Spreadsheet** (`mode="spreadsheet"`): the same metrics, but every cell is fully
 * bordered to form a grid (Figma "Spreadsheet").
 */
export const Spreadsheet: Story = {
  ...Default,
  args: { mode: "spreadsheet" },
};

/**
 * Interaction test: the spreadsheet renders 5 column headers and 5 rows. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const SpreadsheetInteraction: Story = {
  ...Spreadsheet,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(5);
    await expect(canvas.getAllByRole("row")).toHaveLength(5);
  },
};

/**
 * A sortable header: `mode="sortable"` renders the label as a button with a sort chevron and
 * reflects the order through `aria-sort`. Clicking cycles none → asc → desc.
 */
export const Sortable: Story = {
  args: { mode: "table" },
  render: function Render(args) {
    const [sort, setSort] = React.useState<TableHeadSort>("none");
    const cycle = () => setSort((s) => (s === "none" ? "asc" : s === "asc" ? "desc" : "none"));
    const sorted =
      sort === "none"
        ? PEOPLE
        : [...PEOPLE].sort((a, b) => a.name.localeCompare(b.name) * (sort === "asc" ? 1 : -1));
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead pinned="none" label="Name" sortable sort={sort} onSort={cycle} />
            <TableHead pinned="none" label="Account type" />
            <TableHead pinned="none" label="Email" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                pinned="none"
                padding="cell"
                startIcon={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.role}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * **Sortable header (interaction).** Clicking the column-header button cycles the sort none → asc →
 * desc and the `<th>`'s `aria-sort` follows. Tagged so it stays out of the sidebar, docs, and AI
 * manifest while still running under the default `test` tag — so a browsing user never sees the
 * sort change on its own.
 */
export const SortableInteraction: Story = {
  ...Sortable,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const header = canvas.getAllByRole("columnheader")[0];
    await expect(header).toHaveAttribute("aria-sort", "none");
    const button = canvas.getByRole("button", { name: "Name" });
    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "descending");
  },
};

const ROLES = ["Admin", "Member", "Guest"];

/**
 * **Editable cells.** Each "Account type" cell is a `TableEditableCell`: clicking it opens a propel
 * `Menu` to pick a new value, which updates the row in place (Figma "Account type" editable cell).
 * The cell tints on hover and while its menu is open; the last-clicked cell keeps a stronger
 * `selected` tint to mark the active cell. Works in both table variants.
 */
export const EditableCells: Story = {
  args: { mode: "table" },
  render: function Render(args) {
    const [people, setPeople] = React.useState(PEOPLE);
    const [selectedEmail, setSelectedEmail] = React.useState<string | null>(null);
    const setRole = (email: string, role: string) =>
      setPeople((rows) => rows.map((r) => (r.email === email ? { ...r, role } : r)));
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead pinned="none" label="Name" />
            <TableHead pinned="none" label="Email" />
            <TableHead pinned="none" label="Account type" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                pinned="none"
                padding="cell"
                startIcon={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.email}
              </TableCell>
              <TableEditableCell
                value={person.role}
                selected={selectedEmail === person.email}
                aria-label={`Account type for ${person.name}`}
                onOpenChange={(next) => {
                  if (next) setSelectedEmail(person.email);
                }}
              >
                <MenuContent>
                  {ROLES.map((role) => (
                    <MenuItem
                      key={role}
                      label={role}
                      selected={role === person.role}
                      onClick={() => setRole(person.email, role)}
                    />
                  ))}
                </MenuContent>
              </TableEditableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * **Editable cells (interaction).** Clicking an editable cell opens a portaled `Menu`; picking a
 * role updates the cell value in place. Tagged so it stays out of the sidebar, docs, and AI
 * manifest while still running under the default `test` tag — so a browsing user never sees the
 * menu open on its own.
 */
export const EditableCellsInteraction: Story = {
  ...EditableCells,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // The first editable cell opens a menu; picking a role updates the cell value.
    const trigger = canvas.getByRole("button", { name: "Account type for Chargers" });
    await expect(trigger).toHaveTextContent("Admin");
    await userEvent.click(trigger);
    // The menu renders in a portal — query the document body.
    const menu = within(document.body);
    const member = await menu.findByRole("menuitem", { name: "Member" });
    await userEvent.click(member);
    await expect(trigger).toHaveTextContent("Member");
  },
};

// A larger directory so the table has enough rows to page through.
const DIRECTORY: Person[] = Array.from({ length: 23 }, (_, i) => {
  const base = PEOPLE[i % PEOPLE.length];
  return {
    ...base,
    name: `${base.name} ${i + 1}`,
    email: `user${i + 1}@example.com`,
  };
});

/**
 * **With Pagination.** The Table and `Pagination` are separate components: the table renders only
 * the current page of rows, and the pagination below drives `page` and `pageSize`. Changing the
 * page size resets to the first page and the range label updates. This is the designer follow-up on
 * composing the two.
 */
export const WithPagination: Story = {
  args: { mode: "table" },
  render: function Render(args) {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const pageCount = Math.ceil(DIRECTORY.length / pageSize);
    const start = (page - 1) * pageSize;
    const rows = DIRECTORY.slice(start, start + pageSize);
    return (
      // A fixed width so the table does not resize as pages change: the table is
      // `w-full`, so without a constrained container it would shrink-to-fit each page's
      // content and jump in width when paginating.
      <div className="flex w-190 flex-col gap-3">
        <Table {...args}>
          <TableHeader>
            <TableRow>
              <TableHead pinned="none" label="Name" />
              <TableHead pinned="none" label="Email" />
              <TableHead pinned="none" label="Account type" />
              <TableHead pinned="none" label="Billing status" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((person) => (
              <TableRow key={person.email}>
                <TableCell
                  pinned="none"
                  padding="cell"
                  startIcon={
                    <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                  }
                >
                  {person.name}
                </TableCell>
                <TableCell pinned="none" padding="cell">
                  {person.email}
                </TableCell>
                <TableCell pinned="none" padding="cell">
                  {person.role}
                </TableCell>
                <TableCell pinned="none" padding="cell">
                  {person.billing}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          pageSize={{
            value: pageSize,
            options: [5, 10, 25],
            onValueChange: (next) => {
              setPageSize(next);
              setPage(1);
            },
          }}
          range={{
            current: `${start + 1}-${Math.min(start + pageSize, DIRECTORY.length)}`,
            total: DIRECTORY.length,
          }}
        />
      </div>
    );
  },
};

/**
 * **Pagination (interaction).** Advancing the pager swaps the table's rows to the next page. Tagged
 * so it stays out of the sidebar, docs, and AI manifest while still running under the default
 * `test` tag — so a browsing user never sees the rows page on their own.
 */
export const WithPaginationInteraction: Story = {
  ...WithPagination,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // Page 1 shows the first slice; advancing the pagination swaps the table's rows.
    await expect(canvas.getByText("user1@example.com")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Go to next page" }));
    await waitFor(() => expect(canvas.queryByText("user1@example.com")).not.toBeInTheDocument());
    await expect(canvas.getByText("user6@example.com")).toBeInTheDocument();
  },
};

/**
 * **Cell slots + an action cell.** Cells carry a leading `Avatar` (the Name column), an inline
 * editable cell (Account type), and a trailing icon-only `TableActionCell` (the "⋯" that opens a
 * menu of row actions). Actionable cells tint with a `layer-transparent` overlay on hover, distinct
 * from the row's own hover.
 */
export const RichRows: Story = {
  args: { mode: "table" },
  parameters: { controls: { disable: true } },
  render: function Render(args) {
    const [people, setPeople] = React.useState(PEOPLE);
    const setRole = (email: string, role: string) =>
      setPeople((rows) => rows.map((r) => (r.email === email ? { ...r, role } : r)));
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead pinned="none" label="Name" />
            <TableHead pinned="none" label="Email" />
            <TableHead pinned="none" label="Account type" />
            <TableHead pinned="none" label="Actions" visuallyHidden />
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                pinned="none"
                padding="cell"
                startIcon={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.email}
              </TableCell>
              <TableEditableCell value={person.role} aria-label={`Account type for ${person.name}`}>
                <MenuContent>
                  {ROLES.map((role) => (
                    <MenuItem
                      key={role}
                      label={role}
                      selected={role === person.role}
                      onClick={() => setRole(person.email, role)}
                    />
                  ))}
                </MenuContent>
              </TableEditableCell>
              <TableActionCell aria-label={`Options for ${person.name}`}>
                <MenuContent>
                  <MenuItem icon={<Icon icon={Pencil} tint="secondary" />} label="Edit" />
                  <MenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
                </MenuContent>
              </TableActionCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * **Row action menu (interaction).** The trailing `TableActionCell` "⋯" opens a portaled `Menu` of
 * row actions. Tagged so it stays out of the sidebar, docs, and AI manifest while still running
 * under the default `test` tag.
 */
export const RichRowsActionMenu: Story = {
  ...RichRows,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // The trailing action cell opens a row-options menu.
    const trigger = canvas.getByRole("button", { name: "Options for Chargers" });
    await userEvent.click(trigger);
    const menu = within(document.body);
    // The menu opens with a scale-fade, so wait for the items to settle visible
    // (find resolves on mount, which can be mid-animation).
    await waitFor(() => expect(menu.getByRole("menuitem", { name: "Edit" })).toBeVisible());
    await expect(menu.getByRole("menuitem", { name: "Delete" })).toBeVisible();
  },
};

/**
 * **Sticky header + pinned column.** In a height- and width-constrained frame, the header stays
 * pinned to the top on vertical scroll, and the first column (`pinned="start"` on its header +
 * cells) stays put on horizontal scroll.
 */
export const StickyHeaderAndColumns: Story = {
  args: { mode: "table" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="h-64 w-115">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead pinned="start" label="Name" />
            <TableHead pinned="none" label="Display name" />
            <TableHead pinned="none" label="Email" />
            <TableHead pinned="none" label="Account type" />
            <TableHead pinned="none" label="Billing status" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {DIRECTORY.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                pinned="start"
                padding="cell"
                startIcon={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.display}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.email}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.role}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.billing}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * Interaction test: the pinned header is the sticky-column corner — sticky to both the top and the
 * inline-start edge. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const StickyHeaderAndColumnsInteraction: Story = {
  ...StickyHeaderAndColumns,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // The pinned header is the sticky-column corner: sticky to both the top (header)
    // and the inline-start edge (pinned column).
    const nameHeader = canvas.getByRole("columnheader", { name: "Name" });
    await expect(nameHeader).toHaveClass("sticky");
    await expect(nameHeader).toHaveClass("inset-s-0");
    await expect(nameHeader).toHaveClass("top-0");
  },
};

/**
 * **Keyboard: sortable header.** Tab to the sortable column-header button and toggle the sort with
 * the keyboard: each Enter/Space advances the cycle (none → ascending → descending → none) and the
 * `<th>`'s `aria-sort` follows along, while `onSort` fires on every activation. Tagged so it stays
 * out of the sidebar, docs, and AI manifest while still running under the default `test` tag.
 */
export const SortableKeyboard: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { mode: "table" },
  render: function Render(args) {
    const [sort, setSort] = React.useState<TableHeadSort>("none");
    const cycle = () => setSort((s) => (s === "none" ? "asc" : s === "asc" ? "desc" : "none"));
    const sorted =
      sort === "none"
        ? PEOPLE
        : [...PEOPLE].sort((a, b) => a.name.localeCompare(b.name) * (sort === "asc" ? 1 : -1));
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead pinned="none" label="Name" sortable sort={sort} onSort={cycle} />
            <TableHead pinned="none" label="Email" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                pinned="none"
                padding="cell"
                startIcon={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell pinned="none" padding="cell">
                {person.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
  play: async ({ canvas }) => {
    const header = canvas.getAllByRole("columnheader")[0];
    if (!header) throw new Error("expected a sortable column header");
    // Table semantics: the header is a proper `<th scope="col">` that starts unsorted.
    await expect(header.tagName).toBe("TH");
    await expect(header).toHaveAttribute("scope", "col");
    await expect(header).toHaveAttribute("aria-sort", "none");

    const button = canvas.getByRole("button", { name: "Name" });
    // Tab moves focus onto the sort-control button (it's the first focusable element).
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Enter advances the cycle: none → ascending.
    await userEvent.keyboard("{Enter}");
    await expect(header).toHaveAttribute("aria-sort", "ascending");

    // Space advances again: ascending → descending.
    await userEvent.keyboard(" ");
    await expect(header).toHaveAttribute("aria-sort", "descending");

    // Enter once more wraps back to none.
    await userEvent.keyboard("{Enter}");
    await expect(header).toHaveAttribute("aria-sort", "none");
  },
};

/**
 * **Keyboard: editable cell.** Tab/Enter on the editable cell's trigger opens the portaled `Menu`;
 * Arrow Down moves the highlight onto the first item and Enter selects it, updating the cell value
 * in place; Escape closes the menu and returns focus to the cell trigger. The menu is portaled, so
 * it's queried from the document body by its unique item text. Tagged so it stays out of the
 * sidebar, docs, and AI manifest while still running under the default `test` tag.
 */
export const EditableCellKeyboard: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { mode: "table" },
  render: function Render(args) {
    const [role, setRole] = React.useState("Admin");
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead pinned="none" label="Name" />
            <TableHead pinned="none" label="Account type" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell pinned="none" padding="cell">
              Chargers
            </TableCell>
            <TableEditableCell value={role} aria-label="Account type for Chargers">
              <MenuContent>
                {ROLES.map((r) => (
                  <MenuItem key={r} label={r} selected={r === role} onClick={() => setRole(r)} />
                ))}
              </MenuContent>
            </TableEditableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
  play: async ({ canvas }) => {
    const menu = within(document.body);
    const trigger = canvas.getByRole("button", { name: "Account type for Chargers" });
    await expect(trigger).toHaveTextContent("Admin");

    // Tab focuses the cell trigger; Enter opens the portaled menu.
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    // The menu is portaled — find it by its unique item text, not a bare role.
    await waitFor(() => expect(menu.getByRole("menuitem", { name: "Member" })).toBeVisible());

    // Opening with Enter already highlights the first item ("Admin"); one Arrow Down
    // moves the highlight onto "Member", then Enter selects it and the cell updates.
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(trigger).toHaveTextContent("Member");
    // Selecting closed the menu.
    await waitFor(() => expect(menu.queryByRole("menuitem", { name: "Member" })).toBeNull());

    // Reopen with the keyboard, then Escape closes it and restores focus to the trigger.
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(menu.getByRole("menuitem", { name: "Guest" })).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(menu.queryByRole("menuitem", { name: "Guest" })).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};
