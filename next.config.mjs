/** @type {import('next').NextConfig} */
const nextConfig = {
    // Outputs a Single-Page Application (SPA). Production only: in dev this makes
    // the optional catch-all route swallow HMR requests for hot-update.json, which
    // then 500 and force Fast Refresh into a full page reload.
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    distDir: './build', // Changes the build output directory to `./dist`.
    basePath: '',  // Add this line
    // assetPrefix: 'https://marktension.nl/',  // Add trailing slash
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://marktension.nl/' : '',
    trailingSlash: true,  // Add this line

    webpack: (config) => {
        config.module.rules.push({
          test: /\.md$/,
          use: 'raw-loader',
          exclude: /node_modules/,
        });
        return config;
    },
    images: {
        unoptimized: true
    }
}

export default nextConfig