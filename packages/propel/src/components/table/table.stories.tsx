import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { DropdownContent, DropdownItem } from "../dropdown/index";
import { Pagination } from "../pagination/index";
import {
  Table,
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
  subcomponents: { TableHeader, TableBody, TableRow, TableHead, TableCell, TableEditableCell },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=4017-653",
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
 * The standard **Table** (`variant="table"`): a rounded outer border with row
 * dividers only (no vertical rules). Header on `layer-1`, body on `surface-1`.
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
            <TableCell>{person.name}</TableCell>
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
 * The denser **Spreadsheet** (`variant="spreadsheet"`): the same metrics, but every
 * cell is fully bordered to form a grid (Figma "Spreadsheet").
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
            <TableCell>{person.name}</TableCell>
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
 * A sortable header: `variant="sortable"` renders the label as a button with a
 * sort chevron and reflects the order through `aria-sort`. Clicking cycles
 * none → asc → desc.
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
              <TableCell>{person.name}</TableCell>
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
 * **Editable cells.** Each "Account type" cell is a `TableEditableCell`: clicking it
 * opens a propel `Dropdown` to pick a new value, which updates the row in place
 * (Figma "Account type" editable cell). Works in both table variants.
 */
export const EditableCells: Story = {
  args: { variant: "table" },
  render: (args) => {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.email}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableEditableCell value={person.role} aria-label={`Account type for ${person.name}`}>
                <DropdownContent>
                  {ROLES.map((role) => (
                    <DropdownItem
                      key={role}
                      variant="default"
                      label={role}
                      selected={role === person.role}
                      onClick={() => setRole(person.email, role)}
                    />
                  ))}
                </DropdownContent>
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
 * **With Pagination.** The Table and `Pagination` are separate components: the table
 * renders only the current page of rows, and the pagination below drives `page` and
 * `pageSize`. Changing the page size resets to the first page and the range label
 * updates. This is the designer follow-up on composing the two.
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
      <div className="flex flex-col gap-3">
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
                <TableCell>{person.name}</TableCell>
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
            onChange: (next) => {
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
 * **Keyboard: sortable header.** Tab to the sortable column-header button and toggle
 * the sort with the keyboard: each Enter/Space advances the cycle
 * (none → ascending → descending → none) and the `<th>`'s `aria-sort` follows along,
 * while `onSort` fires on every activation. Tagged so it stays out of the sidebar,
 * docs, and AI manifest while still running under the default `test` tag.
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
              <TableCell>{person.name}</TableCell>
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
 * **Keyboard: editable cell.** Tab/Enter on the editable cell's trigger opens the
 * portaled `Dropdown`; Arrow Down moves the highlight onto the first item and Enter
 * selects it, updating the cell value in place; Escape closes the menu and returns
 * focus to the cell trigger. The menu is portaled, so it's queried from the document
 * body by its unique item text. Tagged so it stays out of the sidebar, docs, and AI
 * manifest while still running under the default `test` tag.
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
              <DropdownContent>
                {ROLES.map((r) => (
                  <DropdownItem
                    key={r}
                    variant="default"
                    label={r}
                    selected={r === role}
                    onClick={() => setRole(r)}
                  />
                ))}
              </DropdownContent>
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
