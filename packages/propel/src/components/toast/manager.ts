import { Toast as BaseToast } from "@base-ui/react/toast";

// Base UI's toast manager hook + global manager factory. These are hooks/factories
// (behavior), not styled elements, so they live in `components` and pass through
// unchanged from `@base-ui/react/toast`.
export const useToastManager = BaseToast.useToastManager;
export const createToastManager = BaseToast.createToastManager;
