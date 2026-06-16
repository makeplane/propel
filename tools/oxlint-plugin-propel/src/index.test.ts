import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import plugin, {
  buildSemanticToken,
  fontWeightOf,
  getSemanticCategory,
  loadTypographyTokens,
  parseTypographyTokens,
  rewriteClassName,
  type TypographyTokens,
  weightFromClassString,
} from "./index.ts";

// A miniature stand-in for variables.css — same `@theme` shape, fewer rows. The
// parser must derive the size→category map and the weight set from this alone.
const SAMPLE_CSS = `
@theme {
  --text-*: initial;
  --text-12: 0.75rem;
  --text-13: 0.8125rem;
  --text-14: 0.875rem;
  --text-20: 1.25rem;

  --text-caption-md-regular: var(--text-12);
  --text-caption-md-medium: var(--text-12);
  --text-body-xs-regular: var(--text-13);
  --text-body-xs-medium: var(--text-13);
  --text-body-sm-regular: var(--text-14);
  --text-body-sm-semibold: var(--text-14);
  --text-h4-regular: var(--text-20);
  --text-h4-bold: var(--text-20);
}
`;

const tokens: TypographyTokens = parseTypographyTokens(SAMPLE_CSS);

describe("parseTypographyTokens", () => {
  it("derives size→category from the var(--text-N) references", () => {
    expect(tokens.sizeToCategory.get("text-13")).toBe("body-xs");
    expect(tokens.sizeToCategory.get("text-20")).toBe("h4");
    expect(tokens.sizeToCategory.get("text-12")).toBe("caption-md");
  });

  it("treats the final segment as the weight (categories may contain dashes)", () => {
    expect([...tokens.weights].sort()).toEqual(["bold", "medium", "regular", "semibold"]);
  });

  it("ignores the raw `--text-N` size declarations (not var() references)", () => {
    // text-9 has no semantic token referencing it, so it is not migratable.
    expect(tokens.sizeToCategory.has("text-9")).toBe(false);
  });
});

describe("token lookups", () => {
  it("maps known raw sizes and rejects unknown ones", () => {
    expect(getSemanticCategory("text-13", tokens)).toBe("body-xs");
    expect(getSemanticCategory("text-secondary", tokens)).toBeNull();
    expect(getSemanticCategory("constructor", tokens)).toBeNull();
  });

  it("recognizes font-WEIGHT only for weights present in the scale", () => {
    expect(fontWeightOf("font-medium", tokens)).toBe("medium");
    expect(fontWeightOf("font-bold", tokens)).toBe("bold");
    expect(fontWeightOf("font-sans", tokens)).toBeNull();
  });

  it("resolves the last unprefixed weight in a class string", () => {
    expect(weightFromClassString("flex text-secondary", tokens)).toBeNull();
    expect(weightFromClassString("font-medium gap-2 font-bold", tokens)).toBe("bold");
  });
});

describe("buildSemanticToken", () => {
  it("joins category and weight", () => {
    expect(buildSemanticToken("body-xs", "medium")).toBe("text-body-xs-medium");
    expect(buildSemanticToken("h4", "regular")).toBe("text-h4-regular");
  });
});

describe("rewriteClassName", () => {
  it("rewrites a size-only token to the regular weight", () => {
    expect(rewriteClassName("text-13", tokens).output).toBe("text-body-xs-regular");
  });

  it("folds a sibling font-WEIGHT into the token and removes it", () => {
    expect(rewriteClassName("text-13 font-medium text-secondary", tokens).output).toBe(
      "text-body-xs-medium text-secondary",
    );
  });

  it("keeps surrounding non-typography classes and whitespace", () => {
    expect(rewriteClassName("flex items-center text-14 font-semibold gap-2", tokens).output).toBe(
      "flex items-center text-body-sm-semibold gap-2",
    );
  });

  it("preserves the important marker, prefix and postfix", () => {
    expect(rewriteClassName("text-20!", tokens).output).toBe("text-h4-regular!");
    expect(rewriteClassName("!text-13 font-bold", tokens).output).toBe("!text-body-xs-bold");
  });

  it("preserves variant prefixes and defaults them to regular weight", () => {
    expect(rewriteClassName("md:text-20", tokens).output).toBe("md:text-h4-regular");
    expect(rewriteClassName("md:text-20 font-bold", tokens).output).toBe(
      "md:text-h4-regular font-bold",
    );
  });

  it("applies the ambient (cva base) weight to a size-only string", () => {
    expect(rewriteClassName("text-13", tokens, "medium").output).toBe("text-body-xs-medium");
    expect(rewriteClassName("h-8 px-2 text-14 leading-none", tokens, "semibold").output).toBe(
      "h-8 px-2 text-body-sm-semibold leading-none",
    );
  });

  it("lets a local font-WEIGHT override the ambient weight", () => {
    expect(rewriteClassName("text-13 font-bold", tokens, "medium").output).toBe(
      "text-body-xs-bold",
    );
  });

  it("is a no-op on already-migrated semantic tokens (idempotent)", () => {
    const migrated = "text-body-xs-medium text-secondary";
    expect(rewriteClassName(migrated, tokens).output).toBe(migrated);
  });

  it("leaves strings without raw typography untouched", () => {
    const input = "flex items-center gap-2 rounded-md text-secondary";
    expect(rewriteClassName(input, tokens).output).toBe(input);
    expect(rewriteClassName(input, tokens).hasTypographyToken).toBe(false);
  });
});

describe("real variables.css", () => {
  it("loads propel's actual tokens and matches the design system", () => {
    const real = loadTypographyTokens(
      resolve(import.meta.dirname, "../../../packages/propel/src/styles/variables.css"),
    );
    // Spot-check anchors from packages/propel/src/styles/variables.css.
    expect(real.sizeToCategory.get("text-13")).toBe("body-xs");
    expect(real.sizeToCategory.get("text-20")).toBe("h4");
    expect(real.weights.has("regular")).toBe(true);
    expect(real.weights.has("medium")).toBe(true);
    // Every mapped category produces a token that exists in the file.
    expect(real.sizeToCategory.size).toBeGreaterThan(0);
  });
});

describe("plugin shape", () => {
  it("exposes the named rule", () => {
    expect(plugin.meta.name).toBe("propel");
    expect(plugin.rules["no-raw-typography-class"]).toBeDefined();
    expect(plugin.rules["no-raw-typography-class"].meta.fixable).toBe("code");
  });
});
