/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://tradingagents.zeabur.app',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://tradingagents.zeabur.app'}/api/:path*`,
      },
    ]
  },
  // 确保开发服务器绑定到所有网络接口
  experimental: {
    // 这有助于解决某些网络问题
  },
}

module.exports = nextConfig
