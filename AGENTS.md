# Agents Guide

## Layout & Design Rules

### Symmetrical Layout Rule
The 3-part footer section (Name, Quick Links, Connect) must always use equal division (1/3 each) when displayed side by side. Content within each column must be centered both horizontally (`items-center text-center`) to ensure no column looks heavier or emptier than the others. This applies to all multi-column layouts on the site — avoid leaving larger empty spots in the viewport without reason.

### General Guidelines
- Components use `flex flex-col items-center text-center` for centered layouts.
- Grid columns should use equal fractions (e.g. `grid-cols-3`) rather than asymmetric splits unless a specific design intent is documented.

### Build Verification
Before committing, always run `npx next build` to verify no build errors, and `npx next lint` to check for warnings (pre-existing warnings unrelated to your changes are acceptable).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
