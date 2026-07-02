import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeft, ArrowRight, ChevronDown, LoaderCircle, MoreHorizontal } from "lucide-react";
import { expect } from "storybook/test";

import {
  Pagination,
  PaginationArrowButton,
  PaginationEllipsis,
  PaginationItem,
  PaginationList,
  PaginationPageButton,
  PaginationPerPage,
  PaginationPerPageIndicator,
  PaginationPerPageLabel,
  PaginationPerPageTrigger,
  PaginationRange,
  PaginationRangeCurrent,
  PaginationSpinner,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts, no components-tier import — with every visual state pinned
// statically via the attributes the ready-made / Base UI would set (`aria-current="page"` drives
// the selected fill, `disabled` the dimming, `data-popup-open=""` the per-page chevron rotation,
// `dir="rtl"` the arrow mirroring). The parts carry no variant axes — the Figma "variant" frames
// (all pages visible / near start / middle / near end) are a function of where the current page
// sits, owned by the components tier. Truncation, navigation, keyboard, and Menu behavior are
// demonstrated AND tested in the components-tier story (Components/Pagination).
const meta = {
  title: "Elements/Pagination",
  component: PaginationPageButton,
  subcomponents: {
    Pagination,
    PaginationList,
    PaginationItem,
    PaginationArrowButton,
    PaginationEllipsis,
    PaginationSpinner,
    PaginationPerPage,
    PaginationPerPageTrigger,
    PaginationPerPageIndicator,
    PaginationPerPageLabel,
    PaginationRange,
    PaginationRangeCurrent,
  },
  args: { children: "1" },
} satisfies Meta<typeof PaginationPageButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically (the Figma frame): the `Pagination` nav landmark holding
 * the per-page region (the `layer-3` selector pill with its chevron indicator, followed by the "per
 * page" text), the `1-50 of 250` range label with its emphasized current portion, and the
 * `PaginationList` of controls — prev/next arrows around a truncated near-start run (`1 2 3 … 100`)
 * with the non-interactive `PaginationEllipsis` gap marker. Page 1 pins `aria-current="page"`
 * (which drives the selected fill) plus `disabled`, and the prev arrow is `disabled` at the start —
 * exactly the attributes the ready-made sets.
 */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Pagination aria-label="Pagination">
      <PaginationPerPage>
        <PaginationPerPageTrigger aria-label="50 per page" aria-haspopup="menu">
          50
          <PaginationPerPageIndicator>
            <ChevronDown />
          </PaginationPerPageIndicator>
        </PaginationPerPageTrigger>
        <PaginationPerPageLabel>per page</PaginationPerPageLabel>
      </PaginationPerPage>
      <PaginationRange>
        <PaginationRangeCurrent>1-50</PaginationRangeCurrent>
        {" of "}
        250
      </PaginationRange>
      <PaginationList>
        <PaginationItem>
          <PaginationArrowButton aria-label="Go to previous page" disabled>
            <ArrowLeft aria-hidden />
          </PaginationArrowButton>
        </PaginationItem>
        {[1, 2, 3].map((n) => (
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
          <PaginationEllipsis>
            <MoreHorizontal />
          </PaginationEllipsis>
        </PaginationItem>
        <PaginationItem>
          <PaginationPageButton aria-label="Go to page 100">100</PaginationPageButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrowButton aria-label="Go to next page">
            <ArrowRight aria-hidden />
          </PaginationArrowButton>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  ),
};

/**
 * The standalone page-number button. Its selected fill keys off `aria-current="page"` — the current
 * page is marked `aria-current` (and `disabled` to block re-navigation), so toggling that attribute
 * toggles the fill. The 24px slot keeps a square minimum for single digits and grows with padding
 * for wider content.
 */
export const PageButton: Story = {
  render: (args) => <PaginationPageButton {...args} aria-label="Go to page 1" />,
};

/**
 * Every pinnable state of the three interactive slots:
 *
 * - **Page button** — rest; hover / focus-visible (CSS pseudo-classes, forced by the pseudo-states
 *   addon); current (`aria-current="page"` + `disabled` — the `transparent-active` fill that keeps
 *   `text/primary` over the plain disabled dim); disabled.
 * - **Arrow button** — rest, hover, disabled; the second run pins `dir="rtl"`, mirroring the
 *   directional glyphs so "previous" still points toward the start.
 * - **Per-page trigger** — rest, hover, and open: `data-popup-open=""` (with the
 *   `aria-expanded`/`aria-haspopup` Base UI's Menu trigger sets) rotates the chevron indicator a
 *   half-turn via the trigger's `group`.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#pagination-page-hover", "#pagination-arrow-hover", "#pagination-per-page-hover"],
      focusVisible: "#pagination-page-focus",
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <PaginationPageButton id="pagination-page-rest" aria-label="Go to page 1">
          1
        </PaginationPageButton>
        <PaginationPageButton id="pagination-page-hover" aria-label="Go to page 2">
          2
        </PaginationPageButton>
        <PaginationPageButton id="pagination-page-focus" aria-label="Go to page 3">
          3
        </PaginationPageButton>
        <PaginationPageButton
          id="pagination-page-current"
          aria-label="Go to page 4"
          aria-current="page"
          disabled
        >
          4
        </PaginationPageButton>
        <PaginationPageButton aria-label="Go to page 5" disabled>
          5
        </PaginationPageButton>
      </div>
      <div className="flex items-center gap-3">
        <PaginationArrowButton aria-label="Go to previous page">
          <ArrowLeft aria-hidden />
        </PaginationArrowButton>
        <PaginationArrowButton id="pagination-arrow-hover" aria-label="Go to next page">
          <ArrowRight aria-hidden />
        </PaginationArrowButton>
        <PaginationArrowButton aria-label="Go to previous page (disabled)" disabled>
          <ArrowLeft aria-hidden />
        </PaginationArrowButton>
        <div dir="rtl" className="flex items-center gap-3">
          <PaginationArrowButton aria-label="Go to previous page (RTL)">
            <ArrowLeft aria-hidden />
          </PaginationArrowButton>
          <PaginationArrowButton aria-label="Go to next page (RTL)">
            <ArrowRight aria-hidden />
          </PaginationArrowButton>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <PaginationPerPageTrigger aria-label="25 per page" aria-haspopup="menu">
          25
          <PaginationPerPageIndicator id="pagination-per-page-rest-indicator">
            <ChevronDown />
          </PaginationPerPageIndicator>
        </PaginationPerPageTrigger>
        <PaginationPerPageTrigger
          id="pagination-per-page-hover"
          aria-label="50 per page"
          aria-haspopup="menu"
        >
          50
          <PaginationPerPageIndicator>
            <ChevronDown />
          </PaginationPerPageIndicator>
        </PaginationPerPageTrigger>
        <PaginationPerPageTrigger
          aria-label="100 per page"
          aria-haspopup="menu"
          aria-expanded
          data-popup-open=""
        >
          100
          <PaginationPerPageIndicator id="pagination-per-page-open-indicator">
            <ChevronDown />
          </PaginationPerPageIndicator>
        </PaginationPerPageTrigger>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `aria-current="page"` button's selected fill (`aria-[current=page]:bg-layer-transparent-active`)
 * computes away from the resting button's, and the open trigger's chevron rotates
 * (`group-data-popup-open:rotate-180`) away from the resting chevron's identity transform. Tagged
 * out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const style = (id: string) => {
      const node = canvasElement.querySelector(`#${id}`);
      if (!(node instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(node);
    };
    await expect(style("pagination-page-current").backgroundColor).not.toBe(
      style("pagination-page-rest").backgroundColor,
    );
    // Tailwind v4's rotate-* compiles to the standalone CSS `rotate` property.
    await expect(style("pagination-per-page-open-indicator").rotate).not.toBe(
      style("pagination-per-page-rest-indicator").rotate,
    );
  },
};

/**
 * The in-flight state: while navigating to the current page, it renders the `PaginationSpinner`
 * (spinning whatever glyph you pass, 14px, placeholder tint) in place of its number — pinned here
 * on page 2 alongside its `aria-current="page"` + `disabled` markers.
 */
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PaginationList>
      <PaginationItem>
        <PaginationArrowButton aria-label="Go to previous page">
          <ArrowLeft aria-hidden />
        </PaginationArrowButton>
      </PaginationItem>
      <PaginationItem>
        <PaginationPageButton aria-label="Go to page 1">1</PaginationPageButton>
      </PaginationItem>
      <PaginationItem>
        <PaginationPageButton aria-label="Go to page 2" aria-current="page" disabled>
          <PaginationSpinner>
            <LoaderCircle />
          </PaginationSpinner>
        </PaginationPageButton>
      </PaginationItem>
      <PaginationItem>
        <PaginationPageButton aria-label="Go to page 3">3</PaginationPageButton>
      </PaginationItem>
      <PaginationItem>
        <PaginationArrowButton aria-label="Go to next page">
          <ArrowRight aria-hidden />
        </PaginationArrowButton>
      </PaginationItem>
    </PaginationList>
  ),
};
