import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronsUpDown, ChevronUp, Ellipsis } from "lucide-react";
import { expect } from "storybook/test";

import { NodeSlot } from "../../internal/node-slot";
import { Avatar, AvatarFallback } from "../avatar/index";
import {
  Table,
  TableBody,
  TableCell,
  TableCellContent,
  TableCellLayout,
  TableCellTrigger,
  TableCellTriggerIndicator,
  TableCellTriggerLabel,
  TableHead,
  TableHeader,
  TableHeadSortIndicator,
  TableHeadSortTrigger,
  TableHeadTitle,
  TableRow,
  TableScrollArea,
  TableScrollAreaViewport,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled table parts render
// DIRECTLY — no Base UI grafts — with the scroll frame laid out statically (its scrolling is the
// Base UI ScrollArea, grafted in the components tier) and every visual state pinned statically:
// `aria-sort` on the sortable headers, `data-popup-open=""` on the full-cell triggers (the
// attribute Base UI's Menu trigger would set), the native `disabled`, and `:hover` forced by the
// pseudo-states addon. Sorting, menus, pagination, and keyboard behavior are demonstrated AND
// tested in the components-tier story (Components/Table).
const meta = {
  title: "Elements/Table",
  component: Table,
  subcomponents: {
    TableScrollArea,
    TableScrollAreaViewport,
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
    TableCellTrigger,
    TableCellTriggerLabel,
    TableCellTriggerIndicator,
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type Person = {
  name: string;
  display: string;
  email: string;
  role: string;
  joined: string;
};

const PEOPLE: Person[] = [
  {
    name: "Chargers",
    display: "astra",
    email: "astra.terra@example.com",
    role: "Admin",
    joined: "Jan 12, 2024",
  },
  {
    name: "Alpha",
    display: "nova",
    email: "nova.star@example.com",
    role: "Member",
    joined: "Mar 3, 2024",
  },
  {
    name: "Beta",
    display: "lyra",
    email: "lyra.constellation@example.com",
    role: "Member",
    joined: "Aug 21, 2024",
  },
];

const COLUMNS = ["Name", "Display name", "Email", "Account type"];

/**
 * The full anatomy assembled statically in the standard `table` mode (rounded frame, row dividers
 * only): `TableScrollArea` (the hairline frame) holding a `TableScrollAreaViewport` and the `Table`
 * — both are just styled divs here; the Base UI `ScrollArea` grafts the actual scrolling onto them
 * in the components tier. Inside, `TableHeader`/`TableBody` › `TableRow` › `TableHead`/`TableCell`,
 * with each plain cell laying out a leading `NodeSlot` (the avatar) and a truncating
 * `TableCellContent` through `TableCellLayout`. The second row pins the row-hover tint
 * (`hover:bg-layer-2-hover`) via the pseudo-states addon.
 */
export const Default: Story = {
  parameters: { pseudo: { hover: "#table-row-hover" } },
  render: () => (
    <TableScrollArea>
      <TableScrollAreaViewport>
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((c) => (
                <TableHead mode="table" pinned="none" key={c}>
                  <TableHeadTitle>{c}</TableHeadTitle>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {PEOPLE.map((person, index) => (
              <TableRow key={person.email} id={index === 1 ? "table-row-hover" : undefined}>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <NodeSlot>
                      <Avatar magnitude="xs" role="img" aria-label={person.name}>
                        <AvatarFallback tone="indigo">{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </NodeSlot>
                    <TableCellContent>{person.name}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.display}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.email}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.role}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableScrollAreaViewport>
    </TableScrollArea>
  ),
};

/**
 * The other value of the `mode` axis: `spreadsheet` borders every head/cell edge to form a full
 * grid (the `table` mode above draws row dividers only). `mode` sits on each `TableHead` and
 * `TableCell` — the components-tier `Table` shares it via context so it is set once there.
 */
export const Spreadsheet: Story = {
  render: () => (
    <TableScrollArea>
      <TableScrollAreaViewport>
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((c) => (
                <TableHead mode="spreadsheet" pinned="none" key={c}>
                  <TableHeadTitle>{c}</TableHeadTitle>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {PEOPLE.map((person) => (
              <TableRow key={person.email}>
                <TableCell mode="spreadsheet" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.name}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="spreadsheet" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.display}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="spreadsheet" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.email}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="spreadsheet" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.role}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableScrollAreaViewport>
    </TableScrollArea>
  ),
};

/**
 * The scroll frame's own states, side by side: at **rest**, and with the viewport's keyboard-focus
 * ring pinned (`focus-visible:ring-accent-strong`, forced by the pseudo-states addon). In the
 * components tier the Base UI `ScrollArea` makes the viewport focusable so keyboard users can
 * scroll it — the inset ring marks that focus.
 */
export const ScrollFrameFocus: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { focusVisible: "#table-viewport-focus" },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <TableScrollArea>
        <TableScrollAreaViewport>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead mode="table" pinned="none">
                  <TableHeadTitle>Name</TableHeadTitle>
                </TableHead>
                <TableHead mode="table" pinned="none">
                  <TableHeadTitle>Email</TableHeadTitle>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>Chargers</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>astra.terra@example.com</TableCellContent>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableScrollAreaViewport>
      </TableScrollArea>
      <TableScrollArea>
        <TableScrollAreaViewport id="table-viewport-focus">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead mode="table" pinned="none">
                  <TableHeadTitle>Name</TableHeadTitle>
                </TableHead>
                <TableHead mode="table" pinned="none">
                  <TableHeadTitle>Email</TableHeadTitle>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>Chargers</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>astra.terra@example.com</TableCellContent>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableScrollAreaViewport>
      </TableScrollArea>
    </div>
  ),
};

/**
 * Every visual state of a sortable header, pinned statically: a `TableHeadSortTrigger` button wraps
 * the `TableHeadTitle` and a `TableHeadSortIndicator` chevron, while the `<th>` pins the
 * `aria-sort` the components-tier `TableHead` would set — **Rest** (`none`, double chevron),
 * **Hovered** (the trigger's `hover:text-secondary`, forced by the pseudo-states addon),
 * **Ascending** (chevron up), and **Descending** (chevron down). The click/keyboard sort cycle
 * lives in Components/Table.
 */
export const SortStates: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: "#table-sort-trigger-hover" },
  },
  render: () => (
    <TableScrollArea>
      <TableScrollAreaViewport>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead mode="table" pinned="none" aria-sort="none">
                <TableHeadSortTrigger>
                  <TableHeadTitle>Rest</TableHeadTitle>
                  <TableHeadSortIndicator>
                    <ChevronsUpDown />
                  </TableHeadSortIndicator>
                </TableHeadSortTrigger>
              </TableHead>
              <TableHead mode="table" pinned="none" aria-sort="none">
                <TableHeadSortTrigger id="table-sort-trigger-hover">
                  <TableHeadTitle>Hovered</TableHeadTitle>
                  <TableHeadSortIndicator>
                    <ChevronsUpDown />
                  </TableHeadSortIndicator>
                </TableHeadSortTrigger>
              </TableHead>
              <TableHead mode="table" pinned="none" aria-sort="ascending">
                <TableHeadSortTrigger>
                  <TableHeadTitle>Ascending</TableHeadTitle>
                  <TableHeadSortIndicator>
                    <ChevronUp />
                  </TableHeadSortIndicator>
                </TableHeadSortTrigger>
              </TableHead>
              <TableHead mode="table" pinned="none" aria-sort="descending">
                <TableHeadSortTrigger>
                  <TableHeadTitle>Descending</TableHeadTitle>
                  <TableHeadSortIndicator>
                    <ChevronDown />
                  </TableHeadSortIndicator>
                </TableHeadSortTrigger>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PEOPLE.map((person) => (
              <TableRow key={person.email}>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.name}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.display}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.email}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
                <TableCell mode="table" pinned="none" padding="cell">
                  <TableCellLayout>
                    <TableCellContent>{person.role}</TableCellContent>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableScrollAreaViewport>
    </TableScrollArea>
  ),
};

/**
 * Every visual state of the full-cell `TableCellTrigger`, per `layout` — **editable** (a truncating
 * `TableCellTriggerLabel` + trailing chevron `TableCellTriggerIndicator`) and **action** (a
 * centered, icon-only glyph). The host `TableCell` uses `padding="trigger"` so the trigger fills
 * the cell. Rows pin: **Rest**; **Hovered** (`hover:bg-layer-transparent-hover`, forced by the
 * pseudo-states addon); **Open** — `data-popup-open=""`, the attribute Base UI's Menu trigger sets
 * while its menu is open (`bg-layer-transparent-active`); **Selected** — the `selected` axis that
 * keeps the active editable cell tinted; **Disabled** — the native `disabled`, dimming the text and
 * (via the `cell-trigger` group) the indicator glyph. The menus themselves open in
 * Components/Table.
 */
export const CellTriggers: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: ["#table-cell-trigger-hover-editable", "#table-cell-trigger-hover-action"] },
  },
  render: () => (
    <TableScrollArea>
      <TableScrollAreaViewport>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead mode="table" pinned="none">
                <TableHeadTitle>State</TableHeadTitle>
              </TableHead>
              <TableHead mode="table" pinned="none">
                <TableHeadTitle>Account type</TableHeadTitle>
              </TableHead>
              <TableHead mode="table" pinned="none">
                <TableHeadTitle>Actions</TableHeadTitle>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell mode="table" pinned="none" padding="cell">
                <TableCellLayout>
                  <TableCellContent>Rest</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger layout="editable" id="table-cell-trigger-rest">
                  <TableCellTriggerLabel>Admin</TableCellTriggerLabel>
                  <TableCellTriggerIndicator>
                    <ChevronDown />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger layout="action" aria-label="Row actions (rest)">
                  <TableCellTriggerIndicator>
                    <Ellipsis />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell mode="table" pinned="none" padding="cell">
                <TableCellLayout>
                  <TableCellContent>Hovered</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger layout="editable" id="table-cell-trigger-hover-editable">
                  <TableCellTriggerLabel>Admin</TableCellTriggerLabel>
                  <TableCellTriggerIndicator>
                    <ChevronDown />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger
                  layout="action"
                  id="table-cell-trigger-hover-action"
                  aria-label="Row actions (hovered)"
                >
                  <TableCellTriggerIndicator>
                    <Ellipsis />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell mode="table" pinned="none" padding="cell">
                <TableCellLayout>
                  <TableCellContent>Open</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger layout="editable" id="table-cell-trigger-open" data-popup-open="">
                  <TableCellTriggerLabel>Admin</TableCellTriggerLabel>
                  <TableCellTriggerIndicator>
                    <ChevronDown />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger
                  layout="action"
                  data-popup-open=""
                  aria-label="Row actions (open)"
                >
                  <TableCellTriggerIndicator>
                    <Ellipsis />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell mode="table" pinned="none" padding="cell">
                <TableCellLayout>
                  <TableCellContent>Selected</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger layout="editable" selected id="table-cell-trigger-selected">
                  <TableCellTriggerLabel>Admin</TableCellTriggerLabel>
                  <TableCellTriggerIndicator>
                    <ChevronDown />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger layout="action" aria-label="Row actions (selected row)">
                  <TableCellTriggerIndicator>
                    <Ellipsis />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell mode="table" pinned="none" padding="cell">
                <TableCellLayout>
                  <TableCellContent>Disabled</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger layout="editable" disabled>
                  <TableCellTriggerLabel>Admin</TableCellTriggerLabel>
                  <TableCellTriggerIndicator>
                    <ChevronDown />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="trigger">
                <TableCellTrigger layout="action" disabled aria-label="Row actions (disabled)">
                  <TableCellTriggerIndicator>
                    <Ellipsis />
                  </TableCellTriggerIndicator>
                </TableCellTrigger>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableScrollAreaViewport>
    </TableScrollArea>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-popup-open=""` trigger's background (`data-popup-open:bg-layer-transparent-active`) and the
 * `selected` trigger's (`bg-layer-transparent-selected`) both compute away from the resting
 * trigger's. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const CellTriggersCanary: Story = {
  ...CellTriggers,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const backgroundColor = (id: string) => {
      const trigger = canvasElement.querySelector(`#${id}`);
      if (!(trigger instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(trigger).backgroundColor;
    };
    await expect(backgroundColor("table-cell-trigger-open")).not.toBe(
      backgroundColor("table-cell-trigger-rest"),
    );
    await expect(backgroundColor("table-cell-trigger-selected")).not.toBe(
      backgroundColor("table-cell-trigger-rest"),
    );
  },
};

/**
 * The `pinned` axis on heads and cells: the first column pins to the inline **start** and the last
 * to the inline **end**, each carrying its own `layer-2` background and a hairline edge border so
 * scrolled content can't show through. The width-constrained wrapper scrolls sideways — a plain
 * `overflow-x-auto` div standing in for the Base UI `ScrollArea` viewport that supplies the real
 * scrolling in the components tier (Components/Table › StickyHeaderAndColumns).
 */
export const PinnedColumns: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      // A scrollable region must be keyboard-reachable (axe scrollable-region-focusable).
      tabIndex={0}
      role="region"
      aria-label="Pinned columns table"
      className="w-115 overflow-x-auto rounded-lg border border-subtle bg-surface-1"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead mode="table" pinned="start">
              <TableHeadTitle>Name</TableHeadTitle>
            </TableHead>
            <TableHead mode="table" pinned="none">
              <TableHeadTitle>Display name</TableHeadTitle>
            </TableHead>
            <TableHead mode="table" pinned="none">
              <TableHeadTitle>Email</TableHeadTitle>
            </TableHead>
            <TableHead mode="table" pinned="none">
              <TableHeadTitle>Account type</TableHeadTitle>
            </TableHead>
            <TableHead mode="table" pinned="end">
              <TableHeadTitle>Member since</TableHeadTitle>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((person) => (
            <TableRow key={person.email}>
              <TableCell mode="table" pinned="start" padding="cell">
                <TableCellLayout>
                  <NodeSlot>
                    <Avatar magnitude="xs" role="img" aria-label={person.name}>
                      <AvatarFallback tone="indigo">{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </NodeSlot>
                  <TableCellContent>{person.name}</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="cell">
                <TableCellLayout>
                  <TableCellContent>{person.display}</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="cell">
                <TableCellLayout>
                  <TableCellContent>{person.email}</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="none" padding="cell">
                <TableCellLayout>
                  <TableCellContent>{person.role}</TableCellContent>
                </TableCellLayout>
              </TableCell>
              <TableCell mode="table" pinned="end" padding="cell">
                <TableCellLayout>
                  <TableCellContent>{person.joined}</TableCellContent>
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
