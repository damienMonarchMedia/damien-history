# Prototype 1 validation

- Rebuilt the static HTML from JSON; 12 unique event IDs and all citation references validated.
- All local image/script/style links resolve. Image elements carry alternate text; figures carry captions.
- Browser inspection at 1440px and 390px found no document horizontal overflow.
- Map opens with an actual archive image; zoom to 150%, arrow-key panning, reset to 100%, Escape dismissal and focus restoration verified in the in-app browser.
- No browser console errors or warnings observed during tested flows.
- JavaScript syntax check passed.
- All 12 WebP derivatives together total approximately 1.39 MB. Later images load lazily; image dimensions reserve space; the hero has priority.
- Reduced motion is implemented in CSS and respected by the parallax logic; no OS preference was changed during testing.
- Static story content and native era anchors are present in HTML independently of JavaScript.

Limits: no full screen-reader audit or physical-device touch test performed. This is an editorial/interaction prototype. Image credits and the 1963 field documentation have explicitly recorded follow-up work. The map has zoom/pan but no georeferencing or parcel hotspots. Alumni profiles are intentionally not populated.
