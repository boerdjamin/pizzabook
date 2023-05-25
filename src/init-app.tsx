import { AirtableDataBase, fetchDataFromAirtable } from './api';
import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableRecipe,
  AirtableUser,
} from './models';
import React, { useEffect, useState } from 'react';
import { convertAirtableData, handleError } from './utils';
import { initAppAction, setLoadingAction } from './store/actions';

import Airtable from 'airtable';
import { RootNavigation } from './navigation';
import { useDispatch } from 'react-redux';

export interface AppInitializationProps {
  readonly database: Airtable.Base;
}

export interface AirtableData {
  rawUsers: AirtableUser[];
  rawPizzas: AirtablePizza[];
  rawIngridients: AirtableIngridient[];
  rawRecipes: AirtableRecipe[];
  rawFoodTypes: AirtableFoodType[];
}

const InitApp = ({ database }: AppInitializationProps) => {
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState<AirtableData | undefined>();

  useEffect(() => {
    dispatch(setLoadingAction({ loading: true }));

    Promise.all([
      fetchDataFromAirtable<AirtableUser>(database(AirtableDataBase.Users)),
      fetchDataFromAirtable<AirtablePizza>(database(AirtableDataBase.Pizzas)),
      fetchDataFromAirtable<AirtableIngridient>(
        database(AirtableDataBase.Ingridients),
      ),
      fetchDataFromAirtable<AirtableRecipe>(database(AirtableDataBase.Recipes)),
      fetchDataFromAirtable<AirtableFoodType>(
        database(AirtableDataBase.FoodTypes),
      ),
    ])
      .then(data => {
        setFetchedData({
          rawUsers: data[0],
          rawPizzas: data[1],
          rawIngridients: data[2],
          rawRecipes: data[3],
          rawFoodTypes: data[4],
        });
      })
      .catch(handleError);
  }, [database, dispatch]);

  const convertedData = convertAirtableData(fetchedData);

  useEffect(() => {
    if (convertedData) dispatch(initAppAction(convertedData));
  }, [convertedData, dispatch]);

  return <RootNavigation />;
};

export default InitApp;
