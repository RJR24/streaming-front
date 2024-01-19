/** @type {import('next').NextConfig} **/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "images.generated.photos",
      },
      {
        protocol: "https",
        hostname: "image.freepik.com",
      },
    ],
  },
};

module.exports = nextConfig;
