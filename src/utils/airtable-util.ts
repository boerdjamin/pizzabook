import { EnumFoodType, FoodType } from './../models/food-type';
import { InitialAppData } from './../store/actions/init-app';
import {
  AirtableUser,
  AirtablePizza,
  AirtableIngridient,
  AirtableFoodType,
} from './../models/airtable';
import { Identifyable } from './../models/identifyable';
import { FieldSet, Table } from 'airtable';
import { handleError } from './error-util';
import { Ingridient } from '../models/ingridient';
import { mapTypeIdToEnum } from './food-types';
import { User } from '../models/user';
import { Pizza } from '../models/pizza';

export const fetchDataFromAirtable = <T extends Identifyable>(
  table: Table<FieldSet>,
  validationFn: (value: any) => boolean,
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
        const isValid = validationFn(newData);

        // delete invalid entries
        if (!isValid) {
          console.log('Invalid record:', record);
          console.log(record.fields);
          // TODO: table.destroy(record.id);
          return collection;
        }

        return [...collection, { id: record.id, ...newData } as T];
      }, []);

      updateFn(allEntries);
      fetchNextPage();
    }, handleError);
};

const convertFoodTypes = (rawData: AirtableFoodType[]) =>
  rawData.map(rawType => ({
    id: rawType.id,
    type: mapTypeIdToEnum(rawType.key),
    ingridientIds: rawType.ingridients || [],
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
      foodTypes.find(ft => ft.id === rawIngridient.food_type)?.type ||
      EnumFoodType.other,
    pizzaIds: rawIngridient.pizzas || [],
  }));

const convertUsers = (rawUsers: AirtableUser[]): User[] =>
  rawUsers.map(rawUser => ({
    id: rawUser.id,
    name: rawUser.name,
    pizzas: rawUser.pizzas || [],
  }));

const convertPizzas = (
  rawPizzas: AirtablePizza[],
  ingridients: Ingridient[],
  users: User[],
): Pizza[] =>
  rawPizzas.map(rawPizza => {
    const toppings: Ingridient[] = [];
    rawPizza.toppings.forEach(toppingId => {
      const matchingIngridient = ingridients.find(i => i.id === toppingId);
      if (matchingIngridient) {
        toppings.push(matchingIngridient);
      }
    });
    return {
      id: rawPizza.id,
      name: rawPizza.name,
      toppings,
      isVegan: rawPizza.is_vegan,
      createdBy: users.find(user => user.id === rawPizza.created_by) || null,
      photo: rawPizza.photos ? rawPizza.photos[0] : null,
      canBeVeganized: !!rawPizza.can_be_veganized,
      comment: rawPizza.comment || '',
    };
  });

export const convertAirtableDataToAppData = (rawData: {
  rawUsers: AirtableUser[];
  rawPizzas: AirtablePizza[];
  rawIngridients: AirtableIngridient[];
  rawFoodTypes: AirtableFoodType[];
}): InitialAppData => {
  const { rawIngridients, rawPizzas, rawUsers, rawFoodTypes } = rawData;

  const foodTypes: FoodType[] = convertFoodTypes(rawFoodTypes);
  const ingridients: Ingridient[] = convertIngridients(
    rawIngridients,
    foodTypes,
  );
  const users = convertUsers(rawUsers);
  const pizzas = convertPizzas(rawPizzas, ingridients, users);

  return { pizzas, ingridients, users, foodTypes };
};
