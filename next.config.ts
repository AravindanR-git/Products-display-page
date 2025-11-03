/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/<repo-name>',     // <-- replace with your repo name
  assetPrefix: '/<repo-name>/', // <-- replace with your repo name
};

export default nextConfig;
