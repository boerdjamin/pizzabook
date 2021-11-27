import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const textStyles = StyleSheet.create({
  headline: {
    fontWeight: 'bold',
    fontSize: 28,
    color: Colors.text,
  },
  p1: {
    fontSize: 16,
    color: Colors.text,
  },
  label: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: 'bold',
  },
  button: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
