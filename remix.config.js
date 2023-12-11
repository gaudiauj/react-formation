/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^remark.*/,
    /^vfile.*/,
    /^unist-util.*/,
    /^unified.*/,
    /^bail.*/,
    /^trough.*/,
    /^mdast.*/,
    /^micromark.*/,
    /^decode-named.*/,
    /^character-.*/,
    /^trim-.*/,
    /^hast-ut.*/,
    /^space-sep.*/,
    /^comma-sep.*/,
    /^property-.*/,
    "react-markdown",
  ],
};
