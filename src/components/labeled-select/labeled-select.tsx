import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BorderRadius, Colors, Spacing, textStyles } from '../../styles';

export interface PickerItem<T> {
  readonly label: string;
  readonly value: T;
}
interface LabeledSelectProps<T> {
  readonly label: string;
  readonly options: PickerItem<T>[];
  readonly onSelect: (item: T) => void;
  readonly value?: T;
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
}

const LabeledSelect = ({
  label,
  value,
  options,
  style,
  onSelect,
  labelStyle,
}: LabeledSelectProps<any>) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Picker selectedValue={value} onValueChange={onSelect}>
        {options.map(option => (
          <Picker.Item label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

export default LabeledSelect;

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
