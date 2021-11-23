import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableUser,
} from './models/airtable';
import { initAppAction } from './store/actions';
import { convertAirtableDataToAppData } from './utils/airtable-util';
import RootNavigation from './navigation/root-navigation';

export interface AppInitializationProps {
  readonly rawPizzas: AirtablePizza[];
  readonly rawIngridients: AirtableIngridient[];
  readonly rawUsers: AirtableUser[];
  readonly rawFoodTypes: AirtableFoodType[];
}

const InitApp = (props: AppInitializationProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const convertedData = convertAirtableDataToAppData(props);
    dispatch(initAppAction(convertedData));
  }, [props, dispatch]);

  return <RootNavigation />;
};

export default InitApp;
