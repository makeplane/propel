import { CSPProvider as BaseCSPProvider } from "@base-ui/react/csp-provider";

export type CSPProviderProps = BaseCSPProvider.Props;

/**
 * Base UI's Content-Security-Policy context, re-exported so strict-CSP apps compose entirely from
 * propel: pass your style `nonce` once at the app root and every portaled surface inherits it.
 */
export function CSPProvider(props: CSPProviderProps) {
  return <BaseCSPProvider {...props} />;
}
