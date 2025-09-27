import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.537dbde858c14c7f96f0a0933478f453',
  appName: 'Krishi - Agricultural Companion',
  webDir: 'dist',
  server: {
    url: 'https://537dbde8-58c1-4c7f-96f0-a0933478f453.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#22c55e',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      backgroundColor: '#22c55e',
      style: 'LIGHT',
    }
  }
};

export default config;