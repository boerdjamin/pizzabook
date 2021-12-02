import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Modal,
  Image,
} from 'react-native';
import { BorderRadius, Spacing, textStyles } from '../../styles';
import { Colors } from '../../styles/colors';
import { appTexts } from '../../data/texts';
import BigButton from '../big-button/big-button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import commonStyles from '../../styles/common';
import Icons from '../../../assets/icons';

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
          <TouchableOpacity key={item.id} style={styles.tag}>
            <Text style={styles.tagText}>{item.name}</Text>
            <Image source={Icons.close} style={styles.closeIcon} />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSelectorOpen}
        onRequestClose={() => {
          console.log('request close');
        }}
        style={styles.modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              {options.map(option => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => select(option)}
                  disabled={
                    (isSingleMode && selected.length > 0) ||
                    selected.includes(option)
                  }>
                  <Text>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View>
              {selected.map(item => (
                <TouchableOpacity key={item.id} onPress={() => unSelect(item)}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
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

export default LabeledSelector;

const styles = StyleSheet.create({
  label: {
    ...textStyles.label,
    marginBottom: Spacing.smaller,
  },
  modal: {
    ...commonStyles.screen,
    margin: Spacing.large,
    padding: Spacing.large,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selections: {
    ...commonStyles.row,
    marginTop: Spacing.small,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  tag: {
    ...commonStyles.row,
    backgroundColor: Colors.primary,
    padding: Spacing.small,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.tiny,
    borderRadius: BorderRadius.large,
  },
  tagText: { ...textStyles.label, color: Colors.white },
  closeIcon: {
    height: 8,
    width: 8,
    tintColor: Colors.white,
    marginLeft: Spacing.small,
  },
  textColor: { color: Colors.text },
});
