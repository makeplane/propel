import { Avatar } from "@makeplane/propel/components/avatar";
import { Icon } from "@makeplane/propel/components/icon";
import { MenuContent, MenuItem } from "@makeplane/propel/components/menu";
import {
  Table,
  TableActionCell,
  TableBody,
  TableCell,
  TableEditableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@makeplane/propel/components/table";
import { Pencil, Trash2 } from "lucide-react";
import * as React from "react";

const ROLES = ["Admin", "Member", "Guest"];

const INITIAL = [
  { name: "Astra", email: "astra.terra@example.com", role: "Admin" },
  { name: "Nova", email: "nova.star@example.com", role: "Member" },
  { name: "Lyra", email: "lyra.constellation@example.com", role: "Guest" },
];

export default function RichRowsDemo() {
  const [people, setPeople] = React.useState(INITIAL);
  const setRole = (email: string, role: string) =>
    setPeople((rows) => rows.map((r) => (r.email === email ? { ...r, role } : r)));

  return (
    <Table mode="table">
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
}
