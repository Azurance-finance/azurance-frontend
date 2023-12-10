/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "ipfs.dweb.link", "ipfs.io", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
