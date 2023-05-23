import { BorderRadius, Colors, Spacing, textStyles } from '../../styles';
import { HomeStackParamList, HomeStackRoutes } from '../../navigation';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ingridient, Pizza, Recipe } from '../../models';
import React, { useLayoutEffect } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { appTexts } from '../../data/texts';
import { useNavigation } from '@react-navigation/native';

interface PizzaDetailsScreenComponentProps {
  readonly pizza: Pizza;
  readonly toppings: (Ingridient | Recipe)[];
}

type NavigationProp = StackNavigationProp<
  HomeStackParamList,
  HomeStackRoutes.Details
>;

const PizzaDetailsScreenComponent: React.FC<PizzaDetailsScreenComponentProps> =
  ({ pizza, toppings }) => {
    const { setOptions } = useNavigation<NavigationProp>();
    const { name, photo, isVegan, canBeVeganized } = pizza;

    useLayoutEffect(() => setOptions({ title: name }), [name, setOptions]);

    return (
      <View style={styles.container}>
        <Text style={styles.ingridientsList}>
          {toppings.map(
            (topping, i) =>
              `${topping.name + (i === toppings.length - 1 ? '' : ', ')}`,
          )}
        </Text>
        {photo ? (
          <View style={styles.imageContainer}>
            <Image source={photo} style={styles.image} />
          </View>
        ) : null}
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

export default PizzaDetailsScreenComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.medium,
  },
  imageContainer: {
    width: '80%',
    height: 250,
    borderWidth: 1,
    borderRadius: BorderRadius.small,
    margin: Spacing.medium,
  },
  image: {
    height: '100%',
    width: '100%',
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
