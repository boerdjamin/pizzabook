import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Pizza } from '../../models/pizza';

interface PizzaPreviewProps {
  readonly pizza: Pizza;
}

const PizzaPreview: React.FC<PizzaPreviewProps> = ({ pizza }) => {
  return (
    <View style={styles.container}>
      <Text>{pizza.name}</Text>
      {pizza.photo ? <Image source={pizza.photo} /> : null}
      <Text>
        {pizza.isVegan
          ? 'vegan'
          : pizza.canBeVeganized
          ? 'vegan möglich'
          : 'vegetarisch'}
      </Text>
    </View>
  );
};

export default PizzaPreview;

const styles = StyleSheet.create({
  container: {},
});
