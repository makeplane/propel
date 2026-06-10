import { cva, cx } from "class-variance-authority";
import { ArrowLeft, ArrowRight, ChevronDown, LoaderCircle, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "../dropdown/index";

// Pagination is a single composite navigation control rather than a variant matrix:
// the Figma "variant" axis (All pages visible / Near start / Middle / Near end) is
// purely a function of where the current page sits within the total, so it's derived
// at render time from `page`/`pageCount` — never a prop. What designers can toggle is
// genuinely additive: an optional per-page selector and an optional range label.
//
// Tokens (Figma node 4762-503):
// - page-number button: 24px square, radius/sm (4px), text/13, transparent bg that
//   fills to `layer-transparent-hover` on hover and `layer-transparent-active` when
//   it is the current page; disabled/loading dim to the placeholder/disabled colors.
// - prev/next: 24px square icon buttons, radius/md (6px), 16px arrows. The arrows are
//   directional, so they mirror in RTL via `rtl:-scale-x-100`.
// - ellipsis: a non-interactive 24px slot holding a 14px more-horizontal glyph.
// - per-page selector: a `layer-3` pill, 24px tall, radius/md, "50" + chevron-down,
//   followed by "per page" tertiary text. The pill is the trigger for a propel
//   Dropdown (single-select) whose menu lists the page-size options; picking one
//   reports it through `pageSize.onChange`.

// Shared 24px slot used by page numbers, the prev/next buttons and the ellipsis.
// 24px tall with a 24px minimum width so single digits stay square (per Figma),
// but the slot grows for wider content — multi-digit page numbers like `100` get
// their own width plus horizontal padding rather than clipping a fixed square.
// `radius/sm` for page numbers, `radius/md` for the arrow buttons.
const slotBase = cx(
  "inline-flex h-6 w-auto min-w-6 shrink-0 items-center justify-center px-1",
  "text-13 text-primary outline-none",
);

const pageButtonVariants = cva(
  cx(
    slotBase,
    "rounded-sm bg-layer-transparent",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:pointer-events-none disabled:text-disabled",
  ),
  {
    variants: {
      // The current page reads as pressed: it sits on the `transparent-active` fill
      // (Figma "Selected") and is not interactive. It's marked `disabled` to block
      // re-navigation, but the Figma "Selected" state keeps `text/primary` — so it
      // must override the `disabled:text-disabled` dim that the base applies.
      current: {
        true: "bg-layer-transparent-active disabled:text-primary",
        false: "",
      },
    },
  },
);

const arrowButtonVariants = cva(
  cx(
    slotBase,
    "rounded-md bg-layer-transparent text-icon-secondary",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:pointer-events-none disabled:text-icon-disabled",
    // Prev/next arrows are directional — mirror them under RTL so "previous" always
    // points toward the start of the run.
    "[&_svg]:size-4 [&_svg]:shrink-0 rtl:[&_svg]:-scale-x-100",
  ),
);

// The per-page selector trigger (Figma `4762-503`): a `layer-3` pill, 24px tall,
// `radius/md`, holding the current size + a chevron-down. It's the trigger for the
// page-size Dropdown, so it gets a focus ring and rotates its chevron while the menu
// is open.
const perPageTriggerClass = cx(
  "inline-flex h-6 min-w-10 cursor-default items-center justify-center gap-1 rounded-md px-2",
  "bg-layer-3 text-13 font-medium text-secondary outline-none",
  "hover:bg-layer-3-hover",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
  "[&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-icon-secondary",
  "[&[data-popup-open]_svg]:rotate-180",
);

/** A non-interactive gap marker between distant page numbers. */
function PaginationEllipsis() {
  return (
    <li aria-hidden className={cx(slotBase, "text-icon-placeholder")}>
      <MoreHorizontal className="size-3.5 shrink-0" />
    </li>
  );
}

// Builds the sequence of visible page tokens. Always shows the first and last page;
// shows up to one neighbour either side of the current page; inserts an ellipsis
// only where the run skips 2+ pages. A gap of exactly one page renders that page
// number instead, since a `…` standing in for a single page just hides a reachable
// page. This reproduces the four Figma layouts:
//   1 2 3 4              (all visible)
//   1 2 3 … 100          (near start)
//   1 … 44 45 46 … 100   (middle)
//   1 … 98 99 100        (near end)
type PageToken = number | "ellipsis-start" | "ellipsis-end";

function buildPageTokens(page: number, pageCount: number): PageToken[] {
  // Few enough pages to show them all.
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  // A window of three consecutive pages around the current one (current ± 1). When
  // that window butts up against an end, it shifts inward so the end side always
  // shows three numbers — reproducing Figma's `1 2 3 … 100` / `1 … 98 99 100`.
  let windowStart = page - 1;
  let windowEnd = page + 1;
  if (windowStart < 2) {
    // Near the start: the run abuts the `1` anchor, so show `1 2 3 … last`.
    windowStart = 2;
    windowEnd = 3;
  }
  if (windowEnd > pageCount - 1) {
    // Near the end: the run abuts the `last` anchor, so show `1 … last-2 last-1 last`.
    windowEnd = pageCount - 1;
    windowStart = pageCount - 2;
  }
  const tokens: PageToken[] = [1];
  // Bridge the gap between the `1` anchor and the window. An ellipsis is only worth
  // it when 2+ pages are hidden; a lone skipped page (here, page 2) is rendered as
  // its own number so it isn't buried under `…` — `1 2 3 4 5 …` instead of `1 … 3 …`.
  if (windowStart === 3) tokens.push(2);
  else if (windowStart > 3) tokens.push("ellipsis-start");
  for (let p = windowStart; p <= windowEnd; p++) tokens.push(p);
  // Likewise on the trailing side: a single skipped page (pageCount - 1) is shown
  // rather than hidden behind a trailing ellipsis.
  if (windowEnd === pageCount - 2) tokens.push(pageCount - 1);
  else if (windowEnd < pageCount - 2) tokens.push("ellipsis-end");
  tokens.push(pageCount);
  return tokens;
}

export type PaginationLabels = {
  /** Accessible name for the `<nav>` landmark. */
  root: string;
  /** Accessible name for the previous-page button. */
  previous: string;
  /** Accessible name for the next-page button. */
  next: string;
  /**
   * Accessible name for a page button, given its number. Defaults to e.g.
   * `"Go to page 3"`; the current page is additionally marked `aria-current`.
   */
  page: (page: number) => string;
  /** Visible text on the per-page selector trigger, given the size. Defaults to `"50"`. */
  perPageValue: (pageSize: number) => React.ReactNode;
  /** Trailing text after the per-page selector. Defaults to `"per page"`. */
  perPage: React.ReactNode;
};

const DEFAULT_LABELS: PaginationLabels = {
  root: "Pagination",
  previous: "Go to previous page",
  next: "Go to next page",
  page: (page) => `Go to page ${page}`,
  perPageValue: (pageSize) => String(pageSize),
  perPage: "per page",
};

export type PaginationProps = Omit<
  React.ComponentProps<"nav">,
  "className" | "style" | "children" | "aria-label" | "onChange"
> & {
  /** The current page, 1-based. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called with the target page (1-based) when a control is activated. */
  onPageChange: (page: number) => void;
  /**
   * The current page is rendered as a loading spinner instead of its number — for
   * when navigating to that page is in flight.
   */
  loading?: boolean;
  /**
   * Optional per-page size selector (Figma `50 v  per page`). Provide `value`, the
   * `options`, and `onChange`; omit to hide the selector entirely.
   */
  pageSize?: {
    /** Currently selected page size. */
    value: number;
    /** Selectable page sizes. */
    options: number[];
    /** Called with the chosen page size. */
    onChange: (pageSize: number) => void;
  };
  /**
   * Optional range label shown before the controls (Figma `1-50 of 250`). Provide
   * the already-formatted `current` range and `total`.
   */
  range?: {
    /** The visible range, e.g. `"1-50"` (rendered in the primary text color). */
    current: React.ReactNode;
    /** The total count, e.g. `250` (rendered after `of` in the tertiary color). */
    total: React.ReactNode;
  };
  /** Override the default English accessible names / visible selector text. */
  labels?: Partial<PaginationLabels>;
};

/**
 * Page navigation for a paginated list or table. Renders a `<nav>` landmark holding
 * an optional per-page selector and range label plus an ordered list of page
 * controls: a previous button, first/last anchors with ellipses around a window of
 * pages near the current one, and a next button. The current page is marked
 * `aria-current="page"`; the prev/next ends disable at the bounds and their arrows
 * mirror under RTL.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  loading = false,
  pageSize,
  range,
  labels,
  ...props
}: PaginationProps) {
  const l = { ...DEFAULT_LABELS, ...labels };
  const tokens = buildPageTokens(page, pageCount);
  const atStart = page <= 1;
  const atEnd = page >= pageCount;

  return (
    <nav aria-label={l.root} className="flex items-center gap-4" {...props}>
      {pageSize ? (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {/*
            The selector is the propel Dropdown (single-select): the `layer-3` pill is
            its trigger and the menu lists the page sizes, the current one marked with a
            trailing check. The trigger carries the accessible name (the visible size +
            the visually-hidden "per page"), and picking a size reports it through
            `pageSize.onChange`. Keyboard works via the Dropdown (Enter/ArrowDown opens,
            arrows move, Enter selects).
          */}
          <Dropdown>
            <DropdownTrigger render={<button type="button" className={perPageTriggerClass} />}>
              <span>{l.perPageValue(pageSize.value)}</span>
              <span className="sr-only">{l.perPage}</span>
              <ChevronDown aria-hidden className="transition-transform" />
            </DropdownTrigger>
            <DropdownContent width="anchor" align="center">
              {pageSize.options.map((option) => (
                <DropdownItem
                  key={option}
                  variant="default"
                  label={l.perPageValue(option)}
                  selected={option === pageSize.value}
                  onClick={() => pageSize.onChange(option)}
                />
              ))}
            </DropdownContent>
          </Dropdown>
          <span aria-hidden className="whitespace-nowrap text-13 text-tertiary">
            {l.perPage}
          </span>
        </div>
      ) : null}

      {range ? (
        <p className="whitespace-nowrap text-12 text-tertiary">
          <span className="text-primary">{range.current}</span>
          <span>{" of "}</span>
          <span>{range.total}</span>
        </p>
      ) : null}

      <ul className="flex items-center gap-1.5">
        <li>
          <button
            type="button"
            aria-label={l.previous}
            disabled={atStart}
            onClick={() => onPageChange(page - 1)}
            className={arrowButtonVariants()}
          >
            <ArrowLeft aria-hidden />
          </button>
        </li>

        {tokens.map((token) => {
          if (token === "ellipsis-start" || token === "ellipsis-end") {
            return <PaginationEllipsis key={token} />;
          }
          const isCurrent = token === page;
          return (
            <li key={token}>
              <button
                type="button"
                aria-label={l.page(token)}
                aria-current={isCurrent ? "page" : undefined}
                disabled={isCurrent}
                onClick={() => onPageChange(token)}
                className={pageButtonVariants({ current: isCurrent })}
              >
                {isCurrent && loading ? (
                  <LoaderCircle
                    aria-hidden
                    className="size-3.5 shrink-0 animate-spin text-icon-placeholder"
                  />
                ) : (
                  token
                )}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            aria-label={l.next}
            disabled={atEnd}
            onClick={() => onPageChange(page + 1)}
            className={arrowButtonVariants()}
          >
            <ArrowRight aria-hidden />
          </button>
        </li>
      </ul>
    </nav>
  );
}
