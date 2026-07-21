/**
 * Patch embedded HTML to display correctly inside an iframe.
 *
 * Injects CSS that ensures proper sizing behavior when HTML content
 * is rendered via srcDoc in a fixed 16:9 iframe canvas.
 *
 * IMPORTANT: Interactive widgets render inside a fixed 16:9 aspect-ratio
 * iframe. Learners cannot scroll the iframe — all content must fit within
 * the viewport. overflow: hidden on html/body prevents clipped content
 * from causing invisible layout overflow. Inner regions that need scrolling
 * (e.g. control panels) should use the .scrollable class or data-scrollable
 * attribute, which are explicitly re-enabled below.
 */
export function patchHtmlForIframe(html: string): string {
  const iframeCss = `<style data-iframe-patch>
  /*
   * Canvas constraint: fixed 16:9 iframe — no learner scrolling available.
   * All content must fit within 100vw × 100vh.
   */
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
  /* Allow explicitly scrollable inner regions (control panels, lists, etc.) */
  [data-scrollable],
  .scrollable,
  .overflow-auto,
  .overflow-y-auto,
  .overflow-scroll,
  .overflow-y-scroll {
    overflow: auto !important;
  }
</style>`;

  // Insert right after <head> or at the start of the document
  const headIdx = html.indexOf('<head>');
  if (headIdx !== -1) {
    const insertPos = headIdx + 6; // after <head>
    return html.substring(0, insertPos) + '\n' + iframeCss + html.substring(insertPos);
  }

  const headWithAttrs = html.indexOf('<head ');
  if (headWithAttrs !== -1) {
    const closeAngle = html.indexOf('>', headWithAttrs);
    if (closeAngle !== -1) {
      const insertPos = closeAngle + 1;
      return html.substring(0, insertPos) + '\n' + iframeCss + html.substring(insertPos);
    }
  }

  // Fallback: prepend
  return iframeCss + html;
}
