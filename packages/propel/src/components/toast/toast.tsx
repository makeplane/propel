import { Toast as BaseToast } from "@base-ui/react/toast";
import type * as React from "react";

import {
  Toast as ToastElement,
  ToastAction,
  ToastActionButton,
  ToastActionGroup,
  ToastActions,
  ToastCloseSlot,
  ToastContent,
  ToastDescription,
  type ToastTone,
  ToastTextGroup,
  ToastTitle,
} from "../../elements/toast/index";
import { LinearProgress } from "../linear-progress/index";
import { createToastManager as createBaseToastManager, useToastManager } from "./manager";
import { ToastStatusIcon } from "./toast-status-icon";

// The semantic intent of a toast (Figma "Property 1": Default / Variant2 / Variant3
// = success / danger / info). `warning` and `neutral` round out the standard set.
// Each tone auto-selects a filled status icon and its color token (see `ToastStatusIcon`) —
// the caller never passes an icon. `tone` is required and lives in the toast's `data`
// payload (see `ToastData`).
export type { ToastTone };

/**
 * A single action button rendered inside a toast. The toast is a portaled, auto-dismissing surface
 * with no `className`/`style` escape hatch, so an action is declared as data (label + handler)
 * rather than arbitrary markup — keeping the styling on-token and the API closed.
 */
export type ToastAction = {
  /** Visible button text — also its accessible name. */
  label: string;
  /** Invoked on click (and Enter/Space, since it's a real `<button>`). */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * Custom data carried on every toast queued through this component. `add({ ... data: { tone } })`
 * selects the status icon + color; `tone` is required so the caller always chooses the intent
 * explicitly. Action buttons are optional and map directly to Figma's toast `button`/`button2`
 * booleans (node 1146-61689): `actions` is the left cluster of 1–2 buttons, `primaryAction` is the
 * right-aligned button shown on the success treatment.
 */
export type ToastData = {
  /** Semantic intent — drives the status icon and its color. */
  tone: ToastTone;
  /**
   * Completion (0–100) of a long-running task the toast is reporting. When set, a thin `Progress`
   * bar with a `%` label renders between the description and the action row (Figma node
   * 1146-61689). Omit it for a plain toast.
   */
  progress?: number;
  /**
   * Left-aligned action cluster (Figma's `button` / `button2`). One or two buttons; extras beyond
   * two are ignored to stay faithful to the design.
   */
  actions?: ToastAction[];
  /**
   * Optional right-aligned action, rendered whenever it's provided (the component doesn't restrict
   * it by tone). In Figma it appears on the success treatment. Wired through Base UI's
   * `Toast.Action` so it takes part in the toast's focus management.
   */
  primaryAction?: ToastAction;
};

// Re-export Base UI's toast manager hook + global manager factory with Propel's
// `ToastData` as the default payload. Consumers can still pass a narrower extension
// type, but the default path requires the `tone` data this renderer needs.
export function createToastManager<Data extends ToastData = ToastData>() {
  return createBaseToastManager<Data>();
}

export function useToast<Data extends ToastData = ToastData>() {
  return useToastManager<Data>();
}

export type ToastProps = Omit<BaseToast.Root.Props, "className" | "style"> & {
  /**
   * The close control (e.g. an `IconButton`), rendered as the toast's close button. It carries its
   * own — localizable — `aria-label`; the toast bakes no label or glyph.
   */
  close: React.ReactElement;
};

/**
 * A single styled toast: status icon (auto-selected from `toast.data.tone`), title, description,
 * optional action buttons (from `toast.data.actions` / `primaryAction`), and a close button.
 * Rendered automatically by `ToastProvider` for each queued toast — you normally don't render this
 * directly.
 */
export function Toast({ toast, close, ...props }: ToastProps) {
  // `tone` is a required field of `ToastData`, supplied when the toast is queued.
  // We intentionally have NO default tone — fail loud with guidance if it's missing.
  const data = toast.data as ToastData | undefined;
  if (data?.tone == null) {
    throw new Error(
      'propel Toast requires a `tone` in the toast\'s data payload, e.g. toast.add({ title, data: { tone: "info" } }).',
    );
  }
  // Action buttons, per Figma (node 1146-61689): a left cluster of up to two buttons
  // plus an optional right-aligned primary action. The button row only renders when
  // there's at least one of either, so an action-less toast keeps its tight layout.
  const leftActions = (data.actions ?? []).slice(0, 2);
  const primaryAction = data.primaryAction;
  const hasActionRow = leftActions.length > 0 || primaryAction != null;
  return (
    <BaseToast.Root toast={toast} {...props} render={<ToastElement />}>
      {/* `mt-0.5` on the icon (via toastStatusIconVariants) baselines it with the title. */}
      <ToastStatusIcon tone={data.tone} />
      <BaseToast.Content render={<ToastContent />}>
        <ToastTextGroup>
          <BaseToast.Title render={<ToastTitle />} />
          <BaseToast.Description render={<ToastDescription />} />
        </ToastTextGroup>
        {data.progress != null ? (
          <LinearProgress
            value={data.progress}
            magnitude="sm"
            tone="brand"
            aria-label={typeof toast.title === "string" && toast.title ? toast.title : "Progress"}
          />
        ) : null}
        {hasActionRow ? (
          // The left cluster grows to fill so the primary action pins to the inline-end
          // edge; `ToastActionGroup` carries the offset that lines the buttons up with
          // the title text. RTL-safe via logical utilities (owned by the elements parts).
          <ToastActions>
            <ToastActionGroup>
              {leftActions.map((action, index) => (
                <ToastActionButton
                  // Actions are positional and have no stable id; index keys are fine
                  // for this short, static-per-render list.
                  key={index}
                  onClick={action.onClick}
                >
                  {action.label}
                </ToastActionButton>
              ))}
            </ToastActionGroup>
            {primaryAction ? (
              // The right-aligned action is wired through Base UI's `Toast.Action` so it
              // takes part in the toast's focus management.
              <BaseToast.Action render={<ToastAction />} onClick={primaryAction.onClick}>
                {primaryAction.label}
              </BaseToast.Action>
            ) : null}
          </ToastActions>
        ) : null}
      </BaseToast.Content>
      <ToastCloseSlot>
        <BaseToast.Close render={close} />
      </ToastCloseSlot>
    </BaseToast.Root>
  );
}
