import { FieldSet, Table } from 'airtable';
import { ingridientKeys, requiredIngridientKeys } from './ingridient';
import { pizzaKeys, requiredPizzaKeys } from './pizza';
import { InitialAppData } from '../store/actions/init-app';
import { handleError } from './error';
import {
  foodTypeKeys,
  mapTypeIdToEnum,
  requiredFoodTypeKeys,
} from './food-types';
import {
  User,
  Pizza,
  Recipe,
  Ingridient,
  Identifyable,
  AirtableUser,
  AirtablePizza,
  AirtableIngridient,
  AirtableFoodType,
  AirtableRecipe,
  EnumFoodType,
  FoodType,
} from '../models';
import { isAirtableDataValid } from './validation';
import { requiredUserKeys, userKeys } from './user';
import { recipeKeys, requiredRecipeKeys } from './recipe';

const getKeysOfDataType = <T>(
  tableName: string,
): { all: (keyof T)[]; required: (keyof T)[] } => {
  switch (tableName) {
    case 'Users':
      return {
        all: userKeys as (keyof T)[],
        required: requiredUserKeys as (keyof T)[],
      };
    case 'Pizzas':
      return {
        all: pizzaKeys as (keyof T)[],
        required: requiredPizzaKeys as (keyof T)[],
      };

    case 'Ingridients':
      return {
        all: ingridientKeys as (keyof T)[],
        required: requiredIngridientKeys as (keyof T)[],
      };
    case 'Recipes':
      return {
        all: recipeKeys as (keyof T)[],
        required: requiredRecipeKeys as (keyof T)[],
      };

    case 'FoodTypes':
      return {
        all: foodTypeKeys as (keyof T)[],
        required: requiredFoodTypeKeys as (keyof T)[],
      };
    default:
      return { all: [], required: [] };
  }
};

export const fetchDataFromAirtable = <T extends Identifyable>(
  table: Table<FieldSet>,
  updateFn: (allEntries: T[]) => void,
) => {
  table
    .select({
      maxRecords: 50,
      view: 'Grid view',
    })
    .eachPage((records, fetchNextPage) => {
      const allEntries = records.reduce<T[]>((collection, record) => {
        const newData = record.fields;
        const isValid = isAirtableDataValid<T>(
          newData,
          getKeysOfDataType<T>(table.name),
        );

        // delete invalid entries
        if (!isValid) {
          console.log(`Invalid record in table: ${table.name}`, record);
          console.log(record.fields);
          // TODO: table.destroy(record.id);
          return collection;
        }

        return [...collection, { ...newData, id: record.id } as T];
      }, []);

      updateFn(allEntries);
      fetchNextPage();
    }, handleError);
};

const convertFoodTypes = (rawData: AirtableFoodType[]) =>
  rawData.map(rawType => ({
    id: rawType.id,
    type: mapTypeIdToEnum(rawType.key),
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

const convertUsers = (rawUsers: AirtableUser[]): User[] =>
  rawUsers.map(rawUser => ({
    id: rawUser.id,
    name: rawUser.name,
    picture: rawUser.picture?.[0] ?? null,
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
    const toppings: (Ingridient | Recipe)[] = [];
    rawPizza.toppings.forEach(toppingId => {
      const matchingIngridient = ingridients.find(i => i.id === toppingId);
      if (matchingIngridient) {
        toppings.push(matchingIngridient);
      }
    });
    if (rawPizza.recipes) {
      rawPizza.recipes.forEach(recipeId => {
        const matchingRecipe = recipes.find(r => r.id === recipeId);
        if (matchingRecipe) {
          toppings.push(matchingRecipe);
        }
      });
    }
    return {
      id: rawPizza.id,
      name: rawPizza.name,
      toppings,
      isVegan: rawPizza.is_vegan,
      createdBy: users.find(user => user.id === rawPizza.created_by) || null,
      photo: rawPizza.photos ? rawPizza.photos[0] : null,
      canBeVeganized: !!rawPizza.can_be_veganized,
      comment: rawPizza.comment || '',
      rating: rawPizza.rating || 0,
    };
  });

export const convertAirtableDataToAppData = (rawData: {
  rawUsers: AirtableUser[];
  rawPizzas: AirtablePizza[];
  rawIngridients: AirtableIngridient[];
  rawRecipes: AirtableRecipe[];
  rawFoodTypes: AirtableFoodType[];
}): InitialAppData => {
  const { rawIngridients, rawRecipes, rawPizzas, rawUsers, rawFoodTypes } =
    rawData;

  const users = convertUsers(rawUsers);
  const foodTypes: FoodType[] = convertFoodTypes(rawFoodTypes);
  const ingridients: Ingridient[] = convertIngridients(
    rawIngridients,
    foodTypes,
  );
  const recipes: Recipe[] = convertRecipes(rawRecipes, ingridients, users);
  const pizzas = convertPizzas(rawPizzas, ingridients, recipes, users);

  return { pizzas, ingridients, users, foodTypes };
};
