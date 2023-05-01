import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { appTexts } from '../../data/texts';
import { Ingridient } from '../../models/ingridient';
import { Spacing } from '../../styles';
import commonStyles from '../../styles/common';
import { doNothing } from '../../utils/placeholder';
import { CreatePizzaForm, getOptions } from './create-pizza-utils';
import { LabeledTextInput, LabeledSelector, BigButton } from '../../components';

interface CreatePizzaComponentProps {
  readonly ingridients: Ingridient[];
}

const CreatePizzaComponent = ({ ingridients }: CreatePizzaComponentProps) => {
  const [form, setForm] = useState<CreatePizzaForm>({
    name: '',
    base: [],
    toppings: [],
    cheese: [],
    sauces: [],
    spices: [],
    comment: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      form.name.length > 0 && form.base.length > 0 && form.toppings.length > 0;
    setIsFormValid(isValid);
  }, [form]);

  const { name, base, toppings, cheese, sauces, spices, comment } = form;
  const options = getOptions(ingridients);

  const onTypeName = (value: string) =>
    setForm(prevState => ({ ...prevState, name: value }));
  const onTypeComment = (value: string) =>
    setForm(prevState => ({ ...prevState, comment: value }));
  const onSelectBase = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, base: selection }));
  const onSelectToppings = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, toppings: selection }));
  const onSelectCheese = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, cheese: selection }));
  const onSelectSauces = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, sauces: selection }));
  const onSelectSpices = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, spices: selection }));

  return (
    <View style={commonStyles.screen}>
      <ScrollView>
        <LabeledTextInput
          label={appTexts.create_pizza_name_label}
          value={name}
          onType={onTypeName}
          style={styles.marginBottom}
        />
        <LabeledSelector
          label={appTexts.create_pizza_base_label}
          selectedItems={base}
          onSelect={onSelectBase}
          options={options.bases}
          placeholder={appTexts.create_pizza_base_placeholder}
          style={styles.marginBottom}
          mode={'single'}
        />
        <LabeledSelector
          label={appTexts.create_pizza_toppings_label}
          selectedItems={toppings}
          onSelect={onSelectToppings}
          options={options.toppings}
          placeholder={
            toppings.length === 0
              ? appTexts.create_pizza_toppings_placeholder
              : ''
          }
          style={styles.marginBottom}
        />
        <LabeledSelector
          label={appTexts.create_pizza_cheese_label}
          selectedItems={cheese}
          onSelect={onSelectCheese}
          options={options.cheese}
          placeholder={
            cheese.length === 0 ? appTexts.create_pizza_cheese_placeholder : ''
          }
          style={styles.marginBottom}
        />
        <LabeledSelector
          label={appTexts.create_pizza_sauce_label}
          selectedItems={sauces}
          onSelect={onSelectSauces}
          options={options.sauces}
          placeholder={
            sauces.length === 0 ? appTexts.create_pizza_sauce_placeholder : ''
          }
          style={styles.marginBottom}
        />
        <LabeledSelector
          label={appTexts.create_pizza_spices_label}
          selectedItems={spices}
          onSelect={onSelectSpices}
          options={options.spices}
          placeholder={
            spices.length === 0 ? appTexts.create_pizza_spices_placeholder : ''
          }
          style={styles.marginBottom}
        />
        <LabeledTextInput
          label={appTexts.create_pizza_comment_label}
          value={comment}
          onType={onTypeComment}
          style={styles.marginBottom}
          numberOfLines={3}
        />
        <BigButton
          label={appTexts.create_pizza_submit_button}
          onPress={doNothing}
          style={styles.button}
          disabled={isFormValid}
        />
      </ScrollView>
    </View>
  );
};

export default CreatePizzaComponent;

const styles = StyleSheet.create({
  container: { ...commonStyles.screen },
  marginBottom: { marginBottom: Spacing.small },
  button: { width: '100%', marginTop: Spacing.large },
});
