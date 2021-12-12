import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import GIFS from '../../../assets/gifs';
import Loader from '../../components/loader';
import PizzaPreview from '../../components/pizza-preview/pizza-preview';
import { appTexts } from '../../data/texts';
import { PizzaBookState } from '../../models/app-state';
import { Pizza } from '../../models/pizza';
import { User } from '../../models/user';
import {
  HomeStackParamList,
  HomeStackRoutes,
} from '../../navigation/home-stack';
import { textStyles } from '../../styles';
import commonStyles from '../../styles/common';
import { Spacing } from '../../styles/spacing';

interface HomeScreenProps {
  readonly allPizzas: Pizza[];
  readonly currentUser?: User;
}

type NavigationProp = StackNavigationProp<
  HomeStackParamList,
  HomeStackRoutes.Home
>;

const HomeScreenComponent: React.FC<HomeScreenProps> = ({ allPizzas }) => {
  const { navigate, setOptions } = useNavigation<NavigationProp>();

  const isLoading = useSelector(
    (state: PizzaBookState) => state.network.isLoading,
  );

  React.useLayoutEffect(
    () =>
      setOptions({
        title: appTexts.home,
        headerStyle: { borderWidth: 1 },
      }),
    [setOptions],
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
          allPizzas.map((pizza, i) => (
            <PizzaPreview key={i} pizza={pizza} onSelect={onSelectPizza} />
          ))
        ) : (
          <Text>{'Sorry, nothing to see here :('}</Text>
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
    marginBottom: Spacing.huge,
  },
  list: {
    flex: 1,
    paddingVertical: Spacing.small,
  },
});
