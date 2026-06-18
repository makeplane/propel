import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent } from "storybook/test";

import { Avatar, AvatarFallback } from "../avatar/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableHeadSort,
} from "./index";

// UI-tier story: composes the ATOMIC table parts (each renders a single table element).
// The components-tier `Table` story shows the ready-made editable/action cells (which compose
// propel's Menu) plus Pagination. Here you assemble the raw structure — Table › Header/Body ›
// Row › Head/Cell — and use the bare sortable `TableHead` (without an attached menu).
const meta = {
  title: "UI/Table",
  component: Table,
  subcomponents: { TableHeader, TableBody, TableRow, TableHead, TableCell },
  args: { variant: "table" },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type Person = { name: string; display: string; email: string; role: string };

const PEOPLE: Person[] = [
  { name: "Chargers", display: "astra", email: "astra.terra@example.com", role: "Admin" },
  { name: "Alpha", display: "nova", email: "nova.star@example.com", role: "Member" },
  { name: "Beta", display: "lyra", email: "lyra.constellation@example.com", role: "Member" },
];

const COLUMNS = ["Name", "Display name", "Email", "Account type"];

/** The standard `table` variant: rounded outer border with row dividers only. */
export const Default: Story = {
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
                <Avatar magnitude="xs" role="img" aria-label={person.name}>
                  <AvatarFallback tone="indigo">{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
              }
            >
              {person.name}
            </TableCell>
            <TableCell>{person.display}</TableCell>
            <TableCell>{person.email}</TableCell>
            <TableCell>{person.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(4);
    // 1 header row + 3 data rows.
    await expect(canvas.getAllByRole("row")).toHaveLength(4);
  },
};

/** The denser `spreadsheet` variant: every cell is fully bordered to form a grid. */
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * A sortable header (`variant="sortable"`): renders the label as a button with a sort chevron and
 * reflects the order through `aria-sort`. Clicking cycles none → asc → desc.
 */
export const Sortable: Story = {
  render: function SortableStory(args) {
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
    await expect(header).toHaveAttribute("aria-sort", "none");
    const button = canvas.getByRole("button", { name: "Name" });
    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "descending");
  },
};

/**
 * A pinned first column (`pinned="start"` on its header + cells) stays put while the rest of the
 * row scrolls sideways inside a width-constrained frame.
 */
export const PinnedColumn: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="w-100">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead variant="default" pinned="start">
              Name
            </TableHead>
            <TableHead variant="default">Display name</TableHead>
            <TableHead variant="default">Email</TableHead>
            <TableHead variant="default">Account type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((person) => (
            <TableRow key={person.email}>
              <TableCell
                pinned="start"
                inlineStartNode={
                  <Avatar magnitude="xs" role="img" aria-label={person.name}>
                    <AvatarFallback tone="indigo">{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              >
                {person.name}
              </TableCell>
              <TableCell>{person.display}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
