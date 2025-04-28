import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import FastImage, {
  FastImageProps,
  Source,
  Priority,
} from 'react-native-fast-image';

interface CustomImageProps extends Omit<FastImageProps, 'source'> {
  source: Source | number;
  loaderSize?: number | 'small' | 'large';
  loaderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  priority?: Priority;
}

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  style,
  loaderSize = 'small',
  loaderColor = '#000000',
  containerStyle,
  imageStyle,
  priority = FastImage.priority.normal,
  onLoadStart,
  onLoad,
  onLoadEnd,
  onError,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoad = useCallback(
    (event: any) => {
      setIsLoading(false);
      onLoad?.(event);
    },
    [onLoad],
  );

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    onLoadEnd?.();
  }, [onLoadEnd]);

  const handleError = useCallback((event: any) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(event);
  },
    [onError],
  );

  // Fallback to require('./placeholder.png') or any other placeholder image
  const actualSource = hasError
    ? { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZABkNKmDUF6OtvxBMfdpmrByfc5ui2p0QvQ&s' } // Add your placeholder image
    : source;

  return (
    <View style={[styles.container, containerStyle]}>
      <FastImage
        style={//@ts-ignore
          [imageStyle]
        }
        source={actualSource}
        priority={priority}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onLoadEnd={handleLoadEnd}
        // onError={handleError}
        {...rest}
      />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'small'} color={'#fff'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default CustomImage;