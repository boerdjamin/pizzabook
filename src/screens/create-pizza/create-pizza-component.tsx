import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LabeledSelect from '../../components/labeled-select/labeled-select';
import LabeledTextInput from '../../components/labeled-text-input/labeled-text-input';
import { appTexts } from '../../data/texts';
import { FoodType } from '../../models/food-type';
import { Ingridient } from '../../models/ingridient';
import { Spacing } from '../../styles';
import commonStyles from '../../styles/common';
import { filterBases } from '../../utils/food-types';
import { mapIngridientsToPickerOption } from '../../utils/ingridient-util';

interface CreatePizzaComponentProps {
  readonly ingridients: Ingridient[];
  readonly foodTypes: FoodType[];
}

const CreatePizzaComponent = ({
  ingridients,
}: // foodTypes,
CreatePizzaComponentProps) => {
  const [pizzaName, setPizzaName] = useState('');
  const [pizzaBase, setPizzaBase] = useState<Ingridient | undefined>();
  const [comment, setComment] = useState('');

  const bases = filterBases(ingridients);
  const baseOptions = mapIngridientsToPickerOption(bases);

  const onSelectBase = (base: Ingridient) => setPizzaBase(base);
  return (
    <View style={styles.container}>
      <LabeledTextInput
        label={appTexts.create_pizza_name_label}
        value={pizzaName}
        onType={setPizzaName}
        style={styles.marginBottom}
      />
      <LabeledTextInput
        label={appTexts.create_pizza_comment_label}
        value={comment}
        onType={setComment}
      />
      <LabeledSelect
        label={appTexts.create_pizza_base_label}
        value={pizzaBase}
        onSelect={onSelectBase}
        options={baseOptions}
      />
    </View>
  );
};

export default CreatePizzaComponent;

const styles = StyleSheet.create({
  container: { ...commonStyles.screen },
  marginBottom: { marginBottom: Spacing.medium },
});
