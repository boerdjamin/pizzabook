import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableRecipe,
  AirtableUser,
  EnumFoodType,
  FoodType,
  Identifyable,
  Ingridient,
  Pizza,
  Recipe,
  User,
} from '../models';
import { FieldSet, Table } from 'airtable';
import { foodTypeKeys, requiredFoodTypeKeys } from './food-types';
import { ingridientKeys, requiredIngridientKeys } from './ingridient';
import { pizzaKeys, requiredPizzaKeys } from './pizza';
import { recipeKeys, requiredRecipeKeys } from './recipe';
import { requiredUserKeys, userKeys } from './user';
import { useEffect, useMemo, useState } from 'react';

import { AirtableData } from '../init-app';
import { InitialAppData } from '../store/actions/init-app';
import { handleError } from './error';
import { isAirtableDataValid } from './validation';

export enum AirtableDataBase {
  Users = 'Users',
  Pizzas = 'Pizzas',
  Ingridients = 'Ingridients',
  Recipes = 'Recipes',
  FoodTypes = 'FoodTypes',
}

const getKeysOfDataType = <T>(
  tableName: string,
): { all: (keyof T)[]; required: (keyof T)[] } => {
  switch (tableName) {
    case AirtableDataBase.Users:
      return {
        all: userKeys as (keyof T)[],
        required: requiredUserKeys as (keyof T)[],
      };
    case AirtableDataBase.Pizzas:
      return {
        all: pizzaKeys as (keyof T)[],
        required: requiredPizzaKeys as (keyof T)[],
      };
    case AirtableDataBase.Ingridients:
      return {
        all: ingridientKeys as (keyof T)[],
        required: requiredIngridientKeys as (keyof T)[],
      };
    case AirtableDataBase.Recipes:
      return {
        all: recipeKeys as (keyof T)[],
        required: requiredRecipeKeys as (keyof T)[],
      };
    case AirtableDataBase.FoodTypes:
      return {
        all: foodTypeKeys as (keyof T)[],
        required: requiredFoodTypeKeys as (keyof T)[],
      };
    default:
      return { all: [], required: [] };
  }
};

const fetchDataFromAirtable = <T extends Identifyable>(
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

        // detect invalid entries
        if (!isValid) {
          console.log(`Invalid record in table: ${table.name}`, record);
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
    // find all simple toppings by id
    rawPizza.toppings.forEach(toppingId => {
      const matchingIngridient = ingridients.find(i => i.id === toppingId);
      if (matchingIngridient) {
        toppings.push(matchingIngridient);
      }
    });
    // find all "complex" toppings (recipes) by recipe id
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

const useAirtableDataConversion = (data: AirtableData) => {
  const { rawIngridients, rawRecipes, rawPizzas, rawUsers, rawFoodTypes } =
    data;

  const [convertedData, setConvertedData] = useState<InitialAppData>({
    pizzas: [],
    ingridients: [],
    recipes: [],
    users: [],
    foodTypes: [],
  });

  const users = useMemo(() => convertUsers(rawUsers), [rawUsers]);
  const foodTypes = useMemo(
    () => convertFoodTypes(rawFoodTypes),
    [rawFoodTypes],
  );

  const ingridients = useMemo(
    () => convertIngridients(rawIngridients, foodTypes),
    [rawIngridients, foodTypes],
  );

  const recipes = useMemo(
    () => convertRecipes(rawRecipes, ingridients, users),
    [rawRecipes, ingridients, users],
  );

  const pizzas = useMemo(
    () => convertPizzas(rawPizzas, ingridients, recipes, users),
    [rawPizzas, ingridients, recipes, users],
  );

  useEffect(() => {
    setConvertedData({ pizzas, ingridients, recipes, users, foodTypes });
  }, [foodTypes, ingridients, pizzas, users, recipes]);

  return convertedData;
};

export { useAirtableDataConversion, fetchDataFromAirtable };
