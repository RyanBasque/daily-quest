import { Capacitor } from '@capacitor/core';

export const isNative = () => {
  return Capacitor.isNativePlatform();
};

export const getPlatform = () => {
  return Capacitor.getPlatform(); // 'ios', 'android', 'web'
};

export const initializeCapacitor = async () => {
  if (!isNative()) return;

  try {
    const [{ StatusBar, Style }, { SplashScreen }] = await Promise.all([
      import('@capacitor/status-bar'),
      import('@capacitor/splash-screen')
    ]);

    await StatusBar.setStyle({ style: Style.Dark });
    
    await SplashScreen.hide({
      fadeOutDuration: 300,
    });

    console.log('Capacitor initialized successfully');
  } catch (error) {
    console.error('Error initializing Capacitor:', error);
  }
};


export const setStatusBarTheme = async (isDark: boolean) => {
  if (!isNative()) return;

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({
      style: isDark ? Style.Dark : Style.Light,
    });
  } catch (error) {
    console.error('Error setting status bar theme:', error);
  }
};


export const configureStatusBar = async (options: {
  backgroundColor?: string;
  style?: 'light' | 'dark';
}) => {
  if (!isNative()) return;

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    
    if (options.style) {
      await StatusBar.setStyle({
        style: options.style === 'dark' ? Style.Dark : Style.Light,
      });
    }

    if (getPlatform() === 'android' && options.backgroundColor) {
      await StatusBar.setBackgroundColor({
        color: options.backgroundColor,
      });
    }
  } catch (error) {
    console.error('Error configuring status bar:', error);
  }
};

export const showSplash = async () => {
  if (!isNative()) return;
  const { SplashScreen } = await import('@capacitor/splash-screen');
  await SplashScreen.show({
    showDuration: 2000,
    autoHide: true,
  });
};

export const hideSplash = async () => {
  if (!isNative()) return;
  const { SplashScreen } = await import('@capacitor/splash-screen');
  await SplashScreen.hide();
};


export const isPluginAvailable = (pluginName: string): boolean => {
  return Capacitor.isPluginAvailable(pluginName);
};

export const convertFileSrc = (filePath: string): string => {
  return Capacitor.convertFileSrc(filePath);
};

export const isIOS = () => getPlatform() === 'ios';
export const isAndroid = () => getPlatform() === 'android';
export const isWeb = () => getPlatform() === 'web';
