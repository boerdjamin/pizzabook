import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { BorderRadius, Spacing, textStyles } from '../../styles';
import { INPUT_HEIGHT } from '../../styles/common';
import { Colors } from '../../styles/colors';
import { renderNothing } from '../../utils/placeholder';
import { appTexts } from '../../data/texts';

export interface SelectItem<T> {
  readonly name: string;
  readonly id: T;
}

interface LabeledSelectProps<T> {
  readonly label: string;
  readonly options: SelectItem<T>[];
  readonly onSelect: (item: T[]) => void;
  readonly selectedItems: T[];
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
  readonly placeholder?: string;
  readonly mode?: 'single' | 'multi';
}

const LabeledSelect = ({
  label,
  selectedItems,
  options,
  placeholder,
  style,
  onSelect,
  labelStyle,
  mode,
}: LabeledSelectProps<any>) => {
  const isSingleMode = mode === 'single';

  return (
    <View style={style}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <MultiSelect
        single={isSingleMode}
        items={options}
        uniqueKey={'id'}
        onSelectedItemsChange={onSelect}
        selectedItems={selectedItems}
        selectText={placeholder}
        submitButtonText={appTexts.select_submit_button}
        searchInputPlaceholderText={appTexts.select_search_placeholder}
        selectedItemTextColor={Colors.success}
        selectedItemIconColor={Colors.success}
        itemTextColor={Colors.text}
        submitButtonColor={Colors.primary}
        searchIcon={renderNothing}
        tagRemoveIconColor={Colors.white}
        tagBorderColor={Colors.primary}
        tagTextColor={Colors.white}
        styleMainWrapper={styles.select}
        searchInputStyle={styles.inputHeight}
        styleTextDropdown={styles.placeholder}
        styleTextDropdownSelected={styles.textColor}
        tagContainerStyle={styles.tag}
        styleDropdownMenuSubsection={styles.noBorder}
        styleItemsContainer={styles.itemsContainer}
        styleRowList={styles.inputHeight}
        textInputProps={{ autoFocus: false }}
      />
    </View>
  );
};

export default LabeledSelect;

const ITEMS_CONTAINER_HEIGHT = 200;

const styles = StyleSheet.create({
  label: {
    ...textStyles.label,
    marginBottom: Spacing.small,
  },
  select: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: BorderRadius.small,
    padding: Spacing.small,
    paddingBottom: 0,
  },
  placeholder: { color: Colors.lightGrey },
  noBorder: { borderBottomWidth: 0 },
  inputHeight: { height: INPUT_HEIGHT },
  itemsContainer: {
    maxHeight: ITEMS_CONTAINER_HEIGHT,
    paddingVertical: Spacing.small,
    backgroundColor: Colors.white,
  },
  tag: { backgroundColor: Colors.primary },
  textColor: { color: Colors.text },
});
