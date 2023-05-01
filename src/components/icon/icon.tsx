import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Colors } from '../../styles';

interface IconProps {
  readonly icon: ImageSourcePropType;
  readonly size?: number;
  readonly color?: string;
  readonly wrapperStyle?: StyleProp<ViewStyle>;
}

const Icon = ({ icon, size, color, wrapperStyle }: IconProps) => {
  const dimensions = { height: size || 24, width: size || 24 };
  return (
    <View style={[dimensions, wrapperStyle]}>
      <Image
        source={icon}
        style={{ ...styles.icon, tintColor: color || Colors.text }}
      />
    </View>
  );
};

export { Icon };

const styles = StyleSheet.create({
  icon: { height: '100%', width: '100%' },
});
