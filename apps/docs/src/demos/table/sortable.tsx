import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  type TableHeadSort,
  TableHeader,
  TableRow,
} from "@makeplane/propel/components/table";
import * as React from "react";

const PEOPLE = [
  { name: "Astra", email: "astra.terra@example.com", role: "Admin" },
  { name: "Nova", email: "nova.star@example.com", role: "Member" },
  { name: "Lyra", email: "lyra.constellation@example.com", role: "Guest" },
];

export default function SortableDemo() {
  const [sort, setSort] = React.useState<TableHeadSort>("none");
  const cycle = () => setSort((s) => (s === "none" ? "asc" : s === "asc" ? "desc" : "none"));
  const rows =
    sort === "none"
      ? PEOPLE
      : [...PEOPLE].sort((a, b) => a.name.localeCompare(b.name) * (sort === "asc" ? 1 : -1));

  return (
    <Table mode="table">
      <TableHeader>
        <TableRow>
          <TableHead pinned="none" label="Name" sortable sort={sort} onSort={cycle} />
          <TableHead pinned="none" label="Email" />
          <TableHead pinned="none" label="Account type" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((person) => (
          <TableRow key={person.email}>
            <TableCell pinned="none" padding="cell">
              {person.name}
            </TableCell>
            <TableCell pinned="none" padding="cell">
              {person.email}
            </TableCell>
            <TableCell pinned="none" padding="cell">
              {person.role}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
