import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { appTexts } from '../../data/texts';
import { Pizza } from '../../models/pizza';
import { BorderRadius, Colors, Spacing, textStyles } from '../../styles';

interface PizzaPreviewProps {
  readonly pizza: Pizza;
  readonly onSelect: (p: Pizza) => void;
}

const PizzaPreview: React.FC<PizzaPreviewProps> = ({ pizza, onSelect }) => {
  const { toppings, photo, canBeVeganized, isVegan, name } = pizza;
  const onPress = () => onSelect(pizza);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
