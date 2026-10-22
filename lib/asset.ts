// The site can be served from a sub-path (GitHub Pages without the custom
// domain: /zoomlion/). Next prefixes its own links and scripts, but not plain
// <img src> paths into /public, so those go through asset().
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** True for preview builds (e.g. github.io), which must not be indexed as a copy of zoomlion.ie. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "true";

export const asset = (path: string) => BASE_PATH + path;
