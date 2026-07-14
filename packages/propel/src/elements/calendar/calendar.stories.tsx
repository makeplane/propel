import type { Meta, StoryObj } from "@storybook/react-vite";
import { cx } from "class-variance-authority";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { expect } from "storybook/test";

import { calendarClassNames } from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. react-day-picker isn't
// decomposable into `useRender` styled parts, so this family's styled contract is the
// `calendarClassNames` map — and rendering the styled parts DIRECTLY means applying those classes
// to the static DOM react-day-picker v10 emits (root › months › (nav, month › caption › month
// grid)), with every visual state pinned via the modifier classes the picker would add to the
// gridcell (`selected`, `range-start`, `range-middle`, `range-end`, `today`, `disabled`,
// `outside`, `hidden`) and the `aria-selected`/`disabled` attributes it would set. No
// react-day-picker import, no behavior: month navigation, selection, keyboard, and grid semantics
// are demonstrated and tested in Components/Calendar. The map has no variant axes, so the state
// matrix IS the whole configuration space.
const meta = {
  title: "Elements/Calendar",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1286-12844",
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// react-day-picker renders the weekday header row inside an `aria-hidden` <thead> (day buttons
// carry their own full-date labels), so the header cells need no aria-labels of their own.
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type GridDay = { label: number; iso: string; outside: boolean };

// January 2025 laid out Sunday-first: January 1st falls on a Wednesday, so the grid leads with
// three December days and trails with one February day — five fixed weeks, no reliance on "today".
const JANUARY_2025_WEEKS = Array.from({ length: 5 }, (_, weekIndex) => ({
  key: `week-${weekIndex + 1}`,
  days: Array.from({ length: 7 }, (_, dayIndex): GridDay => {
    // Offset from Wednesday, January 1st back to the grid's Sunday, December 29th start.
    const date = new Date(2025, 0, weekIndex * 7 + dayIndex - 2);
    const pad = (value: number) => String(value).padStart(2, "0");
    return {
      label: date.getDate(),
      iso: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      outside: date.getMonth() !== 0,
    };
  }),
}));

/**
 * The full month anatomy, statically pinned: the bordered/elevated `root` surface, the absolutely
 * positioned `nav` icon buttons (16px `chevron` glyphs, RTL-mirrored), the `caption_label`, the
 * `aria-hidden` weekday header row, and five `week` rows of 40px round `day` cells. January 24th is
 * pinned selected (`selected` modifier class + `aria-selected` on the gridcell → solid accent
 * button, inverse text), January 15th is pinned as today (`today` → accent semibold text), and the
 * December/February days wear the dimmed `outside` look.
 */
export const Default: Story = {
  render: () => (
    <div className={calendarClassNames.root}>
      <div className={calendarClassNames.months}>
        <nav className={calendarClassNames.nav}>
          <button
            type="button"
            aria-label="Go to the Previous Month"
            className={calendarClassNames.button_previous}
          >
            <ChevronLeft aria-hidden className={calendarClassNames.chevron} />
          </button>
          <button
            type="button"
            aria-label="Go to the Next Month"
            className={calendarClassNames.button_next}
          >
            <ChevronRight aria-hidden className={calendarClassNames.chevron} />
          </button>
        </nav>
        <div className={calendarClassNames.month}>
          <div className={calendarClassNames.month_caption}>
            <span className={calendarClassNames.caption_label}>January 2025</span>
          </div>
          <table role="grid" aria-label="January 2025" className={calendarClassNames.month_grid}>
            <thead aria-hidden>
              <tr className={calendarClassNames.weekdays}>
                {WEEKDAYS.map((weekday) => (
                  <th key={weekday} scope="col" className={calendarClassNames.weekday}>
                    {weekday}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {JANUARY_2025_WEEKS.map((week) => (
                <tr key={week.key} className={calendarClassNames.week}>
                  {week.days.map((day) => {
                    const selected = day.iso === "2025-01-24";
                    const today = day.iso === "2025-01-15";
                    return (
                      <td
                        key={day.iso}
                        role="gridcell"
                        data-day={day.iso}
                        aria-selected={selected || undefined}
                        className={cx(
                          calendarClassNames.day,
                          selected && calendarClassNames.selected,
                          today && calendarClassNames.today,
                          day.outside && calendarClassNames.outside,
                        )}
                      >
                        <button type="button" className={calendarClassNames.day_button}>
                          {day.label}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
};

/**
 * The range look, statically pinned across January 13th–20th: every day in the range carries the
 * `selected` modifier + `aria-selected` (react-day-picker sets both on all range cells), the
 * endpoints add the `range-start`/`range-end` marker classes (solid accent button, outer corner of
 * the cell rounded off), and the days between add `range-middle` (button reset to transparent so
 * only the cell's soft in-range fill shows) — a continuous range reads as one pill. The grid pins
 * `aria-multiselectable` the way react-day-picker does in range mode.
 */
export const RangeSelection: Story = {
  render: () => (
    <div className={calendarClassNames.root}>
      <div className={calendarClassNames.months}>
        <nav className={calendarClassNames.nav}>
          <button
            type="button"
            aria-label="Go to the Previous Month"
            className={calendarClassNames.button_previous}
          >
            <ChevronLeft aria-hidden className={calendarClassNames.chevron} />
          </button>
          <button
            type="button"
            aria-label="Go to the Next Month"
            className={calendarClassNames.button_next}
          >
            <ChevronRight aria-hidden className={calendarClassNames.chevron} />
          </button>
        </nav>
        <div className={calendarClassNames.month}>
          <div className={calendarClassNames.month_caption}>
            <span className={calendarClassNames.caption_label}>January 2025</span>
          </div>
          <table
            role="grid"
            aria-multiselectable
            aria-label="January 2025"
            className={calendarClassNames.month_grid}
          >
            <thead aria-hidden>
              <tr className={calendarClassNames.weekdays}>
                {WEEKDAYS.map((weekday) => (
                  <th key={weekday} scope="col" className={calendarClassNames.weekday}>
                    {weekday}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {JANUARY_2025_WEEKS.map((week) => (
                <tr key={week.key} className={calendarClassNames.week}>
                  {week.days.map((day) => {
                    const rangeStart = day.iso === "2025-01-13";
                    const rangeEnd = day.iso === "2025-01-20";
                    const rangeMiddle = day.iso > "2025-01-13" && day.iso < "2025-01-20";
                    const selected = rangeStart || rangeMiddle || rangeEnd;
                    return (
                      <td
                        key={day.iso}
                        role="gridcell"
                        data-day={day.iso}
                        aria-selected={selected || undefined}
                        className={cx(
                          calendarClassNames.day,
                          selected && calendarClassNames.selected,
                          rangeStart && calendarClassNames.range_start,
                          rangeMiddle && calendarClassNames.range_middle,
                          rangeEnd && calendarClassNames.range_end,
                          day.outside && calendarClassNames.outside,
                        )}
                      >
                        <button type="button" className={calendarClassNames.day_button}>
                          {day.label}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
};

/**
 * Every pinnable day-cell and nav state side by side, in one `root` frame:
 *
 * - **Resting / Hovered** — the transparent 40px round button; hover (forced via pseudo-states)
 *   paints the transparent-layer wash.
 * - **Today** — accent semibold text; **Selected** — solid accent button with inverse text;
 *   **Selected today** — the solid accent button wins (`today`'s accent text is guarded behind
 *   `:not([aria-selected])`), only the semibold weight survives.
 * - **Disabled** — muted text, `pointer-events: none` (pinned with both the `disabled` modifier class
 *   and the native `disabled` attribute react-day-picker sets on the button).
 * - **Outside** — the dimmed adjacent-month look.
 * - **Range start / middle / end** — the range pill: endpoints solid with the outer cell corner
 *   rounded, middles transparent over the cell's soft fill.
 * - **Hidden** — an `invisible` empty cell that keeps its grid slot (react-day-picker renders no
 *   button in a hidden cell).
 * - **Nav** — a natively `disabled` chevron button dims to 50% opacity next to a hovered one.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#elements-calendar-day-hover", "#elements-calendar-nav-hover"],
    },
  },
  render: () => (
    <div className={calendarClassNames.root}>
      <div className={calendarClassNames.months}>
        <nav className={calendarClassNames.nav}>
          <button
            type="button"
            disabled
            aria-label="Go to the Previous Month"
            className={calendarClassNames.button_previous}
          >
            <ChevronLeft aria-hidden className={calendarClassNames.chevron} />
          </button>
          <button
            id="elements-calendar-nav-hover"
            type="button"
            aria-label="Go to the Next Month"
            className={calendarClassNames.button_next}
          >
            <ChevronRight aria-hidden className={calendarClassNames.chevron} />
          </button>
        </nav>
        <div className={calendarClassNames.month}>
          <div className={calendarClassNames.month_caption}>
            <span className={calendarClassNames.caption_label}>Day states</span>
          </div>
          <table role="grid" aria-label="Day states" className={calendarClassNames.month_grid}>
            <tbody>
              <tr className={calendarClassNames.week}>
                <td role="gridcell" className={calendarClassNames.day}>
                  <button
                    type="button"
                    aria-label="Day 1"
                    className={calendarClassNames.day_button}
                  >
                    1
                  </button>
                </td>
                <td role="gridcell" className={calendarClassNames.day}>
                  <button
                    id="elements-calendar-day-hover"
                    type="button"
                    aria-label="Day 2, hovered"
                    className={calendarClassNames.day_button}
                  >
                    2
                  </button>
                </td>
                <td
                  role="gridcell"
                  className={cx(calendarClassNames.day, calendarClassNames.today)}
                >
                  <button
                    type="button"
                    aria-label="Day 3, today"
                    className={calendarClassNames.day_button}
                  >
                    3
                  </button>
                </td>
                <td
                  role="gridcell"
                  aria-selected
                  className={cx(calendarClassNames.day, calendarClassNames.selected)}
                >
                  <button
                    type="button"
                    aria-label="Day 4, selected"
                    className={calendarClassNames.day_button}
                  >
                    4
                  </button>
                </td>
                <td
                  role="gridcell"
                  aria-selected
                  className={cx(
                    calendarClassNames.day,
                    calendarClassNames.selected,
                    calendarClassNames.today,
                  )}
                >
                  <button
                    type="button"
                    aria-label="Day 5, selected today"
                    className={calendarClassNames.day_button}
                  >
                    5
                  </button>
                </td>
                <td
                  role="gridcell"
                  className={cx(calendarClassNames.day, calendarClassNames.disabled)}
                >
                  <button
                    type="button"
                    disabled
                    aria-label="Day 6, disabled"
                    className={calendarClassNames.day_button}
                  >
                    6
                  </button>
                </td>
                <td
                  role="gridcell"
                  className={cx(calendarClassNames.day, calendarClassNames.outside)}
                >
                  <button
                    type="button"
                    aria-label="Day 7, outside month"
                    className={calendarClassNames.day_button}
                  >
                    7
                  </button>
                </td>
              </tr>
              <tr className={calendarClassNames.week}>
                <td role="gridcell" className={calendarClassNames.day}>
                  <button
                    type="button"
                    aria-label="Day 8"
                    className={calendarClassNames.day_button}
                  >
                    8
                  </button>
                </td>
                <td
                  role="gridcell"
                  aria-selected
                  className={cx(
                    calendarClassNames.day,
                    calendarClassNames.selected,
                    calendarClassNames.range_start,
                  )}
                >
                  <button
                    type="button"
                    aria-label="Day 9, range start"
                    className={calendarClassNames.day_button}
                  >
                    9
                  </button>
                </td>
                <td
                  role="gridcell"
                  aria-selected
                  className={cx(
                    calendarClassNames.day,
                    calendarClassNames.selected,
                    calendarClassNames.range_middle,
                  )}
                >
                  <button
                    type="button"
                    aria-label="Day 10, in range"
                    className={calendarClassNames.day_button}
                  >
                    10
                  </button>
                </td>
                <td
                  role="gridcell"
                  aria-selected
                  className={cx(
                    calendarClassNames.day,
                    calendarClassNames.selected,
                    calendarClassNames.range_middle,
                  )}
                >
                  <button
                    type="button"
                    aria-label="Day 11, in range"
                    className={calendarClassNames.day_button}
                  >
                    11
                  </button>
                </td>
                <td
                  role="gridcell"
                  aria-selected
                  className={cx(
                    calendarClassNames.day,
                    calendarClassNames.selected,
                    calendarClassNames.range_end,
                  )}
                >
                  <button
                    type="button"
                    aria-label="Day 12, range end"
                    className={calendarClassNames.day_button}
                  >
                    12
                  </button>
                </td>
                <td role="gridcell" className={calendarClassNames.day}>
                  <button
                    type="button"
                    aria-label="Day 13"
                    className={calendarClassNames.day_button}
                  >
                    13
                  </button>
                </td>
                <td
                  id="elements-calendar-hidden-day"
                  role="gridcell"
                  className={cx(calendarClassNames.day, calendarClassNames.hidden)}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
};

/**
 * Hidden CSS canary (rule 2b): asserts the pinned modifier classes compile to real styling — the
 * selected button swaps to the solid accent fill, today's button recolors relative to resting, a
 * disabled button computes `pointer-events: none`, a range-middle CELL paints the soft in-range
 * fill while a plain cell stays transparent, and the hidden cell computes `visibility: hidden`.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, canvasElement }) => {
    const cellOf = (button: HTMLElement) => {
      const cell = button.closest("td");
      if (!cell) throw new Error("day button not inside a gridcell");
      return cell;
    };
    const resting = canvas.getByRole("button", { name: "Day 1" });

    // `selected` swaps the day button to the solid accent fill.
    const selected = canvas.getByRole("button", { name: "Day 4, selected" });
    await expect(getComputedStyle(selected).backgroundColor).not.toBe(
      getComputedStyle(resting).backgroundColor,
    );

    // `today` recolors the (unselected) day's text to the accent tone and paints the 6px
    // current-date dot 4px above the CELL's bottom edge — including on a selected today.
    const today = canvas.getByRole("button", { name: "Day 3, today" });
    await expect(getComputedStyle(today).color).not.toBe(getComputedStyle(resting).color);
    const todayDot = getComputedStyle(cellOf(today), "::after");
    await expect(todayDot.width).toBe("6px");
    await expect(todayDot.height).toBe("6px");
    await expect(todayDot.bottom).toBe("4px");
    const selectedToday = canvas.getByRole("button", { name: "Day 5, selected today" });
    await expect(getComputedStyle(cellOf(selectedToday), "::after").width).toBe("6px");

    // `disabled` makes the day button non-interactive and visibly recessed.
    const disabled = canvas.getByRole("button", { name: "Day 6, disabled" });
    await expect(getComputedStyle(disabled).pointerEvents).toBe("none");
    await expect(getComputedStyle(disabled).opacity).toBe("0.6");

    // `range-middle` paints the soft in-range fill on the CELL, and its button reset beats
    // `selected`'s accent fill (the cell carries both classes) so the button stays transparent.
    const inRange = canvas.getByRole("button", { name: "Day 10, in range" });
    await expect(getComputedStyle(cellOf(inRange)).backgroundColor).not.toBe(
      getComputedStyle(cellOf(resting)).backgroundColor,
    );
    await expect(getComputedStyle(inRange).backgroundColor).toBe("rgba(0, 0, 0, 0)");

    // `hidden` keeps the grid slot but computes to `visibility: hidden`.
    const hidden = canvasElement.querySelector("#elements-calendar-hidden-day");
    if (!(hidden instanceof HTMLElement)) throw new Error("missing pinned hidden cell");
    await expect(getComputedStyle(hidden).visibility).toBe("hidden");
  },
};
