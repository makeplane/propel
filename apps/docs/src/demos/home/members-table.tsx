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
  { name: "Astra", role: "Admin" },
  { name: "Nova", role: "Member" },
  { name: "Lyra", role: "Guest" },
];

export default function MembersTableDemo() {
  const [people, setPeople] = React.useState(INITIAL);
  const setRole = (name: string, role: string) =>
    setPeople((rows) => rows.map((r) => (r.name === name ? { ...r, role } : r)));

  return (
    <div className="w-full max-w-80">
      <Table mode="table">
        <TableHeader>
          <TableRow>
            <TableHead pinned="none" label="Name" />
            <TableHead pinned="none" label="Account type" />
            <TableHead pinned="none" label="Actions" visuallyHidden />
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.name}>
              <TableCell
                pinned="none"
                padding="cell"
                startIcon={
                  <Avatar magnitude="xs" alt={person.name} fallback={person.name.charAt(0)} />
                }
              >
                {person.name}
              </TableCell>
              <TableEditableCell value={person.role} aria-label={`Account type for ${person.name}`}>
                <MenuContent>
                  {ROLES.map((role) => (
                    <MenuItem
                      key={role}
                      label={role}
                      selected={role === person.role}
                      onClick={() => setRole(person.name, role)}
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
    </div>
  );
}
