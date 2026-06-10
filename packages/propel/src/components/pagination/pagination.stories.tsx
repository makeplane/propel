import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Pagination } from "./index";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=4762-503",
    },
  },
  args: {
    page: 1,
    pageCount: 25,
    onPageChange: () => {},
  },
  // Drive `page` from local state so the controls actually navigate in the canvas.
  render: function Render(args) {
    const [page, setPage] = React.useState(args.page);
    React.useEffect(() => setPage(args.page), [args.page]);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A bare pager: prev/next plus the page-number window with first/last anchors. */
export const Default: Story = {};

/** With the per-page selector and the `1-50 of 250` range label (Figma frame). */
export const WithSelectorAndRange: Story = {
  args: {
    page: 1,
    pageCount: 5,
    pageSize: { value: 50, options: [25, 50, 100], onChange: () => {} },
    range: { current: "1-50", total: 250 },
  },
};

/**
 * The page-size selector is a propel Dropdown: its `layer-3` pill trigger is labeled
 * "50 per page"; clicking it opens the portaled menu of sizes (the current one marked
 * with a check), and picking one reports it through `pageSize.onChange` and updates the
 * trigger. Keyboard works too — ArrowDown opens the menu and arrow+Enter selects.
 */
export const PageSizeSelector: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    page: 1,
    pageCount: 5,
    pageSize: { value: 50, options: [25, 50, 100], onChange: fn() },
    range: { current: "1-50", total: 250 },
  },
  // Drive `pageSize.value` from state so selecting an option visibly updates the
  // trigger, while still spying on the provided `onChange`.
  render: function Render(args) {
    const [value, setValue] = React.useState(args.pageSize?.value ?? 50);
    const spy = args.pageSize?.onChange;
    return (
      <Pagination
        {...args}
        pageSize={{
          value,
          options: args.pageSize?.options ?? [25, 50, 100],
          onChange: (next) => {
            spy?.(next);
            setValue(next);
          },
        }}
      />
    );
  },
  play: async ({ args, canvas, step }) => {
    // The portaled menu renders outside the story canvas, so query the document body.
    const body = within(document.body);
    const onChange = args.pageSize?.onChange as ReturnType<typeof fn>;

    await step("the trigger is a labeled button showing the current size", async () => {
      const trigger = canvas.getByRole("button", { name: /50 per page/i });
      await expect(trigger).toBeInTheDocument();
    });

    await step("clicking the trigger opens the page-size menu", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /50 per page/i }));
      await waitFor(() => expect(body.getByRole("menu")).toBeInTheDocument());
      // All sizes are listed as menu items.
      for (const n of [25, 50, 100]) {
        await expect(body.getByRole("menuitem", { name: String(n) })).toBeInTheDocument();
      }
    });

    await step("selecting a size reports it and updates the trigger", async () => {
      await userEvent.click(body.getByRole("menuitem", { name: "100" }));
      await expect(onChange).toHaveBeenLastCalledWith(100);
      await waitFor(() =>
        expect(canvas.getByRole("button", { name: /100 per page/i })).toBeInTheDocument(),
      );
    });

    await step("keyboard: ArrowDown opens the menu, then arrows + Enter select", async () => {
      const trigger = canvas.getByRole("button", { name: /100 per page/i });
      trigger.focus();
      await expect(trigger).toHaveFocus();
      // ArrowDown opens the menu and highlights the first item (25).
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() => expect(body.getByRole("menu")).toBeInTheDocument());
      await waitFor(() =>
        expect(body.getByRole("menuitem", { name: "25" })).toHaveAttribute("data-highlighted"),
      );
      // ArrowDown moves the highlight to the second item (50); Enter selects it.
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() =>
        expect(body.getByRole("menuitem", { name: "50" })).toHaveAttribute("data-highlighted"),
      );
      await userEvent.keyboard("{Enter}");
      await expect(onChange).toHaveBeenLastCalledWith(50);
      await waitFor(() =>
        expect(canvas.getByRole("button", { name: /50 per page/i })).toBeInTheDocument(),
      );
    });
  },
};

/**
 * The four truncation layouts the design derives from where the current page sits:
 * all pages visible, near the start, in the middle, and near the end — shown here
 * with the selector + range to match the Figma frame exactly.
 */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Pagination
        page={1}
        pageCount={5}
        onPageChange={() => {}}
        pageSize={{ value: 50, options: [25, 50, 100], onChange: () => {} }}
        range={{ current: "1-50", total: 250 }}
        labels={{ root: "All pages visible" }}
      />
      <Pagination
        page={1}
        pageCount={100}
        onPageChange={() => {}}
        pageSize={{ value: 50, options: [25, 50, 100], onChange: () => {} }}
        range={{ current: "1-50", total: 5000 }}
        labels={{ root: "Near start" }}
      />
      <Pagination
        page={45}
        pageCount={100}
        onPageChange={() => {}}
        pageSize={{ value: 50, options: [25, 50, 100], onChange: () => {} }}
        range={{ current: "2000-2050", total: 5000 }}
        labels={{ root: "Middle" }}
      />
      <Pagination
        page={100}
        pageCount={100}
        onPageChange={() => {}}
        pageSize={{ value: 50, options: [25, 50, 100], onChange: () => {} }}
        range={{ current: "4951-5000", total: 5000 }}
        labels={{ root: "Near end" }}
      />
    </div>
  ),
};

/**
 * Three-digit page numbers must render in full. The slot keeps its 24px minimum so
 * single digits stay square, but grows to fit wider content — `100` is not clipped.
 */
export const ThreeDigit: Story = {
  args: { page: 100, pageCount: 100 },
};

/** The current page can render as a spinner while navigating to it is in flight. */
export const Loading: Story = {
  args: { page: 3, pageCount: 25, loading: true },
};

/**
 * A single skipped page is rendered as its own number rather than hidden behind an
 * ellipsis: with `pageCount=8, page=4` the gap on the leading side is exactly one
 * page (page 2), so the run reads `1 2 3 4 5 … 8` — page 2 stays reachable and only
 * the 2+-page trailing gap (pages 6, 7) collapses to a `…`.
 */
export const SingleGap: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { page: 4, pageCount: 8 },
  play: async ({ canvas }) => {
    // The lone skipped page on the leading side is shown, not ellided.
    await expect(canvas.getByRole("button", { name: "Go to page 2" })).toBeInTheDocument();
    // The 2+-page trailing gap (pages 6 and 7) collapses to a single ellipsis.
    await expect(canvas.queryByRole("button", { name: "Go to page 6" })).not.toBeInTheDocument();
    await expect(canvas.queryByRole("button", { name: "Go to page 7" })).not.toBeInTheDocument();
    // Anchors and window are present: 1 2 3 4 5 … 8.
    for (const n of [1, 3, 4, 5, 8]) {
      await expect(canvas.getByRole("button", { name: `Go to page ${n}` })).toBeInTheDocument();
    }
  },
};

/**
 * Behavioral checks: the nav landmark is named, the current page is marked
 * `aria-current` and disabled, the previous button is disabled at the first page,
 * and activating a page number reports the new page through `onPageChange`.
 */
export const Behavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { page: 1, pageCount: 25 },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();

    // At page 1 the previous button is disabled and page 1 is current.
    await expect(canvas.getByRole("button", { name: "Go to previous page" })).toBeDisabled();
    const page1 = canvas.getByRole("button", { name: "Go to page 1" });
    await expect(page1).toHaveAttribute("aria-current", "page");
    await expect(page1).toBeDisabled();

    // Navigating to page 2 moves the current marker.
    await userEvent.click(canvas.getByRole("button", { name: "Go to page 2" }));
    await expect(canvas.getByRole("button", { name: "Go to page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(canvas.getByRole("button", { name: "Go to previous page" })).toBeEnabled();
  },
};

/**
 * Keyboard operation: Tab reaches the prev button and the page-number buttons, and
 * Enter / Space activate a focused page button — each reporting the target page
 * through `onPageChange`. The disabled current page and the disabled prev/next ends
 * are skipped by Tab (not focusable) and never fire `onPageChange`.
 */
export const KeyboardNavigation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { page: 3, pageCount: 25, onPageChange: fn() },
  // Spy on `onPageChange` while still driving `page` from state so the current
  // marker / disabled-end behaviour stays live as we navigate.
  render: function Render(args) {
    const [page, setPage] = React.useState(args.page);
    React.useEffect(() => setPage(args.page), [args.page]);
    const spy = args.onPageChange as (next: number) => void;
    const onPageChange = (next: number) => {
      spy(next);
      setPage(next);
    };
    return <Pagination {...args} page={page} onPageChange={onPageChange} />;
  },
  play: async ({ args, canvas, step }) => {
    const onPageChange = args.onPageChange as ReturnType<typeof fn>;

    // Landmark + list semantics: the controls live in a named <nav> wrapping a list.
    const nav = canvas.getByRole("navigation", { name: "Pagination" });
    await expect(nav).toBeInTheDocument();
    await expect(canvas.getByRole("list")).toBeInTheDocument();
    await expect(canvas.getAllByRole("listitem").length).toBeGreaterThan(0);

    // The current page is marked aria-current and is disabled (not re-activatable).
    const currentPage = canvas.getByRole("button", { name: "Go to page 3" });
    await expect(currentPage).toHaveAttribute("aria-current", "page");
    await expect(currentPage).toBeDisabled();

    await step("Tab reaches prev then the focusable page buttons", async () => {
      const prev = canvas.getByRole("button", { name: "Go to previous page" });
      // Start from the document body so the first Tab lands on the first control.
      (document.activeElement as HTMLElement | null)?.blur();
      await userEvent.tab();
      await expect(prev).toHaveFocus();
      // The disabled current page (3) is not in the tab order; tabbing forward from
      // prev reaches the first focusable page button (1).
      await userEvent.tab();
      await expect(canvas.getByRole("button", { name: "Go to page 1" })).toHaveFocus();
    });

    await step("Enter on a focused page button fires onPageChange with that page", async () => {
      // page 1 is always shown (the first anchor) and is enabled while we sit on 3.
      const page1 = canvas.getByRole("button", { name: "Go to page 1" });
      page1.focus();
      await expect(page1).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await expect(onPageChange).toHaveBeenLastCalledWith(1);
      // page is now 1 → page 1 becomes the current/disabled marker.
      await expect(canvas.getByRole("button", { name: "Go to page 1" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    await step("Space on a focused page button fires onPageChange with that page", async () => {
      // We're on page 1; the last anchor (25) is always shown and enabled. Space
      // activates it the same as Enter / a click.
      const last = canvas.getByRole("button", { name: "Go to page 25" });
      last.focus();
      await expect(last).toHaveFocus();
      await userEvent.keyboard("[Space]");
      await expect(onPageChange).toHaveBeenLastCalledWith(25);
    });

    await step("Next is disabled at the last page and never fires", async () => {
      // Space took us to the last page (25), so Next is now at its bound.
      const next = canvas.getByRole("button", { name: "Go to next page" });
      await expect(next).toBeDisabled();
      onPageChange.mockClear();
      // A disabled button is not focusable and ignores keyboard activation.
      next.focus();
      await expect(next).not.toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await expect(onPageChange).not.toHaveBeenCalled();
    });

    await step("Prev is disabled at the first page and never fires", async () => {
      // Jump back to the first page via its anchor, then assert Prev is dead.
      await userEvent.click(canvas.getByRole("button", { name: "Go to page 1" }));
      const prev = canvas.getByRole("button", { name: "Go to previous page" });
      await expect(prev).toBeDisabled();
      onPageChange.mockClear();
      prev.focus();
      await expect(prev).not.toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await expect(onPageChange).not.toHaveBeenCalled();
    });

    await step("The current page is disabled and not re-activatable", async () => {
      // page is now 1 → page 1 is the aria-current, disabled marker.
      const page1 = canvas.getByRole("button", { name: "Go to page 1" });
      await expect(page1).toHaveAttribute("aria-current", "page");
      await expect(page1).toBeDisabled();
      onPageChange.mockClear();
      page1.focus();
      await expect(page1).not.toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await expect(onPageChange).not.toHaveBeenCalled();
    });
  },
};
