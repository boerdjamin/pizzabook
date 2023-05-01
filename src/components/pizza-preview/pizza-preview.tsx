import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
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
      {photo ? (
        <View style={styles.imageContainer}>
          <Image source={photo} style={styles.image} />
        </View>
      ) : null}
      <Text style={styles.ingridientsList}>
        {toppings.map(
          (topping, i) =>
            `${topping.name + (i === toppings.length - 1 ? '' : ', ')}`,
        )}
      </Text>
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
    backgroundColor: `${Colors.lightGrey}${Colors.transparency32}`,
    borderRadius: BorderRadius.medium,
    padding: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  title: {
    ...textStyles.headline,
    marginBottom: Spacing.small,
  },
  imageContainer: {
    marginVertical: Spacing.small,
    width: '100%',
  },
  image: {
    height: 250,
    width: '100%',
  },
  ingridientsList: {
    ...textStyles.p1,
    marginBottom: Spacing.smaller,
  },
  veganMarker: {
    color: Colors.success,
  },
});
