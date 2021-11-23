import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { appTexts } from '../../data/texts';
import { Ingridient } from '../../models/ingridient';
import { Pizza } from '../../models/pizza';
import { RootRoutes, RootStackParamList } from '../../navigation/routes';
import { Colors, Spacing, textStyles } from '../../styles';

interface PizzaDetailsScreenComponentProps {
  readonly pizza: Pizza;
  readonly toppings: Ingridient[];
}

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  RootRoutes.Details
>;

const PizzaDetailsScreenComponent: React.FC<PizzaDetailsScreenComponentProps> =
  ({ pizza, toppings }) => {
    const { setOptions } = useNavigation<NavigationProp>();
    const { name, photo, isVegan, canBeVeganized } = pizza;

    useLayoutEffect(
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

export default PizzaDetailsScreenComponent;

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