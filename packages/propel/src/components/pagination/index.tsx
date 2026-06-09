import { cva, cx } from "class-variance-authority";
import { ArrowLeft, ArrowRight, ChevronDown, LoaderCircle, MoreHorizontal } from "lucide-react";
import * as React from "react";

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
//   followed by "per page" tertiary text.

// Shared 24px square slot used by page numbers, the prev/next buttons and the
// ellipsis. `radius/sm` for page numbers, `radius/md` for the arrow buttons.
const slotBase = cx(
  "inline-flex size-6 shrink-0 items-center justify-center px-1",
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
      // (Figma "Selected") and is not interactive.
      current: {
        true: "bg-layer-transparent-active",
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
// wherever the run skips pages. This reproduces the four Figma layouts:
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
  // Show a leading ellipsis only when the window skips past page 2.
  if (windowStart > 2) tokens.push("ellipsis-start");
  for (let p = windowStart; p <= windowEnd; p++) tokens.push(p);
  // Show a trailing ellipsis only when the window stops short of the last anchor.
  if (windowEnd < pageCount - 1) tokens.push("ellipsis-end");
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
          <label className="inline-flex h-6 min-w-10 items-center justify-center gap-1 rounded-md bg-layer-3 px-2 text-13 font-medium text-secondary">
            <span className="sr-only">{l.perPage}</span>
            <select
              value={pageSize.value}
              onChange={(e) => pageSize.onChange(Number(e.target.value))}
              className="cursor-default appearance-none bg-transparent text-center outline-none focus-visible:underline"
            >
              {pageSize.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="size-3.5 shrink-0 text-icon-secondary" />
          </label>
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
