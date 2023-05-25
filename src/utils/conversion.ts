import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableRecipe,
  AirtableUser,
  EnumFoodType,
  FoodType,
  Ingridient,
  Pizza,
  Recipe,
  User,
} from '../models';

import { AirtableData } from '../init-app';
import { Attachment } from 'airtable';
import { ImageURISource } from 'react-native';
import { InitialAppData } from '../store/actions';

const convertFoodTypes = (rawData: AirtableFoodType[]) =>
  rawData.map(rawType => ({
    id: rawType.id,
    type: rawType.key.toUpperCase() as EnumFoodType,
    ingridientIds: rawType.ingridients ?? [],
  }));

const convertIngridients = (
  rawIngridients: AirtableIngridient[],
  foodTypes: FoodType[],
): Ingridient[] =>
  rawIngridients.map(rawIngridient => ({
    id: rawIngridient.id,
    name: rawIngridient.name,
    isVegan: !!rawIngridient.is_vegan,
    foodType:
      foodTypes.find(ft => ft.id === rawIngridient.food_type[0])?.type ||
      EnumFoodType.other,
    pizzaIds: rawIngridient.pizzas ?? [],
  }));

const convertRecipes = (
  rawRecipes: AirtableRecipe[],
  allIngridients: Ingridient[],
  allUsers: User[],
): Recipe[] =>
  rawRecipes.map(rawRecipe => {
    const ingridients: Ingridient[] = [];
    // find all ingridients for the recipe
    rawRecipe.ingridients?.map(ingridientId => {
      const matchingIngridient = allIngridients.find(
        i => i.id === ingridientId,
      );
      if (matchingIngridient) {
        ingridients.push(matchingIngridient);
      }
    });

    return {
      id: rawRecipe.id,
      name: rawRecipe.name,
      steps: rawRecipe.steps ?? [],
      ingridients,
      isVegan: !!rawRecipe.is_vegan,
      pizzaIds: rawRecipe.pizzas ?? [],
      createdBy:
        allUsers.find(user => user.id === rawRecipe.created_by) ?? null,
    };
  });

const convertPicture = (picture: Attachment[] | undefined) => {
  return picture ? ({ uri: picture[0].url } as ImageURISource) : null;
};

const convertUsers = (rawUsers: AirtableUser[]): User[] =>
  rawUsers.map(rawUser => ({
    id: rawUser.id,
    name: rawUser.name,
    picture: convertPicture(rawUser.picture),
    pizzas: rawUser.pizzas ?? [],
    recipes: [],
  }));

const convertPizzas = (
  rawPizzas: AirtablePizza[],
  ingridients: Ingridient[],
  recipes: Recipe[],
  users: User[],
): Pizza[] =>
  rawPizzas.map(rawPizza => {
    const allToppings: (Ingridient | Recipe)[] = [];
    // find all simple toppings by id
    rawPizza.toppings.forEach(toppingId => {
      const matchingIngridient = ingridients.find(i => i.id === toppingId);
      if (matchingIngridient) {
        allToppings.push(matchingIngridient);
      }
    });
    // find all "complex" toppings (recipes) by recipe id
    if (rawPizza.recipes) {
      rawPizza.recipes.forEach(recipeId => {
        const matchingRecipe = recipes.find(r => r.id === recipeId);
        if (matchingRecipe) {
          allToppings.push(matchingRecipe);
        }
      });
    }
    return {
      id: rawPizza.id,
      name: rawPizza.name,
      toppings: allToppings,
      isVegan: rawPizza.is_vegan,
      createdBy: users.find(user => user.id === rawPizza.created_by) || null,
      photo: convertPicture(rawPizza.photos),
      canBeVeganized: !!rawPizza.can_be_veganized,
      comment: rawPizza.comment || '',
      rating: rawPizza.rating || 0,
    };
  });

const convertAirtableData = (
  data: AirtableData | undefined,
): InitialAppData | undefined => {
  if (!data) return undefined;

  const { rawIngridients, rawRecipes, rawPizzas, rawUsers, rawFoodTypes } =
    data;

  const users = convertUsers(rawUsers);
  const foodTypes = convertFoodTypes(rawFoodTypes);
  const ingridients = convertIngridients(rawIngridients, foodTypes);
  const recipes = convertRecipes(rawRecipes, ingridients, users);
  const pizzas = convertPizzas(rawPizzas, ingridients, recipes, users);

  return { pizzas, ingridients, recipes, users, foodTypes };
};

export { convertAirtableData };
