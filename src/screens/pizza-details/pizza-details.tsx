import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Pizza } from '../../models/pizza';

interface PizzaDetailsScreenProps {
  readonly pizza: Pizza;
}

const PizzaDetailsScreen: React.FC<PizzaDetailsScreenProps> = ({ pizza }) => {
  return (
    <View style={styles.container}>
      <Text>{pizza.name}</Text>
    </View>
  );
};

export default PizzaDetailsScreen;

const styles = StyleSheet.create({
  container: {},
});
