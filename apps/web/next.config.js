/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
      "flowbite.s3.amazonaws.com",
      "i.pravatar.cc"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.pravatar.cc",
        pathname: '/150',
      },
    ],
  },
};
