# Agents Guide

## Layout & Design Rules

### Symmetrical Layout Rule
The 3-part footer section (Name, Quick Links, Connect) must always use equal division (1/3 each) when displayed side by side. Content within each column must be centered both horizontally (`items-center text-center`) to ensure no column looks heavier or emptier than the others. This applies to all multi-column layouts on the site — avoid leaving larger empty spots in the viewport without reason.

### General Guidelines
- Components use `flex flex-col items-center text-center` for centered layouts.
- Grid columns should use equal fractions (e.g. `grid-cols-3`) rather than asymmetric splits unless a specific design intent is documented.

### Build Verification
Before committing, always run `npx next build` to verify no build errors, and `npx next lint` to check for warnings (pre-existing warnings unrelated to your changes are acceptable).
