import * as React from 'react';

import { Colors, Spacing } from '../../styles';
import { ProfileStackParamList, ProfileStackRoutes } from '../../navigation';
import { StyleSheet, View } from 'react-native';

import { ListTile } from '../../components';
import ProfileScreenHeader from './profile-screen-header';
import { StackNavigationProp } from '@react-navigation/stack';
import { User } from '../../models';
import { appTexts } from '../../data';
import { renderNothing } from '../../utils';
import { useNavigation } from '@react-navigation/native';

interface ProfileScreenProps {
  readonly loggedInUser?: User;
}

type NavigationProp = StackNavigationProp<
  ProfileStackParamList,
  ProfileStackRoutes.Main
>;

const ProfileScreenComponent: React.FC<ProfileScreenProps> = ({
  loggedInUser,
}) => {
  const { navigate, setOptions } = useNavigation<NavigationProp>();

  const goToCreation = () => navigate(ProfileStackRoutes.CreateUser);

  React.useLayoutEffect(
    () =>
      setOptions({
        title: undefined,
        headerTitle: renderNothing,
        headerStyle: styles.header,
        header: () => (
          <ProfileScreenHeader
            user={loggedInUser}
            onCreateUser={goToCreation}
          />
        ),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setOptions, loggedInUser],
  );

  return (
    <View style={styles.container}>
      <View>
        <ListTile
          label={appTexts.profile_rated_pizzas}
          style={styles.borderTop}
        />
      </View>
    </View>
  );
};

export default ProfileScreenComponent;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.background, flex: 1 },
  header: {
    backgroundColor: Colors.primary,
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    padding: Spacing.large,
    paddingBottom: Spacing.huge,
  },
  borderTop: { borderTopWidth: 1, borderColor: Colors.lightGrey },
});
