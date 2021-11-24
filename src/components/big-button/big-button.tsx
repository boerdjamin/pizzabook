import * as React from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import { BorderRadius, Colors, textStyles } from '../../styles';

export enum ButtonMode {
  Primary,
  Secondary,
}

interface BigButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  readonly mode?: ButtonMode;
  readonly disabled?: boolean;
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
}

const BigButton = ({
  label,
  onPress,
  mode = ButtonMode.Primary,
  disabled = false,
  style,
  labelStyle,
}: BigButtonProps) => {
  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor:
      mode === ButtonMode.Primary ? Colors.success : Colors.lightGrey,
  };

  return (
    <TouchableOpacity
      style={[styles.button, backgroundStyle, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[textStyles.button, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BigButton;

const styles = StyleSheet.create({
  button: {
    width: 160,
    height: 56,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
