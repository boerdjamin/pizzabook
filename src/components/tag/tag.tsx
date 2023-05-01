import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icons from '../../../assets/icons';
import { BorderRadius, Colors, Spacing, textStyles } from '../../styles';
import commonStyles from '../../styles/common';

interface TagProps {
  readonly label: string;
  readonly onRemove?: () => void;
  readonly style?: StyleProp<ViewStyle>;
}

const Tag = ({ label, onRemove, style }: TagProps) => {
  return (
    <TouchableOpacity style={[styles.tag, style]} onPress={onRemove}>
      <Text style={styles.tagText}>{label}</Text>
      <Image source={Icons.close} style={styles.closeIcon} />
    </TouchableOpacity>
  );
};

export { Tag };

const styles = StyleSheet.create({
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
});
