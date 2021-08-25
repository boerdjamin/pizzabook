import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PizzaPreview from '../../components/pizza-preview/pizza-preview';
import { Pizza } from '../../models/pizza';

interface HomeScreenProps {
  readonly allPizzas: Pizza[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ allPizzas }) => {
  return (
    <View style={styles.container}>
      <Text>Hello Pizza World</Text>
      {allPizzas.map(pizza => (
        <PizzaPreview pizza={pizza} />
      ))}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
