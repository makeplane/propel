import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, CircleDot, Copy, Pencil, Trash2 } from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor } from "storybook/test";

import {
  Menu,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemContent,
  MenuItemControl,
  MenuItemIcon,
  MenuItemMeta,
  MenuItemSelectedIndicator,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
} from "./index";

// UI-tier story: assemble the ATOMIC menu parts by hand — Root › Trigger, then the
// portal/positioner/popup surface wrapping items, separators and groups. Each row is
// composed from its own single-element parts (icon slot, the title column, the
// trailing check/meta), so the trigger and rows hold no raw layout. The
// components-tier `Menu` story uses the ready-made `MenuContent` plus the rich
// `MenuItem`/`MenuCheckboxItem` rows that compose these same parts for you.
const meta = {
  title: "UI/Menu",
  component: Menu,
  subcomponents: {
    MenuTrigger,
    MenuPortal,
    MenuPositioner,
    MenuPopup,
    MenuItem,
    MenuItemIcon,
    MenuItemContent,
    MenuItemTitleRow,
    MenuItemTitle,
    MenuItemMeta,
    MenuItemSelectedIndicator,
    MenuItemControl,
    MenuCheckboxItem,
    MenuCheckboxItemIndicator,
    MenuSeparator,
    MenuGroup,
    MenuGroupLabel,
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// A plain trigger button styled with propel tokens — the menu primitive ships no
// trigger style, so stories supply one to keep the focus on the menu surface.
const triggerClass =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

/** Assemble the surface by hand: Root › Trigger, then Portal › Positioner › Popup wrapping items. */
export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<button type="button" className={triggerClass} />}>Actions</MenuTrigger>
      <MenuPortal>
        <MenuPositioner sideOffset={4}>
          <MenuPopup surface="raised">
            <MenuItem layout="default">
              <MenuItemIcon>
                <Pencil />
              </MenuItemIcon>
              <MenuItemContent>
                <MenuItemTitleRow>
                  <MenuItemTitle>Edit</MenuItemTitle>
                </MenuItemTitleRow>
              </MenuItemContent>
              <MenuItemMeta>⌘E</MenuItemMeta>
            </MenuItem>
            <MenuItem layout="default">
              <MenuItemIcon>
                <Copy />
              </MenuItemIcon>
              <MenuItemContent>
                <MenuItemTitleRow>
                  <MenuItemTitle>Duplicate</MenuItemTitle>
                </MenuItemTitleRow>
              </MenuItemContent>
              <MenuItemSelectedIndicator>
                <Check />
              </MenuItemSelectedIndicator>
            </MenuItem>
            <MenuSeparator />
            <MenuItem layout="default">
              <MenuItemIcon>
                <Trash2 />
              </MenuItemIcon>
              <MenuItemContent>
                <MenuItemTitleRow>
                  <MenuItemTitle>Delete</MenuItemTitle>
                </MenuItemTitleRow>
              </MenuItemContent>
            </MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Actions" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    const items = document.body.querySelectorAll('[role="menuitem"]');
    await expect(items.length).toBe(3);
  },
};

/** `MenuGroup` + `MenuGroupLabel` title a section; a `MenuSeparator` divides groups. */
export const Grouped: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<button type="button" className={triggerClass} />}>View</MenuTrigger>
      <MenuPortal>
        <MenuPositioner sideOffset={4}>
          <MenuPopup surface="raised">
            <MenuGroup>
              <MenuGroupLabel>Layout</MenuGroupLabel>
              <MenuItem layout="default">
                <MenuItemContent>
                  <MenuItemTitleRow>
                    <MenuItemTitle>List</MenuItemTitle>
                  </MenuItemTitleRow>
                </MenuItemContent>
              </MenuItem>
              <MenuItem layout="default">
                <MenuItemContent>
                  <MenuItemTitleRow>
                    <MenuItemTitle>Board</MenuItemTitle>
                  </MenuItemTitleRow>
                </MenuItemContent>
              </MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuGroup>
              <MenuGroupLabel>Density</MenuGroupLabel>
              <MenuItem layout="default">
                <MenuItemContent>
                  <MenuItemTitleRow>
                    <MenuItemTitle>Comfortable</MenuItemTitle>
                  </MenuItemTitleRow>
                </MenuItemContent>
              </MenuItem>
              <MenuItem layout="default">
                <MenuItemContent>
                  <MenuItemTitleRow>
                    <MenuItemTitle>Compact</MenuItemTitle>
                  </MenuItemTitleRow>
                </MenuItemContent>
              </MenuItem>
            </MenuGroup>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "View" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Layout");
    await expect(document.body).toHaveTextContent("Density");
  },
};

/** `MenuCheckboxItem` + `MenuCheckboxItemIndicator` make a toggleable multi-select row. */
export const Checkboxes: Story = {
  render: function CheckboxesStory() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ comments: true });
    const rows = [
      { key: "comments", label: "Comments" },
      { key: "mentions", label: "Mentions" },
      { key: "updates", label: "Updates" },
    ];
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>Notify</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4}>
            <MenuPopup surface="raised">
              {rows.map((row) => (
                <MenuCheckboxItem
                  key={row.key}
                  checked={Boolean(checked[row.key])}
                  onCheckedChange={(next) => setChecked((c) => ({ ...c, [row.key]: next }))}
                  closeOnClick={false}
                >
                  <MenuItemContent>
                    <MenuItemTitleRow>
                      <MenuItemTitle>{row.label}</MenuItemTitle>
                    </MenuItemTitleRow>
                  </MenuItemContent>
                  <MenuCheckboxItemIndicator>
                    <CircleDot aria-hidden="true" />
                  </MenuCheckboxItemIndicator>
                </MenuCheckboxItem>
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    );
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Notify" }));
    const findRow = (text: string) =>
      Array.from(document.body.querySelectorAll('[role="menuitemcheckbox"]')).find((el) =>
        el.textContent?.includes(text),
      ) as HTMLElement | undefined;
    const row = (await waitFor(() => {
      const found = findRow("Mentions");
      if (found == null) throw new Error("Mentions row not mounted yet");
      return found;
    })) as HTMLElement;
    await expect(row).toHaveAttribute("aria-checked", "false");
    await userEvent.click(row);
    await waitFor(() => expect(findRow("Mentions")).toHaveAttribute("aria-checked", "true"));
  },
};
