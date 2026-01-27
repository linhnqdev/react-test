/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Tối ưu SASS compilation
  sassOptions: {
    includePaths: ["./src/styles"],
    // Disable source maps trong production để nhanh hơn
    outputStyle: process.env.NODE_ENV === "production" ? "compressed" : "expanded",
  },
  
  // Tối ưu images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Tối ưu image optimization
    formats: ["image/avif", "image/webp"],
  },
  
  // Tối ưu webpack cho development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Tăng tốc rebuild trong dev mode
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  
  // Tối ưu compilation
  // Note: SWC minifier đã là default trong Next.js 15, không cần config
  
  // Tối ưu output
  compress: true,
  
  // Tắt source maps trong production để build nhanh hơn
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
