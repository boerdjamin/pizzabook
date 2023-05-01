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
import { ButtonMode } from '../big-button/big-button';

interface SmallButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  readonly mode?: ButtonMode;
  readonly disabled?: boolean;
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
}

const SmallButton = ({
  label,
  onPress,
  disabled = false,
  style,
  labelStyle,
}: SmallButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[textStyles.button, styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export { SmallButton };

const styles = StyleSheet.create({
  button: {
    width: 160,
    height: 32,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    borderColor: Colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Colors.text,
  },
});
