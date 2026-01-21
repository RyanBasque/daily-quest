import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daily-quest.app',
  appName: 'Daily Quest',
  webDir: 'out',
  
  server: {
    // Importante: usar localhost para desenvolvimento
    // Em produção, remover ou comentar
    // url: 'http://192.168.1.X:3000',
    // cleartext: true
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
    },
    
    StatusBar: {
      style: 'dark',
      backgroundColor: '#000000',
    },
    
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },

  ios: {
    contentInset: 'always',
    scheme: 'Daily Quest',
  },

  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
};

export default config;
