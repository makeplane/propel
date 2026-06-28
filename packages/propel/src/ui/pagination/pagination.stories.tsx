import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { expect } from "storybook/test";

import {
  Pagination,
  PaginationArrowButton,
  PaginationEllipsis,
  PaginationItem,
  PaginationList,
  PaginationPageButton,
} from "./index";

// UI-tier story: composes the ATOMIC pagination parts (each renders a single element).
// The components-tier `Pagination` story owns the truncation logic, the per-page Menu and the
// range label. Here you lay out the raw slots yourself: the `Pagination` nav wraps a
// `PaginationList`, whose `PaginationItem`s hold prev/next arrows, page-number buttons (the
// current one marked `aria-current="page"`, which drives the selected fill), and the
// non-interactive ellipsis (an icon slot).
const meta = {
  title: "UI/Pagination",
  component: PaginationPageButton,
  subcomponents: {
    Pagination,
    PaginationList,
    PaginationItem,
    PaginationArrowButton,
    PaginationEllipsis,
  },
  args: { children: "1" },
} satisfies Meta<typeof PaginationPageButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const PAGES = [1, 2, 3, 4, 5];

/** A bare pager assembled from the atomic slots: prev/next arrows around a window of page buttons. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Pagination aria-label="Pagination">
      <PaginationList>
        <PaginationItem>
          <PaginationArrowButton aria-label="Go to previous page" disabled>
            <ChevronLeft />
          </PaginationArrowButton>
        </PaginationItem>
        {PAGES.map((n) => (
          <PaginationItem key={n}>
            <PaginationPageButton
              aria-current={n === 1 ? "page" : undefined}
              aria-label={`Go to page ${n}`}
              disabled={n === 1}
            >
              {n}
            </PaginationPageButton>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationArrowButton aria-label="Go to next page">
            <ChevronRight />
          </PaginationArrowButton>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  ),
  play: async ({ canvas }) => {
    // Page 1 is current (pressed fill + aria-current) and the prev arrow is disabled at the start.
    const page1 = canvas.getByRole("button", { name: "Go to page 1" });
    await expect(page1).toHaveAttribute("aria-current", "page");
    await expect(canvas.getByRole("button", { name: "Go to previous page" })).toBeDisabled();
    // The selected fill keys off `aria-current="page"`, not a prop: the current page's
    // background differs from a non-current page button.
    const page2 = canvas.getByRole("button", { name: "Go to page 2" });
    await expect(getComputedStyle(page1).backgroundColor).not.toBe(
      getComputedStyle(page2).backgroundColor,
    );
  },
};

/** A long run truncated with the `PaginationEllipsis` gap marker: `1 2 3 … 100`. */
export const WithEllipsis: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Pagination aria-label="Pagination">
      <PaginationList>
        <PaginationItem>
          <PaginationArrowButton aria-label="Go to previous page">
            <ChevronLeft />
          </PaginationArrowButton>
        </PaginationItem>
        {[1, 2, 3].map((n) => (
          <PaginationItem key={n}>
            <PaginationPageButton
              aria-current={n === 2 ? "page" : undefined}
              aria-label={`Go to page ${n}`}
              disabled={n === 2}
            >
              {n}
            </PaginationPageButton>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis>
            <MoreHorizontal />
          </PaginationEllipsis>
        </PaginationItem>
        <PaginationItem>
          <PaginationPageButton aria-label="Go to page 100">100</PaginationPageButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrowButton aria-label="Go to next page">
            <ChevronRight />
          </PaginationArrowButton>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  ),
};

/**
 * The standalone page-number button. Its pressed/selected fill keys off `aria-current="page"` — the
 * current page is marked `aria-current` (and `disabled` to block re-navigation), so toggling that
 * attribute toggles the selected fill.
 */
export const PageButton: Story = {
  render: (args) => <PaginationPageButton {...args} aria-label="Go to page 1" />,
};
