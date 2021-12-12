import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  Image,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Icons from '../../../assets/icons';
import { Colors, Spacing, textStyles } from '../../styles';
import commonStyles from '../../styles/common';
import Icon from '../icon/icon';

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

export default ListTile;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.row,
    justifyContent: 'space-between',
    height: 80,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingHorizontal: Spacing.large,
  },
  iconWrapper: { height: 24, width: 24 },
});
