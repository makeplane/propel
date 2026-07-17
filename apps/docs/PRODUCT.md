# Product

## Register

product

## Platform

web

## Users

Two audiences, internal first. The primary readers are Plane's own engineers and
designers adopting `@makeplane/propel` into the Plane app. They arrive mid-task,
already inside a feature, needing the exact props, variants, and anatomy of one
specific component to wire it in correctly and move on. External developers who
consume `@makeplane/propel` as a published library are the secondary audience,
served by the same reference but weighted second when the two needs conflict.

No single reading task dominates. On any given visit a developer might look up a
component's API, copy a working example into their app, install the package and
render a first component, or browse to discover what already exists — the site has
to serve all four equally well rather than optimize for one.

## Product Purpose

The canonical reference for `@makeplane/propel`'s React components. It exists so a
developer can use any component correctly — the right props, the right composition,
the right anatomy — without opening the library's source. Success is precisely
that: the source stays closed because the docs already answered the question.

## Positioning

The documentation renders the real, running library — every component shown as a
live interactive instance beside its exact source, with props tables generated
from propel's own TypeScript types. It is the one reference that cannot drift from
the code it documents, because it is wired to that code rather than describing it.

## Brand Personality

Precise, calm, authoritative. The site reads like a spec you can trust, not a page
trying to sell you — understated confidence, no persuasion tactics, every word
load-bearing. The chrome recedes so the components themselves carry each page; the
voice is that of a careful engineer, not a marketer.

## Anti-references

Not a generic SaaS or AI landing page: no gradient hero, no floating glass cards,
no tracked eyebrow over every section, no marketing fluff. Not Material Design's
specific look — no ripples, no elevation scattered everywhere. Not the cluttered
raw-Storybook or enterprise-addon aesthetic of dense grey knob panels. Not playful
or over-animated — no bouncy motion, mascots, or decorative illustration. Anything
that undercuts "serious, trustworthy tool" is wrong here.

## Design Principles

Accuracy over prose. The docs are wired to the real library — dev-aliased to
propel's `src`, props tables generated from its real types — so a page can never
claim something a component doesn't actually do. When the library changes, the docs
change with it.

The component is the hero. Chrome, navigation, and layout recede so the live
example and its real source are what the eye lands on. The page is a frame around
the component, not a composition competing with it.

Show the real thing, twice. Every component appears as a live, interactive instance
_and_ as its exact source, together — never a screenshot, never a paraphrase. What
the reader sees working is what they can copy.

Earned familiarity. Navigation, layout, and interaction follow the conventions a
developer fluent in Radix, Stripe, and Tailwind docs already knows. No invented
affordances for standard tasks; the interface disappears into the lookup.

Practice what it documents. The site is built from propel's own tokens and honors
its themes — light, dark, and high-contrast — and respects reduced motion. The docs
are the design system demonstrating itself, which is its own proof of quality.

## Accessibility & Inclusion

WCAG 2.2 AA across the site: AA contrast on all text, full keyboard operability,
and a visible focus state everywhere. The site itself honors propel's own theming —
the light, dark, and high-contrast variants the token system ships — and respects
`prefers-reduced-motion`, offering a crossfade or instant alternative to every
transition. The docs hold themselves to the accessibility the library preaches.
