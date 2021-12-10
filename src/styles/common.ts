import { Colors } from './colors';
import { StyleSheet } from 'react-native';
import { Spacing } from '.';

const commonStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.white, padding: Spacing.medium },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { height: 24, width: 24 },
});

export default commonStyles;
