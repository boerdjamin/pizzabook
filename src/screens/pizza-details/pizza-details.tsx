import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Pizza } from '../../models/pizza';
import { RootStackParamList, Routes } from '../../navigation/root-navigation';
import { Colors } from '../../styles';

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
  const {
    params: { pizza },
  } = useRoute<PizzaDetailsScreenRouteProp>();

  React.useLayoutEffect(
    () =>
      setOptions({
        title: pizza.name,
        headerStyle: { borderWidth: 1 },
      }),
    [pizza, setOptions],
  );

  return (
    <View style={styles.container}>
      <Text>{pizza.name}</Text>
    </View>
  );
};

export default PizzaDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
