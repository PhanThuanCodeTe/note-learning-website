import type { NextConfig } from "next";

const env = process.env.NODE_ENV || 'development';

const API_URLS = {
  development: 'http://localhost:4000',
  test: 'http://localhost:4000',
  production: 'http://localhost:4000',
};

const config: NextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: API_URLS[env as keyof typeof API_URLS],
  },
};


export default config;
