
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get("window");

export const DeviceWidth = width;
export const DeviceHeight = height;

const baseWidth = 414; // iPhone 11 - XD Mockup is in iPhone 11
const baseHeight = 896;

export const Normalise = (size: number) => {
    return size * DeviceWidth / 414;
}

export const getResWidth = (size: number) => {
    return (DeviceWidth * size) / baseWidth;
}

export const getResHeight = (size: number) => {
    return (DeviceHeight * size) / baseHeight;
}

export const ANDROID = Platform.OS == 'android';
