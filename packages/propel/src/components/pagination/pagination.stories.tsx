import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";
import { Pagination } from "./index";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["ai-generated"],
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

/** The current page can render as a spinner while navigating to it is in flight. */
export const Loading: Story = {
  args: { page: 3, pageCount: 25, loading: true },
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
