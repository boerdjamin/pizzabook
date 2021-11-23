import * as React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ImageSourcePropType,
  Image,
} from 'react-native';

interface LoaderProps {
  readonly image: ImageSourcePropType;
  readonly bgColor?: string;
}

const Loader = (props: LoaderProps) => {
  return (
    <View style={[styles.container]}>
      <Animated.View>
        <Image source={props.image} />
      </Animated.View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
