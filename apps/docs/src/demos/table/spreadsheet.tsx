import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@makeplane/propel/components/table";

const COLUMNS = ["Name", "Display name", "Email", "Account type"];

const PEOPLE = [
  { name: "Astra", display: "astra", email: "astra.terra@example.com", role: "Admin" },
  { name: "Nova", display: "nova", email: "nova.star@example.com", role: "Member" },
  { name: "Lyra", display: "lyra", email: "lyra.constellation@example.com", role: "Guest" },
];

export default function SpreadsheetDemo() {
  return (
    <Table mode="spreadsheet">
      <TableHeader>
        <TableRow>
          {COLUMNS.map((c) => (
            <TableHead key={c} pinned="none" label={c} />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((person) => (
          <TableRow key={person.email}>
            <TableCell pinned="none" padding="cell">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
