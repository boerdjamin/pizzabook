import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BigButton from '../../components/big-button/big-button';
import { appTexts } from '../../data/texts';
import {
  CreationStackParamList,
  CreationStackRoutes,
} from '../../navigation/creation-stack';
import { Colors, Spacing, textStyles } from '../../styles';
import commonStyles from '../../styles/common';

interface SelectionComponentProps {}

type NavigationProp = StackNavigationProp<
  CreationStackParamList,
  CreationStackRoutes.Selection
>;

const SelectionComponent: React.FC<SelectionComponentProps> = () => {
  const { navigate } = useNavigation<NavigationProp>();

  const onSelectPizzaCreation = () => navigate(CreationStackRoutes.Pizza);
  const onSelectIngridientCreation = () =>
    navigate(CreationStackRoutes.Ingridient);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appTexts.selection_screen_title}</Text>
      <View style={styles.options}>
        <BigButton
          label={appTexts.selection_screen_pizza}
          onPress={onSelectPizzaCreation}
          style={[styles.button, styles.pizzaButton]}
        />
        <BigButton
          label={appTexts.selection_screen_ingridient}
          onPress={onSelectIngridientCreation}
          style={[styles.button, styles.ingridientButton]}
        />
      </View>
    </View>
  );
};

export default SelectionComponent;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.screen,
    paddingVertical: Spacing.huge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...textStyles.headline,
    marginBottom: Spacing.huger,
  },
  options: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
  },
  ingridientButton: {
    backgroundColor: Colors.success,
  },
  pizzaButton: {
    backgroundColor: Colors.primary,
    marginBottom: Spacing.medium,
  },
});
