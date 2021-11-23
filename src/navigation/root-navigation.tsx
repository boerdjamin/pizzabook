import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PizzaState, UserState } from '../models/app-state';
import { initAppAction } from '../store/actions';
import RootNavigationComponent from './root-navigation-component';

export type AppInitializationProps = UserState & PizzaState;

const RootNavigation = (props: AppInitializationProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAppAction(props));
  }, [props, dispatch]);

  return <RootNavigationComponent />;
};

export default RootNavigation;
