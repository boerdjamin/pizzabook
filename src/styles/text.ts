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
  button: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
