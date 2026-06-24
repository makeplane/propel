import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pencil, Trash2 } from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Avatar } from "../avatar/index";
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
 * The standard **Table** (`variant="table"`): a rounded outer border with row dividers only (no
 * vertical rules). Header on `layer-1`, body on `surface-1`.
 */
export const Default: Story = {
  args: { variant: "table" },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((c) => (
            <TableHead key={c} variant="default">
              {c}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((person) => (
          <TableRow key={person.email}>
            <TableCell
              inlineStartNode={
                <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
              }
            >
              {person.name}
            </TableCell>
            <TableCell>{person.display}</TableCell>
            <TableCell>{person.email}</TableCell>
            <TableCell>{person.role}</TableCell>
            <TableCell>{person.billing}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(5);
    // 1 header row + 4 data rows.
    await expect(canvas.getAllByRole("row")).toHaveLength(5);
    await expect(canvas.getAllByRole("cell")).toHaveLength(20);
  },
};

/**
 * The denser **Spreadsheet** (`variant="spreadsheet"`): the same metrics, but every cell is fully
 * bordered to form a grid (Figma "Spreadsheet").
 */
export const Spreadsheet: Story = {
  args: { variant: "spreadsheet" },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((c) => (
            <TableHead key={c} variant="default">
              {c}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((person) => (
          <TableRow key={person.email}>
            <TableCell
              inlineStartNode={
                <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
              }
            >
              {person.name}
            </TableCell>
            <TableCell>{person.display}</TableCell>
            <TableCell>{person.email}</TableCell>
            <TableCell>{person.role}</TableCell>
            <TableCell>{person.billing}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(5);
    await expect(canvas.getAllByRole("row")).toHaveLength(5);
  },
};

/**
 * A sortable header: `variant="sortable"` renders the label as a button with a sort chevron and
 * reflects the order through `aria-sort`. Clicking cycles none → asc → desc.
 */
export const Sortable: Story = {
  args: { variant: "table" },
  render: (args) => {
    const [sort, setSort] = React.useState<TableHeadSort>("none");
    const cycle = () => setSort((s) => (s === "none" ? "asc" : s === "asc" ? "desc" : "none"));
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead variant="sortable" sort={sort} onSort={cycle}>
              Name
            </TableHead>
            <TableHead variant="default">Account type</TableHead>
            <TableHead variant="default">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                inlineStartNode={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell>{person.role}</TableCell>
              <TableCell>{person.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
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
  args: { variant: "table" },
  render: function EditableCellsStory(args) {
    const [people, setPeople] = React.useState(PEOPLE);
    const [selectedEmail, setSelectedEmail] = React.useState<string | null>(null);
    const setRole = (email: string, role: string) =>
      setPeople((rows) => rows.map((r) => (r.email === email ? { ...r, role } : r)));
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead variant="default">Name</TableHead>
            <TableHead variant="default">Email</TableHead>
            <TableHead variant="default">Account type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                inlineStartNode={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell>{person.email}</TableCell>
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
                      emphasis="default"
                      key={role}
                      variant="default"
                      selected={role === person.role}
                      onClick={() => setRole(person.email, role)}
                    >
                      {role}
                    </MenuItem>
                  ))}
                </MenuContent>
              </TableEditableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
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
  args: { variant: "table" },
  render: (args) => {
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
              <TableHead variant="default">Name</TableHead>
              <TableHead variant="default">Email</TableHead>
              <TableHead variant="default">Account type</TableHead>
              <TableHead variant="default">Billing status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((person) => (
              <TableRow key={person.email}>
                <TableCell
                  inlineStartNode={
                    <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                  }
                >
                  {person.name}
                </TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.role}</TableCell>
                <TableCell>{person.billing}</TableCell>
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
  args: { variant: "table" },
  parameters: { controls: { disable: true } },
  render: function RichRowsStory(args) {
    const [people, setPeople] = React.useState(PEOPLE);
    const setRole = (email: string, role: string) =>
      setPeople((rows) => rows.map((r) => (r.email === email ? { ...r, role } : r)));
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead variant="default">Name</TableHead>
            <TableHead variant="default">Email</TableHead>
            <TableHead variant="default">Account type</TableHead>
            <TableHead variant="default">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                inlineStartNode={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell>{person.email}</TableCell>
              <TableEditableCell value={person.role} aria-label={`Account type for ${person.name}`}>
                <MenuContent>
                  {ROLES.map((role) => (
                    <MenuItem
                      emphasis="default"
                      key={role}
                      variant="default"
                      selected={role === person.role}
                      onClick={() => setRole(person.email, role)}
                    >
                      {role}
                    </MenuItem>
                  ))}
                </MenuContent>
              </TableEditableCell>
              <TableActionCell aria-label={`Options for ${person.name}`}>
                <MenuContent>
                  <MenuItem emphasis="default" variant="default" inlineStartNode={<Pencil />}>
                    Edit
                  </MenuItem>
                  <MenuItem emphasis="default" variant="default" inlineStartNode={<Trash2 />}>
                    Delete
                  </MenuItem>
                </MenuContent>
              </TableActionCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
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
  args: { variant: "table" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="h-64 w-115">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead variant="default" pinned="start">
              Name
            </TableHead>
            <TableHead variant="default">Display name</TableHead>
            <TableHead variant="default">Email</TableHead>
            <TableHead variant="default">Account type</TableHead>
            <TableHead variant="default">Billing status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DIRECTORY.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                pinned="start"
                inlineStartNode={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell>{person.display}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.role}</TableCell>
              <TableCell>{person.billing}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
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
  args: { variant: "table" },
  render: function SortableKeyboardStory(args) {
    const [sort, setSort] = React.useState<TableHeadSort>("none");
    const cycle = () => setSort((s) => (s === "none" ? "asc" : s === "asc" ? "desc" : "none"));
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead variant="sortable" sort={sort} onSort={cycle}>
              Name
            </TableHead>
            <TableHead variant="default">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                inlineStartNode={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableCell>{person.email}</TableCell>
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
  args: { variant: "table" },
  render: function EditableCellKeyboardStory(args) {
    const [role, setRole] = React.useState("Admin");
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead variant="default">Name</TableHead>
            <TableHead variant="default">Account type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Chargers</TableCell>
            <TableEditableCell value={role} aria-label="Account type for Chargers">
              <MenuContent>
                {ROLES.map((r) => (
                  <MenuItem
                    emphasis="default"
                    key={r}
                    variant="default"
                    selected={r === role}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </MenuItem>
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
