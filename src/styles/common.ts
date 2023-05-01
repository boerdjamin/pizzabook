import { BorderRadius } from './border-radius';
import { Colors } from './colors';
import { Spacing } from './spacing';
import { StyleSheet } from 'react-native';

export const INPUT_HEIGHT = 32;

const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.large,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: BorderRadius.small,
    height: INPUT_HEIGHT,
    alignItems: 'center',
    padding: Spacing.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default commonStyles;
