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
import {
  convertAirtableDataToAppData,
  fetchDataFromAirtable,
} from './utils/airtable-util';
import RootNavigation from './navigation/root-navigation';
import Airtable from 'airtable';
import { isFoodTypeFromDBValid } from './utils/food-types';
import { isIngridientFromDBValid } from './utils/ingridient-util';
import { isPizzaFromDBValid } from './utils/pizza-util';
import { isUserFromDBValid } from './utils/user-util';
import { isRecipeFromDBValid } from './utils/recipe-util';

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
    fetchDataFromAirtable<AirtableUser>(
      database('Users'),
      isUserFromDBValid,
      data => {
        setFetchedUsers(data);
      },
    );

    fetchDataFromAirtable<AirtablePizza>(
      database('Pizzas'),
      isPizzaFromDBValid,
      data => {
        setFetchedPizzas(data);
      },
    );

    fetchDataFromAirtable<AirtableIngridient>(
      database('Ingridients'),
      isIngridientFromDBValid,
      data => {
        setFetchedIngridients(data);
      },
    );
    fetchDataFromAirtable<AirtableRecipe>(
      database('Recipes'),
      isRecipeFromDBValid,
      data => {
        setFetchedRecipes(data);
      },
    );

    fetchDataFromAirtable<AirtableFoodType>(
      database('FoodTypes'),
      isFoodTypeFromDBValid,
      data => {
        setFetchedFoodTypes(data);
      },
    );
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
