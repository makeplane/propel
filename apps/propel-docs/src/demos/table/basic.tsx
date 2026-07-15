import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@makeplane/propel/components/table";

const COLUMNS = ["Name", "Email", "Account type"];

const PEOPLE = [
  { name: "Astra", email: "astra.terra@example.com", role: "Admin" },
  { name: "Nova", email: "nova.star@example.com", role: "Member" },
  { name: "Lyra", email: "lyra.constellation@example.com", role: "Guest" },
];

export default function BasicDemo() {
  return (
    <Table mode="table">
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
