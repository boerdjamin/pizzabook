import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Spacing, textStyles } from '../../styles';
import commonStyles from '../../styles/common';

export interface PickerItem<T> {
  readonly label: string;
  readonly value: T;
}
interface LabeledSelectProps<T> {
  readonly label: string;
  readonly options: PickerItem<T>[];
  readonly onSelect: (item: T) => void;
  readonly value?: T;
  readonly placeholder?: PickerItem<T>;
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
}

const LabeledSelect = ({
  label,
  value,
  placeholder,
  options,
  style,
  onSelect,
  labelStyle,
}: LabeledSelectProps<any>) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <RNPickerSelect
        onValueChange={onSelect}
        items={options}
        value={value}
        placeholder={placeholder}
        style={{
          viewContainer: styles.picker,
        }}
      />
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
  picker: {
    ...commonStyles.input,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

// const pickerStyle={
//       chevron: ViewStyle;
//     chevronActive?: ViewStyle;
//     chevronContainer?: ViewStyle;
//     chevronDown?: ViewStyle;
//     chevronUp?: ViewStyle;
//     done?: TextStyle;
//     doneDepressed?: TextStyle;
//     headlessAndroidContainer?: ViewStyle;
//     headlessAndroidPicker?: ViewStyle;
//     iconContainer?: ViewStyle;
//     inputAndroid?: TextStyle;
//     inputAndroidContainer?: ViewStyle;
//     inputIOS?: TextStyle;
//     inputIOSContainer?: ViewStyle;
//     inputWeb?: TextStyle;
//     modalViewBottom?: ViewStyle;
//     modalViewMiddle?: ViewStyle;
//     modalViewTop?: ViewStyle;
//     placeholder?: TextStyle;
//     viewContainer?: ViewStyle;
// }
