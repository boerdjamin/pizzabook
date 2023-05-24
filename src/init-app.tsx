import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableRecipe,
  AirtableUser,
} from './models';
import React, { useEffect, useState } from 'react';
import { fetchDataFromAirtable, useAirtableDataConversion } from './utils';
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

    fetchDataFromAirtable<AirtableUser>(database('Users'), rawUsers => {
      setFetchedData(prevState => ({ ...prevState, rawUsers }));
    });

    fetchDataFromAirtable<AirtablePizza>(database('Pizzas'), rawPizzas => {
      setFetchedData(prevState => ({ ...prevState, rawPizzas }));
    });

    fetchDataFromAirtable<AirtableIngridient>(
      database('Ingridients'),
      rawIngridients => {
        setFetchedData(prevState => ({ ...prevState, rawIngridients }));
      },
    );

    fetchDataFromAirtable<AirtableRecipe>(database('Recipes'), rawRecipes => {
      setFetchedData(prevState => ({ ...prevState, rawRecipes }));
    });

    fetchDataFromAirtable<AirtableFoodType>(
      database('FoodTypes'),
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
