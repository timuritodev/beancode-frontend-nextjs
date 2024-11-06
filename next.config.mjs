/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['beancode.ru'], 
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'beancode.ru',
          pathname: '/api/images/**', 
        },
      ],
    },
  };
  
  export default nextConfig;
  