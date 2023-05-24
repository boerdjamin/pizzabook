import {
  AirtableDataBase,
  fetchDataFromAirtable,
  useAirtableDataConversion,
} from './utils';
import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableRecipe,
  AirtableUser,
} from './models';
import React, { useEffect, useState } from 'react';
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
  const [fetchedData, setFetchedData] = useState<AirtableData>({
    rawPizzas: [],
    rawIngridients: [],
    rawRecipes: [],
    rawUsers: [],
    rawFoodTypes: [],
  });

  useEffect(() => {
    dispatch(setLoadingAction({ loading: true }));

    fetchDataFromAirtable<AirtableUser>(
      database(AirtableDataBase.Users),
      rawUsers => {
        setFetchedData(prevState => ({ ...prevState, rawUsers }));
      },
    );

    fetchDataFromAirtable<AirtablePizza>(
      database(AirtableDataBase.Pizzas),
      rawPizzas => {
        setFetchedData(prevState => ({ ...prevState, rawPizzas }));
      },
    );

    fetchDataFromAirtable<AirtableIngridient>(
      database(AirtableDataBase.Ingridients),
      rawIngridients => {
        setFetchedData(prevState => ({ ...prevState, rawIngridients }));
      },
    );

    fetchDataFromAirtable<AirtableRecipe>(
      database(AirtableDataBase.Recipes),
      rawRecipes => {
        setFetchedData(prevState => ({ ...prevState, rawRecipes }));
      },
    );

    fetchDataFromAirtable<AirtableFoodType>(
      database(AirtableDataBase.FoodTypes),
      rawFoodTypes => {
        setFetchedData(prevState => ({ ...prevState, rawFoodTypes }));
      },
    );
  }, [database, dispatch]);

  const convertedData = useAirtableDataConversion(fetchedData);

  useEffect(() => {
    dispatch(initAppAction(convertedData));
    dispatch(setLoadingAction({ loading: false }));
  }, [convertedData, dispatch]);

  return <RootNavigation />;
};

export default InitApp;
