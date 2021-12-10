import * as React from 'react';
import { useSelector } from 'react-redux';
import { PizzaBookState } from '../../models/app-state';
import ProfileScreenComponent from './profile-screen-component';

export type ProfileScreenProps = {};

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const currentUser = useSelector(
    (state: PizzaBookState) => state.users.loggedInAs,
  );

  return <ProfileScreenComponent loggedInUser={currentUser} />;
};

export default ProfileScreen;
