import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ArrowLeft, ArrowRight, ChevronDown, LoaderCircle, MoreHorizontal } from "lucide-react";
import * as React from "react";

import {
  Pagination as PaginationElement,
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
} from "../../elements/pagination/index";
import { Menu, MenuContent, MenuItem } from "../menu/index";

// Pagination is a single composite navigation control rather than a variant matrix:
// the Figma "variant" axis (All pages visible / Near start / Middle / Near end) is
// purely a function of where the current page sits within the total, so it's derived
// at render time from `page`/`pageCount` — never a prop. What designers can toggle is
// genuinely additive: an optional per-page selector and an optional range label.
//
// This components tier only COMPOSES the `elements/pagination` parts (each a single styled
// element); all chrome lives in their cva — there is no className/cva/cx here.

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
   * Accessible name for a page button, given its number. Defaults to e.g. `"Go to page 3"`; the
   * current page is additionally marked `aria-current`.
   */
  page: (page: number) => string;
  /** Visible text on the per-page selector trigger, given the size. Defaults to `"50"`. */
  perPageValue: (pageSize: number) => React.ReactNode;
  /** Trailing text after the per-page selector. Defaults to `"per page"`. */
  perPage: string;
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
   * The current page is rendered as a loading spinner instead of its number — for when navigating
   * to that page is in flight.
   */
  loading?: boolean;
  /**
   * Optional per-page size selector (Figma `50 v per page`). Provide `value`, the `options`, and
   * `onValueChange`; omit to hide the selector entirely.
   */
  pageSize?: {
    /** Currently selected page size. */
    value: number;
    /** Selectable page sizes. */
    options: number[];
    /** Called with the chosen page size. */
    onValueChange: (pageSize: number) => void;
  };
  /**
   * Optional range label shown before the controls (Figma `1-50 of 250`). Provide the
   * already-formatted `current` range and `total`.
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
 * Page navigation for a paginated list or table. Renders a `<nav>` landmark holding an optional
 * per-page selector and range label plus an ordered list of page controls: a previous button,
 * first/last anchors with ellipses around a window of pages near the current one, and a next
 * button. The current page is marked `aria-current="page"`; the prev/next ends disable at the
 * bounds and their arrows mirror under RTL.
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
    <PaginationElement aria-label={l.root} {...props}>
      {pageSize ? (
        <PaginationPerPage>
          {/*
            The selector is the propel Menu (single-select): the `layer-3` pill is
            its trigger and the menu lists the page sizes, the current one marked with a
            trailing check. The trigger carries the accessible name "<size> per page",
            and picking a size reports it through `pageSize.onValueChange`. Keyboard
            works via the Menu (Enter/ArrowDown opens, arrows move, Enter selects).
          */}
          <Menu>
            <BaseMenu.Trigger
              render={<PaginationPerPageTrigger />}
              aria-label={`${pageSize.value} ${l.perPage}`}
            >
              {l.perPageValue(pageSize.value)}
              <PaginationPerPageIndicator>
                <ChevronDown />
              </PaginationPerPageIndicator>
            </BaseMenu.Trigger>
            <MenuContent sizing="anchor" align="center">
              {pageSize.options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === pageSize.value}
                  onClick={() => pageSize.onValueChange(option)}
                >
                  {l.perPageValue(option)}
                </MenuItem>
              ))}
            </MenuContent>
          </Menu>
          <PaginationPerPageLabel>{l.perPage}</PaginationPerPageLabel>
        </PaginationPerPage>
      ) : null}

      {range ? (
        <PaginationRange>
          <PaginationRangeCurrent>{range.current}</PaginationRangeCurrent>
          {" of "}
          {range.total}
        </PaginationRange>
      ) : null}

      <PaginationList>
        <PaginationItem>
          <PaginationArrowButton
            aria-label={l.previous}
            disabled={atStart}
            onClick={() => onPageChange(page - 1)}
          >
            <ArrowLeft aria-hidden />
          </PaginationArrowButton>
        </PaginationItem>

        {tokens.map((token) => {
          if (token === "ellipsis-start" || token === "ellipsis-end") {
            return (
              <PaginationItem key={token}>
                <PaginationEllipsis>
                  <MoreHorizontal />
                </PaginationEllipsis>
              </PaginationItem>
            );
          }
          const isCurrent = token === page;
          return (
            <PaginationItem key={token}>
              <PaginationPageButton
                aria-label={l.page(token)}
                aria-current={isCurrent ? "page" : undefined}
                disabled={isCurrent}
                onClick={() => onPageChange(token)}
              >
                {isCurrent && loading ? (
                  <PaginationSpinner>
                    <LoaderCircle />
                  </PaginationSpinner>
                ) : (
                  token
                )}
              </PaginationPageButton>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationArrowButton
            aria-label={l.next}
            disabled={atEnd}
            onClick={() => onPageChange(page + 1)}
          >
            <ArrowRight aria-hidden />
          </PaginationArrowButton>
        </PaginationItem>
      </PaginationList>
    </PaginationElement>
  );
}
