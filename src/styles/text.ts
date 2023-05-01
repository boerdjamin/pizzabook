import { Colors } from './colors';
import { StyleSheet } from 'react-native';

export const textStyles = StyleSheet.create({
  headline: {
    fontWeight: 'bold',
    fontSize: 28,
    color: Colors.text,
  },
  section: {
    fontSize: 20,
    color: Colors.text,
  },
  p1: {
    fontSize: 16,
    color: Colors.text,
  },
  h3: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    /* identical to box height, or 138% */
    letterSpacing: -0.408,
    color: Colors.text,
  },
  button: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
