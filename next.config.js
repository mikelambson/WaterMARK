/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'react-icons/fa',
      'react-icons/fa6',
      'react-icons/md',
      'react-icons/fi',
      'react-icons/bs',
      'react-icons/io',
      'react-icons/lu',
    ],
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // config.externals.push({ canvas: 'commonjs canvas' })

    // Enable WebSocket support for HMR over HTTPS
    if (dev && isServer) {
      // Add custom webpack dev server configuration
      config.stats = {
        warnings: false, // Suppress warnings
        errors: true, // Show errors only
        errorDetails: true, // Optional: Include error details
      };
      
      config.devServer = {
        ...config.devServer,
        https: true, // Enable HTTPS
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
        },
        // Enable HMR (Hot Module Replacement)
        hot: true, // Enable HMR
      };
    }

     // Enable source maps for development mode
     if (dev) {
      config.devtool = 'inline-source-map'; // or 'inline-source-map' for inline maps
      config.ignoreWarnings = [/Failed to parse source map/]; // Ignore source map warnings
    }

    return config
  },
};

module.exports = nextConfig;
