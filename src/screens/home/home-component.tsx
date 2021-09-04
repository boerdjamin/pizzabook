import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PizzaPreview from '../../components/pizza-preview/pizza-preview';
import { Pizza } from '../../models/pizza';
import { textStyles } from '../../styles';
import { Spacing } from '../../styles/spacing';

interface HomeScreenProps {
  readonly allPizzas: Pizza[];
}

const HomeScreenComponent: React.FC<HomeScreenProps> = ({ allPizzas }) => {
  const onSelectPizza = (pizza: Pizza) => {
    console.log('selected', pizza);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{'Wilkommen im PizzaBook!'}</Text>
      <Text style={styles.info}>
        {'Hier findest du Benjamin und Birtes Lieblingspizzen :)'}
      </Text>
      <ScrollView style={styles.list}>
        {allPizzas.map((pizza, i) => (
          <PizzaPreview key={i} pizza={pizza} onSelect={onSelectPizza} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreenComponent;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, padding: Spacing.large },
  headline: {
    ...textStyles.headline,
    marginBottom: Spacing.large,
  },
  info: {
    ...textStyles.p1,
    marginBottom: Spacing.huge,
  },
  list: {
    flex: 1,
    paddingVertical: Spacing.small,
  },
});
