import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para Capacitor - export estático
  output: 'export',
  
  // Disable image optimization para export estático
  images: {
    unoptimized: true,
  },
  
  // Base path vazio para Capacitor
  basePath: '',
  
  // Trailing slash para compatibilidade com file:// protocol
  trailingSlash: true,
};

export default nextConfig;
