import * as React from 'react';

import { PizzaBookState } from '../../models';
import ProfileScreenComponent from './profile-screen-component';
import { useSelector } from 'react-redux';

export type ProfileScreenProps = {};

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const currentUser = useSelector(
    (state: PizzaBookState) => state.users.loggedInAs,
  );

  return <ProfileScreenComponent loggedInUser={currentUser} />;
};

export { ProfileScreen };
