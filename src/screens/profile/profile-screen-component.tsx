import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { appTexts } from '../../data/texts';
import { User } from '../../models';
import { ProfileStackParamList, ProfileStackRoutes } from '../../navigation';
import { Colors, Spacing } from '../../styles';
import { renderNothing } from '../../utils/placeholder';
import ProfileScreenHeader from './profile-screen-header';
import { ListTile } from '../../components';

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
  container: { backgroundColor: Colors.white, flex: 1 },
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
