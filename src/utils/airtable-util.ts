import { InitialAppData } from './../store/actions/init-app';
import {
  AirtableUser,
  AirtablePizza,
  AirtableIngridient,
} from './../models/airtable';
import { Identifyable } from './../models/identifyable';
import { FieldSet, Table } from 'airtable';
import { handleError } from './error-util';
import { FoodType } from '../models/food-type';
import { Ingridient } from '../models/ingridient';

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

export const convertAirtableDataToAppData = (rawData: {
  rawUsers: AirtableUser[];
  rawPizzas: AirtablePizza[];
  rawIngridients: AirtableIngridient[];
}): InitialAppData => {
  const { rawIngridients, rawPizzas, rawUsers } = rawData;
  const ingridients: Ingridient[] = rawIngridients.map(rawIngridient => ({
    ...rawIngridient,
    isVegan: !!rawIngridient.is_vegan,
    // TODO: getFoodType(rawIngridient.foodType)
    foodType: FoodType.cheese,
    pizzaIds: rawIngridient.pizzas || [],
  }));
  const users = rawUsers.map(rawUser => ({
    ...rawUser,
    pizzas: rawUser.pizzas || [],
  }));
  const pizzas = rawPizzas.map(rawPizza => {
    const toppings: Ingridient[] = [];
    rawPizza.toppings.forEach(toppingId => {
      const matchingIngridient = ingridients.find(i => i.id === toppingId);
      if (matchingIngridient) {
        toppings.push(matchingIngridient);
      }
    });

    return {
      ...rawPizza,
      toppings,
      isVegan: rawPizza.is_vegan,
      createdBy: users.find(user => user.id === rawPizza.created_by) || null,
      photo: rawPizza.photo || null,
      canBeVeganized: !!rawPizza.can_be_veganized,
      comment: rawPizza.comment || '',
    };
  });

  return { pizzas, ingridients, users };
};
