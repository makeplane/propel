/**
 * oxlint JS plugin: `propel/no-raw-typography-class`.
 *
 * Forbids raw / non-semantic typography utility classes (`text-13 font-medium`,
 * `text-20!`, …) and autofixes them to propel's semantic typography tokens
 * (`text-body-xs-medium`, `text-h4-regular!`, …).
 *
 * Single source of truth: the size→category→weight mapping is DERIVED at load
 * from propel's `@theme` tokens in `variables.css`, where each semantic token
 * already states its own mapping:
 *
 *     --text-13: 0.8125rem;                     (a raw size)
 *     --text-body-xs-regular: var(--text-13);   (body-xs ⇔ text-13, weight regular)
 *
 * Nothing is hardcoded — adding a size or a category to `variables.css` is picked
 * up automatically, the way oxlint-tailwindcss reads the Tailwind design system
 * rather than maintaining class tables. The category is everything before the
 * final `-` segment; the weight is that final segment, so even the set of weights
 * is derived, not enumerated.
 *
 * Scope mirrors oxlint-tailwindcss's class extractor — only `className`/`class`
 * attributes, the class-builder callees (`cva`, `cx`, `clsx`, `tv`, …), `tw`
 * tagged templates, and `className`/`classes`/`styles` variables are inspected,
 * so both plugins police the same class locations and non-class strings are never
 * touched.
 *
 * Type-only `@oxlint/plugins` import keeps the emitted module's only runtime
 * imports as Node built-ins, so oxlint's JS-plugin loader can `import()` it under
 * native TypeScript type-stripping.
 */

import { readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import type { Context, ESTree } from "@oxlint/plugins";

// ---------------------------------------------------------------------------
// Typography tokens, derived from propel's `@theme` (the single source of truth)
// ---------------------------------------------------------------------------

export type TypographyTokens = {
  /** Raw size class (`text-13`) → semantic category (`body-xs`). */
  sizeToCategory: ReadonlyMap<string, string>;
  /** Weight suffixes that exist in the scale (`regular`, `medium`, …). */
  weights: ReadonlySet<string>;
};

// `--text-body-xs-regular: var(--text-13)` → name `body-xs-regular`, size `13`.
// The category is everything before the final `-`; the weight is that segment.
const SEMANTIC_TOKEN_RE = /--text-([a-z0-9-]+)\s*:\s*var\(\s*--text-(\d+)\s*\)/gi;

export function parseTypographyTokens(css: string): TypographyTokens {
  const sizeToCategory = new Map<string, string>();
  const weights = new Set<string>();
  for (const match of css.matchAll(SEMANTIC_TOKEN_RE)) {
    const name = match[1];
    const sizeNumber = match[2];
    if (name === undefined || sizeNumber === undefined) continue;
    const lastDash = name.lastIndexOf("-");
    if (lastDash <= 0) continue;
    const category = name.slice(0, lastDash);
    const weight = name.slice(lastDash + 1);
    sizeToCategory.set(`text-${sizeNumber}`, category);
    weights.add(weight);
  }
  return { sizeToCategory, weights };
}

const tokenCache = new Map<string, TypographyTokens>();

export function loadTypographyTokens(cssPath: string): TypographyTokens {
  const cached = tokenCache.get(cssPath);
  if (cached !== undefined) return cached;
  const tokens = parseTypographyTokens(readFileSync(cssPath, "utf8"));
  tokenCache.set(cssPath, tokens);
  return tokens;
}

// The plugin makes no assumption about where a consumer keeps propel's tokens.
// Required setting: `settings.propel.variablesCss` — the CSS file holding the
// `--text-*` `@theme` declarations — resolved relative to the lint root (cwd).
const SETTINGS_KEY = "propel";

function resolveVariablesCssPath(context: Context): string {
  const namespace = context.settings[SETTINGS_KEY];
  const configured =
    typeof namespace === "object" && namespace !== null && !Array.isArray(namespace)
      ? (namespace as Record<string, unknown>).variablesCss
      : undefined;
  if (typeof configured !== "string" || configured.length === 0) {
    throw new Error(
      `oxlint-plugin-propel: set \`settings.${SETTINGS_KEY}.variablesCss\` to the CSS file with ` +
        "propel's `--text-*` `@theme` tokens (relative to the lint root).",
    );
  }
  return isAbsolute(configured) ? configured : resolve(context.cwd, configured);
}

export function getSemanticCategory(token: string, tokens: TypographyTokens): string | null {
  return tokens.sizeToCategory.get(token) ?? null;
}

export function buildSemanticToken(category: string, weight: string): string {
  return `text-${category}-${weight}`;
}

// A `font-WEIGHT` utility whose weight exists in the scale → that weight.
export function fontWeightOf(token: string, tokens: TypographyTokens): string | null {
  if (!token.startsWith("font-")) return null;
  const weight = token.slice("font-".length);
  return tokens.weights.has(weight) ? weight : null;
}

/**
 * The resolved (last-wins) unprefixed `font-WEIGHT` of a class string, or null.
 * Used to discover the weight a cva base applies to all its size variants.
 */
export function weightFromClassString(input: string, tokens: TypographyTokens): string | null {
  let weight: string | null = null;
  for (const segment of input.split(/\s+/)) {
    const found = fontWeightOf(segment, tokens);
    if (found !== null) weight = found;
  }
  return weight;
}

// ---------------------------------------------------------------------------
// Rewriter: the pure string transform (size + weight -> semantic token)
// ---------------------------------------------------------------------------

export type RewriteResult = {
  output: string;
  hasTypographyToken: boolean;
};

// Match a Tailwind-style class token, optionally with variant prefixes
// (`md:`, `hover:`, …) and an optional `!` important marker (prefix or postfix).
//   "text-13"            -> { prefix: "",           base: "text-13", postfix: "" }
//   "md:text-13"         -> { prefix: "md:",        base: "text-13", postfix: "" }
//   "!text-13"           -> { prefix: "!",          base: "text-13", postfix: "" }
//   "text-20!"           -> { prefix: "",           base: "text-20", postfix: "!" }
//   "md:hover:!text-13"  -> { prefix: "md:hover:!", base: "text-13", postfix: "" }
const PREFIXED_TOKEN_RE = /^((?:[a-z0-9][a-z0-9-]*:)*!?)?([a-z][a-z0-9-]*)(!?)$/i;

function splitVariantPrefix(
  token: string,
): { prefix: string; base: string; postfix: string } | null {
  const match = PREFIXED_TOKEN_RE.exec(token);
  if (!match) return null;
  const [, prefix = "", base = "", postfix = ""] = match;
  if (base.length === 0) return null;
  return { prefix, base, postfix };
}

/**
 * Rewrite a single class string, replacing raw size classes with semantic
 * tokens and folding sibling `font-WEIGHT` tokens into the chosen token.
 * Whitespace is preserved so the reassembled string keeps its spacing.
 *
 * `ambientWeight` is the weight inherited from an enclosing context (a cva
 * base's `font-WEIGHT` applies to every size variant). An unprefixed
 * `font-WEIGHT` in *this* string overrides it.
 */
export function rewriteClassName(
  input: string,
  tokens: TypographyTokens,
  ambientWeight = "regular",
): RewriteResult {
  const segments = input.split(/(\s+)/);
  let hasTypographyToken = false;

  // Resolve the weight for this string (last unprefixed `font-WEIGHT` wins),
  // falling back to the ambient (enclosing) weight when it declares none.
  let resolvedWeight = ambientWeight;
  let weightExplicit = false;
  const weightIndices: number[] = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (seg === undefined) continue;
    const w = fontWeightOf(seg, tokens);
    if (w !== null) {
      resolvedWeight = w;
      weightExplicit = true;
      weightIndices.push(i);
    }
  }

  let hasBareRawSize = false;
  let hasVariantRawSize = false;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (seg === undefined) continue;

    const split = splitVariantPrefix(seg);
    if (!split) continue;

    const category = getSemanticCategory(split.base, tokens);
    if (category === null) continue;

    // Tokens with no *variant* prefix pair with the resolved weight; a bare `!`
    // important marker still counts as bare. Variant-prefixed tokens (`md:`,
    // `hover:`, …) default to `regular` — an unprefixed font-WEIGHT can't be
    // safely paired with a variant size (different applicability per breakpoint).
    const isBare = !split.prefix.includes(":");
    const weight = isBare ? resolvedWeight : "regular";
    if (isBare) hasBareRawSize = true;
    else hasVariantRawSize = true;

    segments[i] = `${split.prefix}${buildSemanticToken(category, weight)}${split.postfix}`;
    hasTypographyToken = true;
  }

  // Remove consumed unprefixed font-WEIGHT tokens (now folded into the semantic
  // token) and collapse the orphaned whitespace — only when a bare raw size was
  // found in *this* string to pair with. A `font-WEIGHT` with no local size
  // (e.g. a cva base) is left intact: the size variants read it as their ambient.
  //
  // It is also left intact when the string ALSO has a variant-prefixed raw size:
  // that size is rewritten to `-regular` (variant sizes can't safely fold a bare
  // weight), so the standalone `font-WEIGHT` must stay to preserve the intended
  // weight at that breakpoint (e.g. `text-13 md:text-14 font-bold`).
  if (hasBareRawSize && weightExplicit && !hasVariantRawSize) {
    const toRemove = new Set(weightIndices);
    const cleaned: string[] = [];
    for (let i = 0; i < segments.length; i++) {
      if (toRemove.has(i)) {
        if (cleaned.length > 0 && /^\s+$/.test(cleaned[cleaned.length - 1] ?? "")) {
          cleaned.pop();
        } else if (i + 1 < segments.length && /^\s+$/.test(segments[i + 1] ?? "")) {
          i++;
        }
        continue;
      }
      cleaned.push(segments[i] ?? "");
    }
    return { output: cleaned.join(""), hasTypographyToken };
  }

  return { output: segments.join(""), hasTypographyToken };
}

// ---------------------------------------------------------------------------
// Class-location extractor — mirrors oxlint-tailwindcss's default contract so
// both plugins inspect the same class strings.
// ---------------------------------------------------------------------------

const ATTRIBUTES = new Set(["className", "class"]);
const CALLEES = new Set([
  "cn",
  "clsx",
  "cva",
  "twMerge",
  "tv",
  "cx",
  "classnames",
  "ctl",
  "twJoin",
  "cc",
  "clb",
  "cnb",
  "objstr",
  "classed",
]);
const CVA_LIKE = new Set(["cva", "tv"]);
const TAGS = new Set(["tw"]);
const VARIABLE_PATTERNS = [/^classNames?$/, /^classes$/, /^styles?$/];

const MESSAGE =
  "Avoid raw/non-semantic typography classes. Use the semantic token instead: `{{replacement}}`.";

function calleeName(callee: ESTree.Expression): string | undefined {
  return callee.type === "Identifier" ? callee.name : undefined;
}

function propertyName(key: ESTree.Node): string | undefined {
  if (key.type === "Identifier") return key.name;
  if (key.type === "Literal" && typeof key.value === "string") return key.value;
  return undefined;
}

// The last unprefixed `font-WEIGHT` reachable in a base expression, or null. A
// cva base is often a `cx("…font-medium…", …)` wrapper, so this recurses through
// the same string-bearing shapes `collect` does.
function weightFromExpression(
  node: ESTree.Node | null | undefined,
  tokens: TypographyTokens,
): string | null {
  if (!node) return null;
  let weight: string | null = null;
  switch (node.type) {
    case "Literal":
      if (typeof node.value === "string") {
        const found = weightFromClassString(node.value, tokens);
        if (found !== null) weight = found;
      }
      break;
    case "TemplateLiteral":
      for (const quasi of node.quasis) {
        const found = weightFromClassString(quasi.value.raw, tokens);
        if (found !== null) weight = found;
      }
      break;
    case "ArrayExpression":
      for (const element of node.elements) {
        const found = weightFromExpression(element, tokens);
        if (found !== null) weight = found;
      }
      break;
    case "CallExpression":
      for (const arg of node.arguments) {
        const found = weightFromExpression(arg, tokens);
        if (found !== null) weight = found;
      }
      break;
    case "ConditionalExpression": {
      const consequent = weightFromExpression(node.consequent, tokens);
      if (consequent !== null) weight = consequent;
      const alternate = weightFromExpression(node.alternate, tokens);
      if (alternate !== null) weight = alternate;
      break;
    }
    case "LogicalExpression": {
      const left = weightFromExpression(node.left, tokens);
      if (left !== null) weight = left;
      const right = weightFromExpression(node.right, tokens);
      if (right !== null) weight = right;
      break;
    }
    default:
      break;
  }
  return weight;
}

// The weight a cva()/tv() base applies to every size variant: the positional
// base argument (cva, possibly a `cx(...)` wrapper) or the `base` property (tv).
function baseWeightOf(node: ESTree.CallExpression, tokens: TypographyTokens): string {
  let weight = "regular";
  for (const arg of node.arguments) {
    if (arg.type === "ObjectExpression") {
      for (const prop of arg.properties) {
        if (prop.type === "Property" && propertyName(prop.key) === "base") {
          const found = weightFromExpression(prop.value, tokens);
          if (found !== null) weight = found;
        }
      }
    } else {
      const found = weightFromExpression(arg, tokens);
      if (found !== null) weight = found;
    }
  }
  return weight;
}

const rule = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description:
        "Disallow raw typography utility classes in favor of semantic typography tokens.",
    },
    messages: {
      rawTypography: MESSAGE,
    },
  },
  create(context: Context) {
    const text = context.sourceCode.text;
    const tokens = loadTypographyTokens(resolveVariablesCssPath(context));

    // A class-bearing string literal: rewrite its inner text and, if it changed,
    // report with an autofix that replaces only the text between the quotes.
    function checkLiteral(node: ESTree.StringLiteral, ambient: string): void {
      const [start, end] = node.range;
      const innerRaw = text.slice(start + 1, end - 1);
      const { output } = rewriteClassName(innerRaw, tokens, ambient);
      if (output === innerRaw) return;
      context.report({
        node,
        messageId: "rawTypography",
        data: { replacement: output },
        fix: (fixer) => fixer.replaceTextRange([start + 1, end - 1], output),
      });
    }

    // A class-bearing template quasi. oxlint's TemplateElement `range` spans the
    // surrounding delimiters, so locate the verbatim quasi text within the span
    // and replace only that slice.
    function checkTemplateElement(quasi: ESTree.TemplateElement, ambient: string): void {
      const raw = quasi.value.raw;
      if (raw.length === 0) return;
      const { output } = rewriteClassName(raw, tokens, ambient);
      if (output === raw) return;
      const [start, end] = quasi.range;
      const span = text.slice(start, end);
      const offset = span.indexOf(raw);
      if (offset === -1) return; // can't locate safely — skip rather than corrupt
      const innerStart = start + offset;
      context.report({
        node: quasi,
        messageId: "rawTypography",
        data: { replacement: output },
        fix: (fixer) => fixer.replaceTextRange([innerStart, innerStart + raw.length], output),
      });
    }

    // Walk a class-context expression, visiting every class-bearing string with
    // the given ambient weight. CallExpression is intentionally NOT recursed
    // here: nested `cx`/`cva` calls are visited independently by the top-level
    // CallExpression handler, so recursing would double-report.
    function collect(node: ESTree.Node | null | undefined, ambient: string): void {
      if (!node) return;
      switch (node.type) {
        case "Literal":
          if (typeof node.value === "string") checkLiteral(node, ambient);
          break;
        case "TemplateLiteral":
          for (const quasi of node.quasis) checkTemplateElement(quasi, ambient);
          break;
        case "ArrayExpression":
          for (const element of node.elements) collect(element, ambient);
          break;
        case "ConditionalExpression":
          collect(node.consequent, ambient);
          collect(node.alternate, ambient);
          break;
        case "LogicalExpression":
          collect(node.left, ambient);
          collect(node.right, ambient);
          break;
        default:
          break;
      }
    }

    // cva()/tv() config object: variants.* and compoundVariants[].class inherit
    // the base weight as their ambient; tv's `base`/`slots` use their own.
    function collectFromCvaConfig(object: ESTree.ObjectExpression, baseWeight: string): void {
      for (const prop of object.properties) {
        if (prop.type !== "Property") continue;
        const name = propertyName(prop.key);
        const value = prop.value;
        if (name === "variants" && value.type === "ObjectExpression") {
          for (const category of value.properties) {
            if (category.type !== "Property") continue;
            const categoryValue = category.value;
            if (categoryValue.type !== "ObjectExpression") continue;
            for (const variant of categoryValue.properties) {
              if (variant.type === "Property") collect(variant.value, baseWeight);
            }
          }
        } else if (name === "compoundVariants" && value.type === "ArrayExpression") {
          for (const entry of value.elements) {
            if (!entry || entry.type !== "ObjectExpression") continue;
            for (const entryProp of entry.properties) {
              if (entryProp.type !== "Property") continue;
              const entryName = propertyName(entryProp.key);
              if (entryName === "class" || entryName === "className") {
                collect(entryProp.value, baseWeight);
              }
            }
          }
        } else if (name === "defaultVariants") {
          // ignore — its values are variant keys, not classes
        } else {
          // tv()'s `base`/`slots`/`compoundSlots` and any other string-bearing prop.
          collect(value, "regular");
        }
      }
    }

    function collectFromCvaCall(node: ESTree.CallExpression): void {
      const baseWeight = baseWeightOf(node, tokens);
      for (const arg of node.arguments) {
        if (arg.type === "ObjectExpression") collectFromCvaConfig(arg, baseWeight);
        else collect(arg, "regular");
      }
    }

    return {
      JSXAttribute(node: ESTree.JSXAttribute): void {
        const name = node.name.type === "JSXIdentifier" ? node.name.name : undefined;
        if (name === undefined || !ATTRIBUTES.has(name)) return;
        const value = node.value;
        if (!value) return;
        if (value.type === "Literal") {
          if (typeof value.value === "string") checkLiteral(value, "regular");
        } else if (value.type === "JSXExpressionContainer") {
          collect(value.expression, "regular");
        }
      },
      CallExpression(node: ESTree.CallExpression): void {
        const name = calleeName(node.callee);
        if (name === undefined || !CALLEES.has(name)) return;
        if (CVA_LIKE.has(name)) collectFromCvaCall(node);
        else for (const arg of node.arguments) collect(arg, "regular");
      },
      TaggedTemplateExpression(node: ESTree.TaggedTemplateExpression): void {
        const name = node.tag.type === "Identifier" ? node.tag.name : undefined;
        if (name === undefined || !TAGS.has(name)) return;
        collect(node.quasi, "regular");
      },
      VariableDeclarator(node: ESTree.VariableDeclarator): void {
        const id = node.id;
        if (id.type !== "Identifier") return;
        if (!VARIABLE_PATTERNS.some((pattern) => pattern.test(id.name))) return;
        if (node.init) collect(node.init, "regular");
      },
    };
  },
};

const plugin = {
  meta: { name: "propel" },
  rules: {
    "no-raw-typography-class": rule,
  },
};

export default plugin;
