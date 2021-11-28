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
import { Spacing, textStyles } from '../../styles';
import commonStyles from '../../styles/common';

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
    <View style={style}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onType}
        style={commonStyles.input}
      />
    </View>
  );
};

export default LabeledTextInput;

const styles = StyleSheet.create({
  label: {
    ...textStyles.label,
    marginBottom: Spacing.small,
  },
});
