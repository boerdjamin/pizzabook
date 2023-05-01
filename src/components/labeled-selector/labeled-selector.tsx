import { BigButton, Tag } from '../index';
import { BorderRadius, Colors, Spacing, textStyles } from '../../styles';
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { appTexts } from '../../data/texts';
import commonStyles from '../../styles/common';

export interface SelectItem<T> {
  readonly name: string;
  readonly id: T;
}

export interface LabeledSelectorProps<T> {
  readonly label: string;
  readonly options: SelectItem<T>[];
  readonly onSelect: (item: T[]) => void;
  readonly selectedItems: SelectItem<any>[];
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
  readonly placeholder?: string;
  readonly mode?: 'single' | 'multi';
}

const LabeledSelector = ({
  label,
  selectedItems,
  options,
  style,
  onSelect,
  labelStyle,
  mode,
}: LabeledSelectorProps<any>) => {
  const [isSelectorOpen, setSelectorOpen] = useState(false);
  const [selected, setSelected] = useState(selectedItems);
  const isSingleMode = mode === 'single';

  const openSelector = () => setSelectorOpen(true);

  const select = (option: SelectItem<any>) => {
    !selectedItems.includes(option) && setSelected(items => [...items, option]);
  };
  const unSelect = (option: SelectItem<any>) =>
    setSelected(items => items.filter(i => i !== option));

  const closeModal = () => setSelectorOpen(false);

  const onSubmit = () => {
    onSelect(selected);
    closeModal();
  };

  return (
    <View style={style}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <BigButton label={label} onPress={openSelector} />
      <View style={styles.selections}>
        {selectedItems.map(item => (
          <Tag
            key={item.id}
            label={item.name}
            onRemove={() => unSelect(item)}
          />
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSelectorOpen}
        onRequestClose={() => {
          console.log('request close');
        }}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput style={styles.searchbar} />
            <View>
              {options.map(option => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => select(option)}
                  disabled={
                    (isSingleMode && selected.length > 0) ||
                    selected.includes(option)
                  }
                  style={styles.option}>
                  <Text style={textStyles.p1}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.selections}>
              {selected.map(item => (
                <Tag
                  key={item.id}
                  label={item.name}
                  onRemove={() => unSelect(item)}
                />
              ))}
            </View>
            <View style={commonStyles.row}>
              <BigButton label={appTexts.cancel} onPress={closeModal} />
              <BigButton
                label={appTexts.create_pizza_submit_button}
                onPress={onSubmit}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export { LabeledSelector };

const styles = StyleSheet.create({
  label: {
    ...textStyles.h3,
    marginBottom: Spacing.smaller,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.medium,
    borderTopRightRadius: BorderRadius.medium,
    padding: Spacing.large,
    paddingBottom: Spacing.larger,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchbar: {
    ...commonStyles.input,
    marginBottom: Spacing.small,
    width: '80%',
  },
  option: {
    padding: Spacing.tiny,
  },
  selections: {
    ...commonStyles.row,
    marginTop: Spacing.small,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  textColor: { color: Colors.text },
});
