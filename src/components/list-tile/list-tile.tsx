import * as React from 'react';

import { Colors, Spacing, commonStyles, textStyles } from '../../styles';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Icon } from '../index';
import { Icons } from '../../../assets';

interface ListTileProps {
  readonly label: string;
  readonly icon?: ImageSourcePropType;
  readonly onPress?: () => void;
  readonly style?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
}

const ListTile = ({
  label,
  icon,
  onPress,
  style,
  labelStyle,
}: ListTileProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {icon ? (
        <View style={styles.iconWrapper}>
          <Image source={icon} />
        </View>
      ) : null}
      <Text style={[textStyles.section, labelStyle]}>{label}</Text>
      <Icon icon={Icons.chevronRight} />
    </TouchableOpacity>
  );
};

export { ListTile };

const styles = StyleSheet.create({
  container: {
    ...commonStyles.row,
    height: 80,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingHorizontal: Spacing.large,
  },
  iconWrapper: { height: 24, width: 24 },
});
