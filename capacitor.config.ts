import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e58ab081f51548b5842ace51c11b34f6',
  appName: 'PencilCheck',
  webDir: 'dist',
  server: {
    url: 'https://e58ab081-f515-48b5-842a-ce51c11b34f6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;