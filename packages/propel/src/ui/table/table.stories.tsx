import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { expect, userEvent } from "storybook/test";

import { Avatar, AvatarFallback } from "../avatar/index";
import {
  Table,
  TableBody,
  TableCell,
  TableCellContent,
  TableCellLayout,
  TableCellSlot,
  TableHead,
  TableHeader,
  TableHeadSortIndicator,
  TableHeadSortTrigger,
  TableHeadTitle,
  TableRow,
} from "./index";

// UI-tier story: composes the ATOMIC table parts (each renders a single table element).
// The components-tier `Table` story shows the ready-made `TableHead`/`TableCell` (which compose
// these parts), the editable/action cells (which compose propel's Menu), plus Pagination. Here you
// assemble the raw structure — Table › Header/Body › Row › Head/Cell — and wire the sort control by
// hand from `TableHeadSortTrigger` + `TableHeadSortIndicator`.
const meta = {
  title: "UI/Table",
  component: Table,
  subcomponents: {
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableHeadTitle,
    TableHeadSortTrigger,
    TableHeadSortIndicator,
    TableCell,
    TableCellLayout,
    TableCellContent,
    TableCellSlot,
  },
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
            <TableHead key={c}>
              <TableHeadTitle>{c}</TableHeadTitle>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((person) => (
          <TableRow key={person.email}>
            <TableCell>
              <TableCellLayout>
                <TableCellSlot>
                  <Avatar magnitude="xs" role="img" aria-label={person.name}>
                    <AvatarFallback tone="indigo">{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCellSlot>
                <TableCellContent>{person.name}</TableCellContent>
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                <TableCellContent>{person.display}</TableCellContent>
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                <TableCellContent>{person.email}</TableCellContent>
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                <TableCellContent>{person.role}</TableCellContent>
              </TableCellLayout>
            </TableCell>
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
            <TableHead key={c}>
              <TableHeadTitle>{c}</TableHeadTitle>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((person) => (
          <TableRow key={person.email}>
            <TableCell>
              <TableCellLayout>
                <TableCellContent>{person.name}</TableCellContent>
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                <TableCellContent>{person.display}</TableCellContent>
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                <TableCellContent>{person.email}</TableCellContent>
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                <TableCellContent>{person.role}</TableCellContent>
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

const sortGlyph = { asc: ChevronUp, desc: ChevronDown, none: ChevronsUpDown } as const;
const ariaSort = { asc: "ascending", desc: "descending", none: "none" } as const;
type Sort = keyof typeof sortGlyph;

/**
 * A sortable header, assembled from the atomic parts: a `TableHeadSortTrigger` button wrapping a
 * `TableHeadTitle` and a `TableHeadSortIndicator` chevron, with `aria-sort` on the `<th>`. Clicking
 * cycles none → asc → desc.
 */
export const Sortable: Story = {
  render: function SortableStory(args) {
    const [sort, setSort] = React.useState<Sort>("none");
    const cycle = () => setSort((s) => (s === "none" ? "asc" : s === "asc" ? "desc" : "none"));
    const SortGlyph = sortGlyph[sort];
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead aria-sort={ariaSort[sort]}>
              <TableHeadSortTrigger onClick={cycle}>
                <TableHeadTitle>Name</TableHeadTitle>
                <TableHeadSortIndicator>
                  <SortGlyph />
                </TableHeadSortIndicator>
              </TableHeadSortTrigger>
            </TableHead>
            <TableHead>
              <TableHeadTitle>Email</TableHeadTitle>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((person) => (
            <TableRow key={person.email}>
              <TableCell>
                <TableCellLayout>
                  <TableCellContent>{person.name}</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  <TableCellContent>{person.email}</TableCellContent>
                </TableCellLayout>
              </TableCell>
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
            <TableHead pinned="start">
              <TableHeadTitle>Name</TableHeadTitle>
            </TableHead>
            <TableHead>
              <TableHeadTitle>Display name</TableHeadTitle>
            </TableHead>
            <TableHead>
              <TableHeadTitle>Email</TableHeadTitle>
            </TableHead>
            <TableHead>
              <TableHeadTitle>Account type</TableHeadTitle>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((person) => (
            <TableRow key={person.email}>
              <TableCell pinned="start">
                <TableCellLayout>
                  <TableCellSlot>
                    <Avatar magnitude="xs" role="img" aria-label={person.name}>
                      <AvatarFallback tone="indigo">{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCellSlot>
                  <TableCellContent>{person.name}</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  <TableCellContent>{person.display}</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  <TableCellContent>{person.email}</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  <TableCellContent>{person.role}</TableCellContent>
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
