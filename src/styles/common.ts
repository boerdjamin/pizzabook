import { Colors } from './colors';
import { Spacing } from './spacing';
import { StyleSheet } from 'react-native';

export const INPUT_HEIGHT = 28;

const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.large,
  },
  input: {
    height: INPUT_HEIGHT,
    alignItems: 'center',
    width: 342,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default commonStyles;
