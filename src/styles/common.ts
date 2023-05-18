import { Colors } from './colors';
import { Spacing } from './spacing';
import { StyleSheet } from 'react-native';
import { textStyles } from './text';

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
  headerLabel: {
    ...textStyles.h3,
    color: Colors.secondary,
    marginHorizontal: Spacing.medium,
  },
});

export { commonStyles };
