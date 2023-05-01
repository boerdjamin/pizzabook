import {
  filterBases,
  filterToppings,
  filterCheese,
  filterSauces,
  filterSpices,
} from '../../utils/food-types';
import { Ingridient } from '../../models';

export interface CreatePizzaForm {
  name: string;
  base: Ingridient[];
  toppings: Ingridient[];
  cheese: Ingridient[];
  sauces: Ingridient[];
  spices: Ingridient[];
  comment: string;
}

export const getOptions = (ingridients: Ingridient[]) => ({
  bases: filterBases(ingridients),
  toppings: filterToppings(ingridients),
  cheese: filterCheese(ingridients),
  sauces: filterSauces(ingridients),
  spices: filterSpices(ingridients),
});
