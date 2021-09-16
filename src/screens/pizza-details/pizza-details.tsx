import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { appTexts } from '../../data/texts';
import { Pizza } from '../../models/pizza';
import { RootStackParamList, Routes } from '../../navigation/root-navigation';
import { Colors, Spacing, textStyles } from '../../styles';

interface PizzaDetailsScreenProps {
  readonly pizza: Pizza;
}

type PizzaDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  Routes.Details
>;

type NavigationProp = StackNavigationProp<RootStackParamList, Routes.Details>;

const PizzaDetailsScreen: React.FC<PizzaDetailsScreenProps> = () => {
  const { setOptions } = useNavigation<NavigationProp>();
  const route = useRoute<PizzaDetailsScreenRouteProp>();
  const { name, toppings, photo, isVegan, canBeVeganized } = route.params.pizza;

  React.useLayoutEffect(
    () =>
      setOptions({
        title: name,
        headerStyle: { borderWidth: 1 },
      }),
    [name, setOptions],
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.ingridientsList}>
        {toppings.map(
          (topping, i) =>
            `${topping.name + (i === toppings.length - 1 ? '' : ', ')}`,
        )}
      </Text>
      {photo ? <Image source={photo} /> : null}
      <Text style={styles.veganMarker}>
        {isVegan
          ? appTexts.vegan
          : canBeVeganized
          ? appTexts.veganPossible
          : appTexts.vegetarian}
      </Text>
    </View>
  );
};

export default PizzaDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '80%',
    height: 250,
    borderWidth: 1,
    margin: Spacing.medium,
  },
  title: {},
  ingridientsList: {
    ...textStyles.p1,
    marginBottom: Spacing.smaller,
  },
  veganMarker: {
    color: Colors.success,
  },
});
