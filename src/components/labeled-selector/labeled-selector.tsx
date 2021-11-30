import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Modal,
} from 'react-native';
import { BorderRadius, Spacing, textStyles } from '../../styles';
import { INPUT_HEIGHT } from '../../styles/common';
import { Colors } from '../../styles/colors';
import { appTexts } from '../../data/texts';
import BigButton from '../big-button/big-button';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface SelectItem<T> {
  readonly name: string;
  readonly id: T;
}

export interface LabeledSelectorProps<T> {
  readonly label: string;
  readonly options: SelectItem<T>[];
  readonly onSelect: (item: T[]) => void;
  readonly selectedItems: T[];
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
}: // mode,
LabeledSelectorProps<any>) => {
  const [isSelectorOpen, setSelectorOpen] = useState(false);
  const [selected, setSelected] = useState(selectedItems);
  // const isSingleMode = mode === 'single';

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
      <View>
        {/* show selections as tags */}
        {selectedItems.map(item => (
          <TouchableOpacity>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isSelectorOpen ? (
        // TODO: style everything
        <Modal style={styles.modal}>
          <View>
            {options.map(option => (
              <TouchableOpacity
                onPress={() => select(option)}
                disabled={selected.includes(option)}>
                <Text>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            {selected.map(item => (
              <TouchableOpacity onPress={() => unSelect(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonRow}>
            <BigButton label={appTexts.cancel} onPress={closeModal} />
            <BigButton
              label={appTexts.create_pizza_submit_button}
              onPress={onSubmit}
            />
          </View>
        </Modal>
      ) : null}
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
    margin: Spacing.large,
    padding: Spacing.large,
  },
  tag: { backgroundColor: Colors.primary },
  textColor: { color: Colors.text },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
