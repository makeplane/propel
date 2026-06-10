import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { DropdownContent, DropdownItem } from "../dropdown/index";
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
  tags: ["ai-generated"],
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
