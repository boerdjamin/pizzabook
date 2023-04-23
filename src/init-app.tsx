import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableRecipe,
  AirtableUser,
} from './models/airtable';
import { initAppAction, setLoadingAction } from './store/actions';
import { convertAirtableDataToAppData, fetchDataFromAirtable } from './utils';
import RootNavigation from './navigation/root-navigation';
import Airtable from 'airtable';

export interface AppInitializationProps {
  readonly database: Airtable.Base;
}

const InitApp = ({ database }: AppInitializationProps) => {
  const dispatch = useDispatch();
  const [rawPizzas, setFetchedPizzas] = useState<AirtablePizza[]>([]);
  const [rawIngridients, setFetchedIngridients] = useState<
    AirtableIngridient[]
  >([]);
  const [rawRecipes, setFetchedRecipes] = useState<AirtableRecipe[]>([]);
  const [rawUsers, setFetchedUsers] = useState<AirtableUser[]>([]);
  const [rawFoodTypes, setFetchedFoodTypes] = useState<AirtableFoodType[]>([]);

  useEffect(() => {
    dispatch(setLoadingAction({ loading: true }));
    fetchDataFromAirtable<AirtableUser>(database('Users'), data => {
      setFetchedUsers(data);
    });

    fetchDataFromAirtable<AirtablePizza>(database('Pizzas'), data => {
      setFetchedPizzas(data);
    });

    fetchDataFromAirtable<AirtableIngridient>(database('Ingridients'), data => {
      setFetchedIngridients(data);
    });
    fetchDataFromAirtable<AirtableRecipe>(database('Recipes'), data => {
      setFetchedRecipes(data);
    });

    fetchDataFromAirtable<AirtableFoodType>(database('FoodTypes'), data => {
      setFetchedFoodTypes(data);
    });
    return () => {
      dispatch(setLoadingAction({ loading: false }));
    };
  }, [database, dispatch]);

  useEffect(() => {
    const convertedData = convertAirtableDataToAppData({
      rawPizzas,
      rawIngridients,
      rawRecipes,
      rawFoodTypes,
      rawUsers,
    });
    dispatch(initAppAction(convertedData));
    return () => {
      dispatch(setLoadingAction({ loading: false }));
    };
  }, [rawFoodTypes, rawIngridients, rawRecipes, rawPizzas, rawUsers, dispatch]);

  return <RootNavigation />;
};

export default InitApp;
