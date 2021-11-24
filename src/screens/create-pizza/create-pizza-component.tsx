import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ingridient } from '../../models/ingridient';

interface CreatePizzaComponentProps {
  readonly ingridients: Ingridient[];
}

const CreatePizzaComponent = ({ ingridients }: CreatePizzaComponentProps) => {
  return (
    <View style={styles.container}>
      <Text>
        {ingridients.map(
          (ing, i) => `${ing.name}${i < ingridients.length - 1 && ','}`,
        )}
      </Text>
    </View>
  );
};

export default CreatePizzaComponent;

const styles = StyleSheet.create({
  container: {},
});
