import { FieldSet, Table } from 'airtable';
import {
  foodTypeKeys,
  ingridientKeys,
  pizzaKeys,
  recipeKeys,
  requiredFoodTypeKeys,
  requiredIngridientKeys,
  requiredPizzaKeys,
  requiredRecipeKeys,
  requiredUserKeys,
  userKeys,
} from './validation';

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

const fetchDataFromAirtable = <T extends FieldSet>(
  table: Table<FieldSet>,
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    table
      .select({
        maxRecords: 300,
        view: 'Grid view',
      })
      .eachPage(
        records => {
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
          resolve(allEntries);
        },
        error => {
          reject(error);
          handleError(error);
        },
      );
  });
};

export { fetchDataFromAirtable };
