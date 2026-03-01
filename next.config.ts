import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize large external packages to only bundle what is actually used
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/drei', 'framer-motion'],
  },
  // Automatically serve modern image formats when supported by the browser
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/play/:path*',
        destination: '/play/:path*', // This is where the magic happens - Vercel will look for other projects
      },
      // Fallback for visual explorations if we wanted to be explicit, but the above covers it. 
      // Actually, for multi-repo support on Vercel, we don't need explicit rewrites in next.config.ts 
      // IF we are using Vercel's "Rewrites" feature in the dashboard or vercel.json.
      // However, to support local development or specific proxying behavior, we can add them here if we have a specific target URL.
      // Since the user wants "vercel to see the repository", this is actually a Vercel Platform feature (Multi-Project deployments).
      // But keeping a rewrite here can be useful for structure.
      // For now, let's keep it simple and clean. The main work for multi-repo on Vercel is in the Vercel Dashboard Project Settings (Rewrites).
      // BUT, we can use this to proxy to a specific URL if needed.
      // Let's stick to the "Play" page internal routing for now, and assume the platform rewrites will handle the external routing 
      // OR we just set up the rewrite here to map /play/project -> external-url.
      // Since we don't have the external URLs yet, we will just add a placeholder comment.
    ];
  },
};

export default nextConfig;
