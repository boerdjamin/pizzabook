import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LabeledSelect from '../../components/labeled-select/labeled-select';
import LabeledTextInput from '../../components/labeled-text-input/labeled-text-input';
import { appTexts } from '../../data/texts';
import { Ingridient } from '../../models/ingridient';
import { Spacing } from '../../styles';
import commonStyles from '../../styles/common';
import {
  filterBases,
  filterCheese,
  filterSauces,
  filterSpices,
  filterToppings,
} from '../../utils/food-types';

interface CreatePizzaComponentProps {
  readonly ingridients: Ingridient[];
}

const CreatePizzaComponent = ({ ingridients }: CreatePizzaComponentProps) => {
  const [pizzaName, setPizzaName] = useState('');
  const [pizzaBase, setPizzaBase] = useState<Ingridient[]>([]);
  const [toppings, setToppings] = useState<Ingridient[]>([]);
  const [cheese, setCheese] = useState<Ingridient[]>([]);
  const [sauces, setSauces] = useState<Ingridient[]>([]);
  const [spices, setSpices] = useState<Ingridient[]>([]);
  const [comment, setComment] = useState('');

  const baseOptions = filterBases(ingridients);
  const toppingOptions = filterToppings(ingridients);
  const cheeseOptions = filterCheese(ingridients);
  const sauceOptions = filterSauces(ingridients);
  const spiceOptions = filterSpices(ingridients);

  const onSelectBase = (selection: Ingridient[]) => setPizzaBase(selection);
  const onChangeToppings = (selection: Ingridient[]) => setToppings(selection);
  const onChangeCheese = (selection: Ingridient[]) => setCheese(selection);
  const onChangeSauces = (selection: Ingridient[]) => setSauces(selection);
  const onChangeSpices = (selection: Ingridient[]) => setSpices(selection);

  return (
    <View style={styles.container}>
      <LabeledTextInput
        label={appTexts.create_pizza_name_label}
        value={pizzaName}
        onType={setPizzaName}
        style={styles.marginBottom}
      />
      <LabeledSelect
        label={appTexts.create_pizza_base_label}
        selectedItems={pizzaBase}
        onSelect={onSelectBase}
        options={baseOptions}
        placeholder={appTexts.create_pizza_base_placeholder}
        style={styles.marginBottom}
        mode={'single'}
      />
      <LabeledSelect
        label={appTexts.create_pizza_toppings_label}
        selectedItems={toppings}
        onSelect={onChangeToppings}
        options={toppingOptions}
        placeholder={
          toppings.length === 0
            ? appTexts.create_pizza_toppings_placeholder
            : ''
        }
        style={styles.marginBottom}
      />
      <LabeledSelect
        label={appTexts.create_pizza_cheese_label}
        selectedItems={cheese}
        onSelect={onChangeCheese}
        options={cheeseOptions}
        placeholder={
          cheese.length === 0 ? appTexts.create_pizza_cheese_placeholder : ''
        }
        style={styles.marginBottom}
      />
      <LabeledSelect
        label={appTexts.create_pizza_sauce_label}
        selectedItems={sauces}
        onSelect={onChangeSauces}
        options={sauceOptions}
        placeholder={
          sauces.length === 0 ? appTexts.create_pizza_sauce_placeholder : ''
        }
        style={styles.marginBottom}
      />
      <LabeledSelect
        label={appTexts.create_pizza_spices_label}
        selectedItems={spices}
        onSelect={onChangeSpices}
        options={spiceOptions}
        placeholder={
          spices.length === 0 ? appTexts.create_pizza_spices_placeholder : ''
        }
        style={styles.marginBottom}
      />
      <LabeledTextInput
        label={appTexts.create_pizza_comment_label}
        value={comment}
        onType={setComment}
        style={styles.marginBottom}
        numberOfLines={3}
      />
    </View>
  );
};

export default CreatePizzaComponent;

const styles = StyleSheet.create({
  container: { ...commonStyles.screen },
  marginBottom: { marginBottom: Spacing.small },
});
