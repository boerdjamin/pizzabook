import * as React from 'react';

import { HomeStackParamList, HomeStackRoutes } from '../../navigation';
import { Loader, PizzaPreview } from '../../components';
import { Pizza, PizzaBookState, User } from '../../models';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Spacing, commonStyles, textStyles } from '../../styles';

import { GIFS } from '../../../assets';
import { StackNavigationProp } from '@react-navigation/stack';
import { appTexts } from '../../data';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

interface HomeScreenProps {
  readonly allPizzas: Pizza[];
  readonly currentUser?: User;
}

type NavigationProp = StackNavigationProp<
  HomeStackParamList,
  HomeStackRoutes.Home
>;

const HomeScreenComponent: React.FC<HomeScreenProps> = ({ allPizzas }) => {
  const { navigate } = useNavigation<NavigationProp>();

  const isLoading = useSelector(
    (state: PizzaBookState) => state.network.isLoading,
  );

  const onSelectPizza = (pizza: Pizza) =>
    navigate(HomeStackRoutes.Details, { pizza });

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{appTexts.welcome}</Text>
      <Text style={styles.info}>{appTexts.info}</Text>
      <ScrollView style={styles.list}>
        {isLoading ? (
          <Loader image={GIFS.loadingGif} />
        ) : allPizzas && allPizzas.length ? (
          allPizzas
            // we want pizzas with photos first
            .sort(p1 => (p1.photo ? -1 : 1))
            .map((pizza, i) => (
              <PizzaPreview key={i} pizza={pizza} onSelect={onSelectPizza} />
            ))
        ) : (
          <Text>{appTexts.no_data}</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreenComponent;

const styles = StyleSheet.create({
  container: { ...commonStyles.screen },
  headline: {
    ...textStyles.headline,
    marginBottom: Spacing.large,
  },
  info: {
    ...textStyles.p1,
    marginBottom: Spacing.large,
  },
  list: {
    flex: 1,
    paddingVertical: Spacing.small,
  },
});
