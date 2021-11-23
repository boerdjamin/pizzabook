import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { appTexts } from '../../data/texts';
import { PizzaBookState } from '../../models/app-state';
import { Ingridient } from '../../models/ingridient';
import { Pizza } from '../../models/pizza';
import { BorderRadius, Colors, Spacing, textStyles } from '../../styles';

interface PizzaPreviewProps {
  readonly pizza: Pizza;
  readonly onSelect: (p: Pizza) => void;
}

const PizzaPreview: React.FC<PizzaPreviewProps> = ({ pizza, onSelect }) => {
  const [toppings, setToppings] = useState<Ingridient[]>([]);
  const allIngridients = useSelector(
    (state: PizzaBookState) => state.pizzas.allIngridients,
  );

  useEffect(() => {
    pizza.toppingIds.forEach(id => {
      const ingridient = allIngridients.find(ing => ing.id === id);
      if (ingridient) {
        setToppings([...toppings, ingridient]);
      }
    });
  }, [pizza.toppingIds, allIngridients, toppings]);

  const onPress = () => onSelect(pizza);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{pizza.name}</Text>
      <Text style={styles.ingridientsList}>
        {toppings.map(
          (topping, i) =>
            `${topping.name + (i === toppings.length - 1 ? '' : ', ')}`,
        )}
      </Text>
      {pizza.photo ? <Image source={pizza.photo} /> : null}
      <Text style={styles.veganMarker}>
        {pizza.isVegan
          ? appTexts.vegan
          : pizza.canBeVeganized
          ? appTexts.veganPossible
          : appTexts.vegetarian}
      </Text>
    </TouchableOpacity>
  );
};

export default PizzaPreview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.milky,
    borderRadius: BorderRadius.medium,
    padding: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  title: {
    ...textStyles.headline,
    marginBottom: Spacing.small,
  },
  ingridientsList: {
    ...textStyles.p1,
    marginBottom: Spacing.smaller,
  },
  veganMarker: {
    color: Colors.success,
  },
});
