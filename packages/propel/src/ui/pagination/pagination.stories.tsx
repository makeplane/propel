import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { expect } from "storybook/test";

import { PaginationArrowButton, PaginationEllipsis, PaginationPageButton } from "./index";

// UI-tier story: composes the ATOMIC pagination parts (each renders a single styled control).
// The components-tier `Pagination` story owns the truncation logic, the per-page Menu and the
// range label. Here you lay out the raw slots yourself inside a `<nav>` › `<ul>`: prev/next
// arrows, page-number buttons (one marked `current`), and the non-interactive ellipsis.
const meta = {
  title: "UI/Pagination",
  component: PaginationPageButton,
  subcomponents: { PaginationArrowButton, PaginationEllipsis },
  args: { current: false, children: "1" },
} satisfies Meta<typeof PaginationPageButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const PAGES = [1, 2, 3, 4, 5];

/** A bare pager assembled from the atomic slots: prev/next arrows around a window of page buttons. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <nav aria-label="Pagination">
      <ul className="flex items-center gap-0.5">
        <li>
          <PaginationArrowButton aria-label="Go to previous page" disabled>
            <ChevronLeft />
          </PaginationArrowButton>
        </li>
        {PAGES.map((n) => (
          <li key={n}>
            <PaginationPageButton
              current={n === 1}
              aria-current={n === 1 ? "page" : undefined}
              aria-label={`Go to page ${n}`}
              disabled={n === 1}
            >
              {n}
            </PaginationPageButton>
          </li>
        ))}
        <li>
          <PaginationArrowButton aria-label="Go to next page">
            <ChevronRight />
          </PaginationArrowButton>
        </li>
      </ul>
    </nav>
  ),
  play: async ({ canvas }) => {
    // Page 1 is current (pressed fill + aria-current) and the prev arrow is disabled at the start.
    const page1 = canvas.getByRole("button", { name: "Go to page 1" });
    await expect(page1).toHaveAttribute("aria-current", "page");
    await expect(canvas.getByRole("button", { name: "Go to previous page" })).toBeDisabled();
  },
};

/** A long run truncated with the `PaginationEllipsis` gap marker: `1 2 3 … 100`. */
export const WithEllipsis: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <nav aria-label="Pagination">
      <ul className="flex items-center gap-0.5">
        <li>
          <PaginationArrowButton aria-label="Go to previous page">
            <ChevronLeft />
          </PaginationArrowButton>
        </li>
        {[1, 2, 3].map((n) => (
          <li key={n}>
            <PaginationPageButton
              current={n === 2}
              aria-current={n === 2 ? "page" : undefined}
              aria-label={`Go to page ${n}`}
              disabled={n === 2}
            >
              {n}
            </PaginationPageButton>
          </li>
        ))}
        <PaginationEllipsis />
        <li>
          <PaginationPageButton current={false} aria-label="Go to page 100">
            100
          </PaginationPageButton>
        </li>
        <li>
          <PaginationArrowButton aria-label="Go to next page">
            <ChevronRight />
          </PaginationArrowButton>
        </li>
      </ul>
    </nav>
  ),
};

/** The standalone page-number button, with its `current` (pressed) state toggleable via controls. */
export const PageButton: Story = {
  render: (args) => <PaginationPageButton {...args} aria-label="Go to page 1" />,
};
