import { Colors } from './colors';
import { StyleSheet } from 'react-native';
import { Spacing } from './spacing';

const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.large,
  },
  icon: { height: 24, width: 24 },
});

export default commonStyles;
