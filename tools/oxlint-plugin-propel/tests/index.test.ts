import { RuleTester } from "oxlint/plugins-dev";
import { describe, it } from "vite-plus/test";

import { preferTailwindV4ShorthandRule, RULE_NAME } from "../src/index.ts";

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
  languageOptions: {
    parserOptions: {
      lang: "tsx",
    },
  },
});

function code(value: string): string {
  return value;
}

tester.run(RULE_NAME, preferTailwindV4ShorthandRule, {
  valid: [
    {
      name: "keeps valued data selectors",
      code: 'const className = "data-[state=open]:bg-primary data-[orientation=vertical]:w-3";',
    },
    {
      name: "keeps arbitrary values with fallbacks",
      code: 'const className = "h-[var(--accordion-panel-height,auto)] w-[theme(--spacing-4)]";',
    },
    {
      name: "keeps arbitrary selectors",
      code: 'const className = "[&[data-highlighted]]:bg-primary";',
    },
  ],
  invalid: [
    {
      name: "fixes css variable arbitrary values",
      code: code(
        'const className = "h-[' + "var(--accordion-panel-height)] size-[" + 'var(--node-size)]";',
      ),
      output: 'const className = "h-(--accordion-panel-height) size-(--node-size)";',
      errors: [{ messageId: "preferTailwindV4Shorthand" }],
    },
    {
      name: "fixes presence data variants",
      code: code(
        'const className = "data-[' + "ending-style]:h-0 data-[" + 'highlighted]:text-primary";',
      ),
      output: 'const className = "data-ending-style:h-0 data-highlighted:text-primary";',
      errors: [{ messageId: "preferTailwindV4Shorthand" }],
    },
    {
      name: "fixes grouped and negated presence data variants",
      code: code(
        'const className = "group-data-[' +
          "popup-open]/trigger:text-primary not-data-[" +
          "expanded]:hover:bg-layer-transparent-hover peer-data-[" +
          'active]:opacity-100";',
      ),
      output:
        'const className = "group-data-popup-open/trigger:text-primary not-data-expanded:hover:bg-layer-transparent-hover peer-data-active:opacity-100";',
      errors: [{ messageId: "preferTailwindV4Shorthand" }],
    },
    {
      name: "fixes jsx attribute strings",
      code: code(
        'const element = <div className="data-[' +
          "popup-open]:bg-layer-transparent-hover h-[" +
          'var(--panel-height)]" />;',
      ),
      output:
        'const element = <div className="data-popup-open:bg-layer-transparent-hover h-(--panel-height)" />;',
      errors: [{ messageId: "preferTailwindV4Shorthand" }],
    },
    {
      name: "fixes logical inset arbitrary utilities",
      code: code(
        'const className = "data-[side=inline-start]:end-[' +
          "-3px] data-[side=inline-end]:start-[" +
          '-3px]";',
      ),
      output:
        'const className = "data-[side=inline-start]:inset-e-[-3px] data-[side=inline-end]:inset-s-[-3px]";',
      errors: [{ messageId: "preferTailwindV4Shorthand" }],
    },
    {
      name: "fixes logical inset css variable utilities",
      code: code(
        'const className = "hover:end-[' +
          "var(--edge-offset)] focus:start-[" +
          'var(--edge-offset)]";',
      ),
      output: 'const className = "hover:inset-e-(--edge-offset) focus:inset-s-(--edge-offset)";',
      errors: [{ messageId: "preferTailwindV4Shorthand" }],
    },
  ],
});
