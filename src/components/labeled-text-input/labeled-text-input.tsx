import * as React from 'react';

import { INPUT_HEIGHT, Spacing, commonStyles, textStyles } from '../../styles';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

export interface LabeledTextInputProps extends TextInputProps {
  readonly label: string;
  readonly value: string;
  readonly onType: (value: string) => void;
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
}

const LabeledTextInput = (props: LabeledTextInputProps) => {
  const { label, onType, style, labelStyle, numberOfLines, placeholder } =
    props;
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
        onChangeText={onType}
        style={[commonStyles.input, textAreaStyle]}
        placeholder={placeholder}
      />
    </View>
  );
};

export { LabeledTextInput };

const styles = StyleSheet.create({
  label: {
    ...textStyles.h3,
    marginBottom: Spacing.medium,
  },
});
