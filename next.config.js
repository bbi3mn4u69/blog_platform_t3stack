/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains: ['lh3.googleusercontent.com', 'blog-picture.s3.ap-southeast-2.amazonaws.com', 'intro-picture.s3.ap-southeast-2.amazonaws.com']
    }
};


export default config;
