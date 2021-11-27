import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { BorderRadius, Colors, Spacing, textStyles } from '../../styles';

interface LabeledTextInputProps {
  readonly label: string;
  readonly value: string;
  readonly onType: (value: string) => void;
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
}

const LabeledTextInput = ({
  label,
  value,
  onType,
  style,
  labelStyle,
}: LabeledTextInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput value={value} onChangeText={onType} style={styles.input} />
    </View>
  );
};

export default LabeledTextInput;

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  label: {
    ...textStyles.label,
    marginBottom: Spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: BorderRadius.small,
    height: 32,
    alignItems: 'center',
    padding: Spacing.smaller,
  },
});
