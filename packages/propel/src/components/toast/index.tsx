import { Toast as BaseToast } from "@base-ui/react/toast";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { surfaceVariants } from "../../internal/surface";

// Solid status icons. Figma's toast (node 1144-3158) uses *filled* status glyphs —
// a tone-colored disc/triangle with the symbol knocked out of it — not lucide's
// stroke-based outlines. lucide-react ships no filled equivalents (every status
// icon is outline-only), so these are hand-authored on the same 24×24 grid lucide
// uses. The shape fills with `currentColor` (set per-tone via `text-icon-*`) and
// the inner symbol is a true cut-out (even-odd fill rule), so it shows the card
// surface behind it — reading as white on light, dark on dark, with no hardcoded
// color. Signature matches lucide so the rest of the component is unchanged.
type StatusIconProps = React.SVGProps<SVGSVGElement>;

function SolidIcon({ children, ...props }: StatusIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

// Filled disc + white check (cut-out).
function SolidCircleCheck(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.768 7.64a1 1 0 0 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6Z" />
    </SolidIcon>
  );
}

// Filled disc + white cross (cut-out).
function SolidCircleX(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm3.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293Z" />
    </SolidIcon>
  );
}

// Filled disc + white "i" (cut-out dot + stem).
function SolidInfo(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 5a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 7Zm1 4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0v-5Z" />
    </SolidIcon>
  );
}

// Filled rounded triangle + white "!" (cut-out stem + dot).
function SolidTriangleAlert(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M10.23 3.16a2.06 2.06 0 0 1 3.54 0l8.02 13.78A2.06 2.06 0 0 1 20.02 20H3.98a2.06 2.06 0 0 1-1.77-3.06L10.23 3.16ZM13 9a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V9Zm-1 6.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    </SolidIcon>
  );
}

// Filled disc + white "!" (cut-out stem + dot) — neutral fallback.
function SolidCircleAlert(props: StatusIconProps) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm1 5a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V7Zm-1 8.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    </SolidIcon>
  );
}

type StatusIcon = (props: StatusIconProps) => React.JSX.Element;

// Re-export Base UI's toast manager hook + global manager factory so consumers can
// queue toasts from anywhere (a button handler, a global store, outside React).
// `useToast` is the idiomatic name for the in-component hook.
export const createToastManager = BaseToast.createToastManager;
export const useToast = BaseToast.useToastManager;

// The semantic intent of a toast (Figma "Property 1": Default / Variant2 / Variant3
// = success / danger / info). `warning` and `neutral` round out the standard set.
// Each tone auto-selects a filled status icon and its color token — the caller never
// passes an icon. `tone` is required and lives in the toast's `data` payload (see `ToastData`).
const STATUS_ICON: Record<ToastTone, StatusIcon> = {
  success: SolidCircleCheck,
  danger: SolidCircleX,
  info: SolidInfo,
  warning: SolidTriangleAlert,
  neutral: SolidCircleAlert,
};

// Status-icon color per tone, straight from propel's `icon/*` tokens. The icon is
// the only tone-colored element; surface/border/text stay neutral, matching Figma.
const statusIconVariants = cva("size-4 shrink-0", {
  variants: {
    tone: {
      success: "text-icon-success-primary",
      danger: "text-icon-danger-primary",
      info: "text-icon-info-primary",
      warning: "text-icon-warning-primary",
      neutral: "text-icon-tertiary",
    },
  },
});

export type ToastTone = NonNullable<VariantProps<typeof statusIconVariants>["tone"]>;

/**
 * A single action button rendered inside a toast. The toast is a portaled,
 * auto-dismissing surface with no `className`/`style` escape hatch, so an action is
 * declared as data (label + handler) rather than arbitrary markup — keeping the
 * styling on-token and the API closed.
 */
export type ToastAction = {
  /** Visible button text — also its accessible name. */
  label: string;
  /** Invoked on click (and Enter/Space, since it's a real `<button>`). */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * Custom data carried on every toast queued through this component. `add({ ... data:
 * { tone } })` selects the status icon + color; `tone` is required so the caller
 * always chooses the intent explicitly. Action buttons are optional and map directly
 * to Figma's toast `button`/`button2` booleans (node 1146-61689): `actions` is the
 * left cluster of 1–2 buttons, `primaryAction` is the right-aligned button shown on
 * the success treatment.
 */
export type ToastData = {
  /** Semantic intent — drives the status icon and its color. */
  tone: ToastTone;
  /**
   * Left-aligned action cluster (Figma's `button` / `button2`). One or two buttons;
   * extras beyond two are ignored to stay faithful to the design.
   */
  actions?: ToastAction[];
  /**
   * Optional right-aligned action, rendered whenever it's provided (the component
   * doesn't restrict it by tone). In Figma it appears on the success treatment. Wired
   * through Base UI's `Toast.Action` so it takes part in the toast's focus management.
   */
  primaryAction?: ToastAction;
};

// Shared action-button styling, straight from Figma's "Buttons" sub-frame: a 24px-tall
// pill with a 40px min width, `md` radius, 13px medium secondary text, transparent
// background that fills on hover. Used for both the left cluster and the right action.
const actionButtonClassName = cx(
  "inline-flex h-6 min-w-10 shrink-0 items-center justify-center gap-1 rounded-md px-2",
  "text-13 font-medium text-secondary outline-none",
  "bg-layer-transparent transition-colors hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
);

export type ToastProviderProps = Omit<
  React.ComponentProps<typeof BaseToast.Provider>,
  "className" | "render" | "style"
>;

/**
 * Wraps the app and renders the toast viewport. Mount it once near the root, then
 * queue toasts with `useToast().add({ title, description, data: { tone } })`.
 * Bundles Base UI's `Toast.Provider` (manager + context), a fixed-position
 * `Viewport`, and a styled `Toast` for every queued item — so consumers only manage
 * content, never layout.
 */
export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return (
    <BaseToast.Provider {...props}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed end-4 bottom-4 z-50 flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-lg outline-none focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-accent-strong">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

// Renders one styled `Toast` per queued item. Base UI keeps the live list; we map it.
function ToastList() {
  const { toasts } = useToast<ToastData>();
  return toasts.map((toast) => <Toast key={toast.id} toast={toast} />);
}

export type ToastProps = Omit<
  React.ComponentProps<typeof BaseToast.Root>,
  "className" | "render" | "style"
>;

/**
 * A single styled toast: status icon (auto-selected from `toast.data.tone`), title,
 * description, optional action buttons (from `toast.data.actions` / `primaryAction`),
 * and a close button. Rendered automatically by `ToastProvider` for each queued toast
 * — you normally don't render this directly.
 */
export function Toast({ toast, ...props }: ToastProps) {
  // `tone` is a required field of `ToastData`, supplied when the toast is queued.
  // We intentionally have NO default tone — fail loud with guidance if it's missing.
  const data = toast.data as ToastData | undefined;
  if (data?.tone == null) {
    throw new Error(
      'propel Toast requires a `tone` in the toast\'s data payload, e.g. toast.add({ title, data: { tone: "info" } }).',
    );
  }
  const StatusIcon = STATUS_ICON[data.tone];
  // Action buttons, per Figma (node 1146-61689): a left cluster of up to two buttons
  // plus an optional right-aligned primary action. The button row only renders when
  // there's at least one of either, so an action-less toast keeps its tight layout.
  const leftActions = (data.actions ?? []).slice(0, 2);
  const primaryAction = data.primaryAction;
  const hasActionRow = leftActions.length > 0 || primaryAction != null;
  return (
    <BaseToast.Root
      toast={toast}
      // Surface: the shared floating-card surface (white `surface-1`, subtle
      // border) with `raised` overlay shadow and `lg` radius. `data-[ending]`
      // fades the toast on dismiss.
      className={cx(
        surfaceVariants({ elevation: "raised", radius: "lg" }),
        "relative flex w-full items-start gap-2 px-4 py-3",
        "transition-opacity data-[ending]:opacity-0",
      )}
      {...props}
    >
      {/* Status icon sits in a 2px-padded column so it baselines with the title. */}
      <span className="flex items-center py-0.5">
        <StatusIcon aria-hidden className={statusIconVariants({ tone: data.tone })} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <BaseToast.Title className="text-14 font-medium text-primary" />
          <BaseToast.Description className="text-13 text-tertiary" />
        </div>
        {hasActionRow ? (
          // The row already sits in the content column (past the icon), so the left
          // cluster just needs `-ms-2` to pull each button's transparent px-2 pill back
          // by its own padding — that lines the button label up with the title text
          // while the hover fill bleeds left. The left cluster grows to fill so the
          // primary action pins to the inline-end edge. RTL-safe via logical utilities.
          <div className="flex w-full gap-1.5">
            <div className="-ms-2 flex min-w-0 flex-1 items-center gap-1.5">
              {leftActions.map((action, index) => (
                <button
                  // Actions are positional and have no stable id; index keys are fine
                  // for this short, static-per-render list.
                  key={index}
                  type="button"
                  className={actionButtonClassName}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              ))}
            </div>
            {primaryAction ? (
              // The right-aligned action is wired through Base UI's `Toast.Action` so it
              // takes part in the toast's focus management.
              <BaseToast.Action className={actionButtonClassName} onClick={primaryAction.onClick}>
                {primaryAction.label}
              </BaseToast.Action>
            ) : null}
          </div>
        ) : null}
      </div>
      <BaseToast.Close
        aria-label="Dismiss"
        className="absolute top-1 end-1 inline-flex size-5 items-center justify-center rounded-sm text-icon-tertiary transition-colors hover:bg-layer-transparent-hover"
      >
        <X aria-hidden className="size-3.5" />
      </BaseToast.Close>
    </BaseToast.Root>
  );
}
