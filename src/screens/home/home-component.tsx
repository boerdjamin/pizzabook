import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PizzaPreview from '../../components/pizza-preview/pizza-preview';
import { appTexts } from '../../data/texts';
import { Pizza } from '../../models/pizza';
import { RootStackParamList, Routes } from '../../navigation/root-navigation';
import { textStyles } from '../../styles';
import { Spacing } from '../../styles/spacing';

interface HomeScreenProps {
  readonly allPizzas: Pizza[];
}

type NavigationProp = StackNavigationProp<RootStackParamList, Routes.Home>;

const HomeScreenComponent: React.FC<HomeScreenProps> = ({ allPizzas }) => {
  const { navigate, setOptions } = useNavigation<NavigationProp>();

  React.useLayoutEffect(
    () =>
      setOptions({
        title: 'Home',
        headerStyle: { borderWidth: 1 },
      }),
    [setOptions],
  );

  const onSelectPizza = (pizza: Pizza) => navigate(Routes.Details, { pizza });

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{appTexts.welcome}</Text>
      <Text style={styles.info}>{appTexts.info}</Text>
      <ScrollView style={styles.list}>
        {allPizzas.map((pizza, i) => (
          <PizzaPreview key={i} pizza={pizza} onSelect={onSelectPizza} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreenComponent;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, padding: Spacing.large },
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
