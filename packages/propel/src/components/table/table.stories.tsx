import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent } from "storybook/test";
import {
  Table,
  TableBody,
  TableCell,
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
  subcomponents: { TableHeader, TableBody, TableRow, TableHead, TableCell },
  tags: ["ai-generated"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const PEOPLE = [
  { name: "Ada Lovelace", role: "Admin", email: "ada@plane.so" },
  { name: "Grace Hopper", role: "Member", email: "grace@plane.so" },
  { name: "Linus Torvalds", role: "Guest", email: "linus@plane.so" },
];

/** A small populated table: a header row plus three data rows. */
export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
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
  ),
  play: async ({ canvas }) => {
    // Three column headers + three data rows (plus the header row).
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(3);
    await expect(canvas.getAllByRole("row")).toHaveLength(4);
    await expect(canvas.getAllByRole("cell")).toHaveLength(9);
  },
};

/**
 * A sortable header: `variant="sortable"` renders the label as a button with a
 * sort chevron and reflects the order through `aria-sort`. Clicking cycles
 * none → asc → desc.
 */
export const Sortable: Story = {
  render: () => {
    const [sort, setSort] = React.useState<TableHeadSort>("none");
    const cycle = () => setSort((s) => (s === "none" ? "asc" : s === "asc" ? "desc" : "none"));
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead variant="sortable" sort={sort} onSort={cycle}>
              Name
            </TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
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
    // The sortable header starts at aria-sort="none" and exposes a button.
    const header = canvas.getAllByRole("columnheader")[0];
    await expect(header).toHaveAttribute("aria-sort", "none");
    const button = canvas.getByRole("button", { name: "Name" });
    // Clicking the control toggles the column's sort order.
    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "descending");
  },
};
