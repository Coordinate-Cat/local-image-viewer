/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/grid",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
