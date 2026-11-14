/**
 * Base path for hosting under a sub-path, e.g. GitHub Pages project sites
 * (https://<user>.github.io/<repo>/). Empty for Vercel, Netlify or a user site.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/** Prefix a root-relative public path with the base path. */
export const withBase = (path: string) => `${basePath}${path}`;
