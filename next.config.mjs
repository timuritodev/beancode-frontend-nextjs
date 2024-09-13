/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['beancode.ru', 'localhost'], 
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
