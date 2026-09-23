# Damien · A Living History

Prototype 1 for Damien Memorial School, built for Damien Monarch Media. A responsive static scrollytelling exhibit with 12 representative moments, seven era links, source disclosures, an interactive 1885 map viewer and an Alumni Hall of Fame shell.

## Preview

Open `index.html` directly in a browser. No install, service, API key or build is required. For a local server, run `python3 -m http.server 8765` in this directory and visit http://localhost:8765.

The complete story remains readable without JavaScript. The map image is linked in the no-JavaScript notice. All runtime assets are local; no analytics or external font services are loaded.

## Editing

- `data/timeline.json`: events, narrative order, era labels, citations, evidence status and alumni categories.
- `data/assets.json`: image provenance, original Drive IDs, dimensions and derivative details.
- `scripts/build.py`: renders the structured content into accessible static HTML. Run `python3 scripts/build.py` after editorial edits and commit the generated `index.html` too.
- `styles.css`: responsive typography, layout, color and motion preferences.
- `app.js`: progressive enhancement, progress/era tracking, parallax and map interactions.
- `assets/`: optimized web derivatives only. Preservation masters remain untouched in the archive.

The story follows a thematic sequence (Damien → Edmund Rice → ʻĀina → school), not a globally sorted date sequence. Individual dates are always shown. Era links use native anchors and survive without JavaScript.

## Accessibility and interactions

Semantic headings/landmarks, skip link, visible keyboard focus, native source disclosures, meaningful captions, reduced-motion support and responsive stacked layouts. The map is a native modal dialog; Escape closes it and returns focus to the opener. Zoom buttons, keyboard +/−, arrow keys, pan buttons and pointer dragging work without requiring a mouse wheel or pinch gesture. Zoom ranges from 100% to 500%; 0 or Reset restores the view. Touch users can drag with one finger and use the zoom buttons.

## Editorial scope

Dates and claims retain evidence status. The Houghtailing photograph does not identify the child. ʻIli reconstruction is distinguished from surveyed property lines. The school’s own history governs the 1962 opening, resolving the discrepancy noted in the research synthesis. The 1963 field entry is attributed to the project timeline pending attachment of underlying records. The 2026 entry is an editorial present-day reflection, not a claim that a planned football field has been completed.

The map has no fabricated hotspots or parcel coordinates. Georeferenced layers and claimant records are future work. Alumni categories are an exhibit shell with no invented inductees or nomination submissions. Yearbook browsing is outside Prototype 1.

Archive material is used as replaceable prototype imagery at the project owner's direction. Source ownership is retained; this repository does not assign an open license to archival media. See asset metadata for provenance and unresolved credit information.

## Validation

See `VALIDATION.md` for checks performed and remaining limits.
