/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
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