import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, CircleDot, Copy, Pencil, Trash2 } from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor } from "storybook/test";

import {
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuGroupLabel,
  MenuItem,
  MenuItemContent,
  MenuItemIcon,
  MenuItemMeta,
  MenuItemIndicator,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuPopup,
  MenuSeparator,
} from "./index";

// elements-tier story (rule 2b): the menu parts are Base-UI-agnostic `useRender` styled elements; Base
// UI's behavior parts graft them via `render`. The Root, Trigger, Portal, Positioner, and Group are
// behavior/structural roles (they live in `components` or are used from Base UI directly), so this
// in-tier story wires them straight from `@base-ui/react`. `meta.component` is a no-variant part so
// Storybook forces no required prop into `args`.
const meta = {
  title: "Elements/Menu",
  component: MenuSeparator,
  subcomponents: {
    MenuPopup,
    MenuItem,
    MenuItemIcon,
    MenuItemContent,
    MenuItemTitleRow,
    MenuItemTitle,
    MenuItemMeta,
    MenuItemIndicator,
    MenuCheckboxItem,
    MenuCheckboxItemIndicator,
    MenuGroupLabel,
  },
} satisfies Meta<typeof MenuSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

// A plain trigger button styled with propel tokens — the menu ships no trigger style, so stories
// supply one to keep the focus on the menu surface.
const triggerClass =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

/** Assemble the surface by hand: Root › Trigger, then Portal › Positioner › Popup wrapping items. */
export const Default: Story = {
  render: () => (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={<button type="button" className={triggerClass} />}>
        Actions
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={4}>
          <BaseMenu.Popup render={<MenuPopup elevation="raised" />}>
            <BaseMenu.Item render={<MenuItem layout="default" />}>
              <MenuItemIcon>
                <Pencil />
              </MenuItemIcon>
              <MenuItemContent>
                <MenuItemTitleRow>
                  <MenuItemTitle>Edit</MenuItemTitle>
                </MenuItemTitleRow>
              </MenuItemContent>
              <MenuItemMeta>⌘E</MenuItemMeta>
            </BaseMenu.Item>
            <BaseMenu.Item render={<MenuItem layout="default" />}>
              <MenuItemIcon>
                <Copy />
              </MenuItemIcon>
              <MenuItemContent>
                <MenuItemTitleRow>
                  <MenuItemTitle>Duplicate</MenuItemTitle>
                </MenuItemTitleRow>
              </MenuItemContent>
              <MenuItemIndicator>
                <Check />
              </MenuItemIndicator>
            </BaseMenu.Item>
            <BaseMenu.Separator render={<MenuSeparator />} />
            <BaseMenu.Item render={<MenuItem layout="default" />}>
              <MenuItemIcon>
                <Trash2 />
              </MenuItemIcon>
              <MenuItemContent>
                <MenuItemTitleRow>
                  <MenuItemTitle>Delete</MenuItemTitle>
                </MenuItemTitleRow>
              </MenuItemContent>
            </BaseMenu.Item>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Actions" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    const items = document.body.querySelectorAll('[role="menuitem"]');
    await expect(items.length).toBe(3);
  },
};

/** `Menu.Group` + a `MenuGroupLabel` title a section; a `MenuSeparator` divides groups. */
export const Grouped: Story = {
  render: () => (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={<button type="button" className={triggerClass} />}>
        View
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={4}>
          <BaseMenu.Popup render={<MenuPopup elevation="raised" />}>
            <BaseMenu.Group>
              <BaseMenu.GroupLabel render={<MenuGroupLabel />}>Layout</BaseMenu.GroupLabel>
              <BaseMenu.Item render={<MenuItem layout="default" />}>
                <MenuItemContent>
                  <MenuItemTitleRow>
                    <MenuItemTitle>List</MenuItemTitle>
                  </MenuItemTitleRow>
                </MenuItemContent>
              </BaseMenu.Item>
              <BaseMenu.Item render={<MenuItem layout="default" />}>
                <MenuItemContent>
                  <MenuItemTitleRow>
                    <MenuItemTitle>Board</MenuItemTitle>
                  </MenuItemTitleRow>
                </MenuItemContent>
              </BaseMenu.Item>
            </BaseMenu.Group>
            <BaseMenu.Separator render={<MenuSeparator />} />
            <BaseMenu.Group>
              <BaseMenu.GroupLabel render={<MenuGroupLabel />}>Density</BaseMenu.GroupLabel>
              <BaseMenu.Item render={<MenuItem layout="default" />}>
                <MenuItemContent>
                  <MenuItemTitleRow>
                    <MenuItemTitle>Comfortable</MenuItemTitle>
                  </MenuItemTitleRow>
                </MenuItemContent>
              </BaseMenu.Item>
              <BaseMenu.Item render={<MenuItem layout="default" />}>
                <MenuItemContent>
                  <MenuItemTitleRow>
                    <MenuItemTitle>Compact</MenuItemTitle>
                  </MenuItemTitleRow>
                </MenuItemContent>
              </BaseMenu.Item>
            </BaseMenu.Group>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  ),
};

export const GroupedInteraction: Story = {
  ...Grouped,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "View" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Layout");
    await expect(document.body).toHaveTextContent("Density");
  },
};

/**
 * `Menu.CheckboxItem` (grafted onto `MenuCheckboxItem`) + a kept-mounted
 * `Menu.CheckboxItemIndicator` (grafted onto `MenuCheckboxItemIndicator`) make a toggleable
 * multi-select row.
 */
export const Checkboxes: Story = {
  render: function Render() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ comments: true });
    const rows = [
      { key: "comments", label: "Comments" },
      { key: "mentions", label: "Mentions" },
      { key: "updates", label: "Updates" },
    ];
    return (
      <BaseMenu.Root>
        <BaseMenu.Trigger render={<button type="button" className={triggerClass} />}>
          Notify
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={4}>
            <BaseMenu.Popup render={<MenuPopup elevation="raised" />}>
              {rows.map((row) => (
                <BaseMenu.CheckboxItem
                  key={row.key}
                  render={<MenuCheckboxItem />}
                  checked={Boolean(checked[row.key])}
                  onCheckedChange={(next) => setChecked((c) => ({ ...c, [row.key]: next }))}
                  closeOnClick={false}
                >
                  <MenuItemContent>
                    <MenuItemTitleRow>
                      <MenuItemTitle>{row.label}</MenuItemTitle>
                    </MenuItemTitleRow>
                  </MenuItemContent>
                  <BaseMenu.CheckboxItemIndicator
                    keepMounted
                    render={<MenuCheckboxItemIndicator />}
                  >
                    <CircleDot aria-hidden="true" />
                  </BaseMenu.CheckboxItemIndicator>
                </BaseMenu.CheckboxItem>
              ))}
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </BaseMenu.Root>
    );
  },
};

export const CheckboxesInteraction: Story = {
  ...Checkboxes,
  tags: ["!dev", "!autodocs", "!manifest"],
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
