import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from '@theme/colors';
import {Alert, Linking} from 'react-native';
import InAppBrowser, {
  InAppBrowserOptions,
} from 'react-native-inappbrowser-reborn';
import {INSTALLATION_ID} from './constants';

const Helper = {
  generateUUID: (): string => {
    const hexOctet: string = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    return `${
      hexOctet + hexOctet
    }-${hexOctet}-${hexOctet}-${hexOctet}-${hexOctet}${hexOctet}${hexOctet}`;
  },
  getHitSlop: (hitSlop: number = 5) => ({
    left: hitSlop,
    right: hitSlop,
    bottom: hitSlop,
    top: hitSlop,
  }),
  /**
   * Add opacity to color
   */
  colorOpacity: (color: string, opacity: number) => {
    const rgbArr = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbArr) {
      const [r, g, b] = rgbArr;
      return `rgba(${r},${g},${b},${opacity})`;
    } else {
      const colors = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
      if (colors) {
        const [, r, g, b] = colors;
        return `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(
          b,
          16,
        )},${opacity})`;
      }
    }
    return color;
  },
  /**
   * Calculate Lighter or Darker Hex Colors
   *
   * ```
   * Helper.colorLuminance("#69c", 0);		// returns "#6699cc"
   * Helper.colorLuminance("6699CC",0 , 0.2);	// "#6699cc33" - set 20% alpha transparence to #6699cc
   * Helper.colorLuminance("6699CC", 0.2);	// "#7ab8f5" - 20% lighter
   * Helper.colorLuminance("69C", -0.5);	// "#334d66" - 50% darker
   * Helper.colorLuminance("000", 1);		// "#000000" - true black cannot be made lighter!
   * ```
   */
  colorLuminance: (hex: string, lum: number, opacity?: number): string => {
    if (!hex.startsWith('#')) {
      return hex;
    }
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    let rgb = '#',
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }
    if (opacity) {
      const intValue = Math.round(opacity * 255);
      const hexValue = intValue.toString(16);
      return rgb + hexValue.padStart(2, '0');
    }
    return rgb;
  },
  openLink: async (url: string, options?: InAppBrowserOptions | undefined) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: Colors.tealBlue,
          preferredControlTintColor: 'white',
          modalEnabled: true,
          modalPresentationStyle: 'automatic',
          animated: true,
          enableBarCollapsing: false,

          // Android Properties
          showTitle: true,
          toolbarColor: Colors.primary,
          secondaryToolbarColor: Colors.tealBlue,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          ...options,
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      InAppBrowser.close();
      Alert.alert(error.message);
    }
  },
  getInstallationId: async () => {
    let installationId;
    const storedInstallationId = await AsyncStorage.getItem(INSTALLATION_ID);
    if (storedInstallationId) {
      installationId = storedInstallationId;
    } else {
      installationId = Helper.generateUUID();
      await AsyncStorage.setItem(INSTALLATION_ID, installationId);
    }
    return installationId;
  },
};

export default Helper;
