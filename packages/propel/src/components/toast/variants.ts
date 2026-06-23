import { cva } from "class-variance-authority";

// Class composition for the components/toast structural wrappers. Keeps all
// className strings in one place so toast.tsx never touches className directly.

/** Tight vertical group for Title + Description inside ToastContent. */
export const toastTextGroupVariants = cva("flex flex-col gap-1");

/** Full-width row containing the left action cluster and optional primary action. */
export const toastActionRowVariants = cva("flex w-full gap-1.5");

/**
 * Grows to fill the inline-start side of the action row. `-ms-2` pulls each button's transparent
 * `px-2` pill flush with the title text while letting the hover fill bleed left. RTL-safe via
 * logical utilities.
 */
export const toastActionClusterVariants = cva("-ms-2 flex min-w-0 flex-1 items-center gap-1.5");
