import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { PushNotifications } from '@capacitor/push-notifications';

export interface DeviceInfo {
  platform: string;
  model: string;
  operatingSystem: string;
  osVersion: string;
  manufacturer: string;
  isVirtual: boolean;
  webViewVersion: string;
}

export const useNativeAPIs = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const checkPlatform = async () => {
      try {
        const info = await Device.getInfo();
        setIsNative(info.platform !== 'web');
        setDeviceInfo(info as DeviceInfo);
      } catch (error) {
        console.log('Rodando em navegador web');
        setIsNative(false);
      }
    };

    checkPlatform();
  }, []);

  const registerPushNotifications = async () => {
    if (!isNative) {
      console.log('Push notifications só funcionam em dispositivos nativos');
      return;
    }

    try {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('Permissão para notificações negada');
      }

      await PushNotifications.register();

      await PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
      });

      await PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });

      await PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          console.log('Push notification received: ', notification);
        }
      );

      await PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification) => {
          console.log('Push notification action performed', notification);
        }
      );

    } catch (error) {
      console.error('Erro ao registrar push notifications:', error);
      throw error;
    }
  };

  const getDeviceInfo = async (): Promise<DeviceInfo> => {
    const info = await Device.getInfo();
    return info as DeviceInfo;
  };

  const getDeviceId = async () => {
    const info = await Device.getId();
    return info.identifier;
  };

  return {
    isNative,
    deviceInfo,
    registerPushNotifications,
    getDeviceInfo,
    getDeviceId,
  };
};
