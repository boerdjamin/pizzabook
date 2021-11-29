import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Spacing, textStyles } from '../../styles';
import commonStyles, { INPUT_HEIGHT } from '../../styles/common';

export interface LabeledTextInputProps extends TextInputProps {
  readonly label: string;
  readonly value: string;
  readonly onType: (value: string) => void;
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
}

const LabeledTextInput = (props: LabeledTextInputProps) => {
  const { label, value, onType, style, labelStyle, numberOfLines } = props;
  const textAreaStyle: StyleProp<TextStyle> = numberOfLines
    ? {
        height: numberOfLines * INPUT_HEIGHT,
      }
    : undefined;
  return (
    <View style={style}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        {...props}
        multiline={!!numberOfLines && numberOfLines > 1}
        value={value}
        onChangeText={onType}
        style={[commonStyles.input, textAreaStyle]}
      />
    </View>
  );
};

export default LabeledTextInput;

const styles = StyleSheet.create({
  label: {
    ...textStyles.label,
    marginBottom: Spacing.smaller,
  },
});
