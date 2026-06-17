import type { Context, ESTree, Plugin, Rule } from "@oxlint/plugins";

export const RULE_NAME = "prefer-tailwind-v4-shorthand";

const cssVariableArbitraryValue = /\[var\((--[A-Za-z0-9_-]+)\)\]/g;
const presenceDataVariant =
  /(^|[\s:])(not-)?((?:group-|peer-|in-)?data-)\[([A-Za-z][A-Za-z0-9_-]*)\]((?:\/[A-Za-z][A-Za-z0-9_-]*)?):/g;
const logicalInsetArbitraryUtility = /(^|[\s:])(start|end)-(\[[^\]\s]+\]|\(--[A-Za-z0-9_-]+\))/g;

const logicalInsetUtilityPrefix = {
  end: "inset-e",
  start: "inset-s",
} satisfies Record<string, string>;

export function normalizeTailwindV4Shorthand(value: string): string {
  return value
    .replace(cssVariableArbitraryValue, "($1)")
    .replace(presenceDataVariant, "$1$2$3$4$5:")
    .replace(
      logicalInsetArbitraryUtility,
      (_, boundary: string, side: keyof typeof logicalInsetUtilityPrefix, value: string) =>
        `${boundary}${logicalInsetUtilityPrefix[side]}-${value}`,
    );
}

function quoteStringLiteral(raw: string, value: string): string {
  const quote = raw.startsWith("'") ? "'" : '"';
  const escaped = value
    .replaceAll("\\", "\\\\")
    .replaceAll(quote, `\\${quote}`)
    .replaceAll("\r", "\\r")
    .replaceAll("\n", "\\n");

  return `${quote}${escaped}${quote}`;
}

function maybeReportStringLiteral(context: Context, node: ESTree.StringLiteral): void {
  const replacement = normalizeTailwindV4Shorthand(node.value);
  if (replacement === node.value) return;

  const raw = context.sourceCode.getText(node);
  if (!/^(['"])/.test(raw)) return;

  context.report({
    node,
    messageId: "preferTailwindV4Shorthand",
    fix(fixer) {
      return fixer.replaceText(node, quoteStringLiteral(raw, replacement));
    },
  });
}

export const preferTailwindV4ShorthandRule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Prefer Tailwind CSS v4 shorthand syntax for simple arbitrary values and data variants.",
      recommended: true,
    },
    fixable: "code",
    messages: {
      preferTailwindV4Shorthand: "Use Tailwind CSS v4 shorthand syntax for this class string.",
    },
  },
  createOnce(context) {
    return {
      Literal(node) {
        if (typeof node.value === "string") maybeReportStringLiteral(context, node);
      },
    };
  },
} satisfies Rule;

const plugin = {
  meta: {
    name: "propel",
  },
  rules: {
    [RULE_NAME]: preferTailwindV4ShorthandRule,
  },
} satisfies Plugin;

export default plugin;
