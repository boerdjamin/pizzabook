import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableUser,
} from './models/airtable';
import { initAppAction, setLoadingAction } from './store/actions';
import {
  convertAirtableDataToAppData,
  fetchDataFromAirtable,
} from './utils/airtable-util';
import RootNavigation from './navigation/root-navigation';
import Airtable from 'airtable';
import { isFoodTypeFromDBValid } from './utils/food-types';
import { isIngridientFromDBValid } from './utils/ingridient-util';
import { isPizzaFromDBValid } from './utils/pizza-utils';
import { isUserFromDBValid } from './utils/user-util';

export interface AppInitializationProps {
  readonly database: Airtable.Base;
}

const InitApp = ({ database }: AppInitializationProps) => {
  const dispatch = useDispatch();
  const [rawPizzas, setFetchedPizzas] = useState<AirtablePizza[]>([]);
  const [rawIngridients, setFetchedIngridients] = useState<
    AirtableIngridient[]
  >([]);
  const [rawUsers, setFetchedUsers] = useState<AirtableUser[]>([]);
  const [rawFoodTypes, setFetchedFoodTypes] = useState<AirtableFoodType[]>([]);

  useEffect(() => {
    dispatch(setLoadingAction({ loading: true }));
    fetchDataFromAirtable<AirtableUser>(
      database('Users'),
      isUserFromDBValid,
      users => {
        setFetchedUsers(users);
      },
    );

    fetchDataFromAirtable<AirtablePizza>(
      database('Pizzas'),
      isPizzaFromDBValid,
      pizzas => {
        setFetchedPizzas(pizzas);
      },
    );

    fetchDataFromAirtable<AirtableIngridient>(
      database('Ingridients'),
      isIngridientFromDBValid,
      ings => {
        setFetchedIngridients(ings);
      },
    );

    fetchDataFromAirtable<AirtableFoodType>(
      database('FoodTypes'),
      isFoodTypeFromDBValid,
      foodType => {
        setFetchedFoodTypes(foodType);
      },
    );
  }, [database, dispatch]);

  useEffect(() => {
    const convertedData = convertAirtableDataToAppData({
      rawPizzas,
      rawIngridients,
      rawFoodTypes,
      rawUsers,
    });
    dispatch(initAppAction(convertedData));
    return () => {
      dispatch(setLoadingAction({ loading: false }));
    };
  }, [rawFoodTypes, rawIngridients, rawPizzas, rawUsers, dispatch]);

  return <RootNavigation />;
};

export default InitApp;
