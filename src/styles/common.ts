import { Colors } from './colors';
import { StyleSheet } from 'react-native';
import { Spacing } from './spacing';
import { BorderRadius } from './border-radius';

export const INPUT_HEIGHT = 32;

const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.large,
  },
  icon: { height: 24, width: 24 },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: BorderRadius.small,
    height: INPUT_HEIGHT,
    alignItems: 'center',
    padding: Spacing.smaller,
  },
});

export default commonStyles;
