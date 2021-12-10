import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Icons from '../../../assets/icons';
import ListTile from '../../components/list-tile/list-tile';
import { User } from '../../models/user';
import {
  ProfileStackParamList,
  ProfileStackRoutes,
} from '../../navigation/routes';
import { Colors, Spacing, textStyles } from '../../styles';
import commonStyles from '../../styles/common';
import { renderNothing } from '../../utils/placeholder';

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
  const { setOptions } = useNavigation<NavigationProp>();

  React.useLayoutEffect(
    () =>
      setOptions({
        title: undefined,
        headerTitle: renderNothing,
        headerStyle: styles.header,
        header: () => (
          <View style={styles.header}>
            <View style={styles.user}>
              <View style={styles.profilePic}>
                <Image
                  source={
                    loggedInUser && loggedInUser.picture
                      ? loggedInUser.picture
                      : Icons.user
                  }
                  style={styles.pic}
                />
              </View>
              {loggedInUser ? (
                <Text style={textStyles.headline}>{loggedInUser.name}</Text>
              ) : (
                <View>
                  <Text>{'Login'}</Text>
                  <Text>{'Nutzer anlegen'}</Text>
                </View>
              )}
            </View>
          </View>
        ),
      }),
    [setOptions, loggedInUser],
  );

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <ListTile label={'List Tile'} style={styles.borderTop} />
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
  user: {
    ...commonStyles.row,
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.large,
  },
  pic: {
    height: '70%',
    width: '70%',
    overflow: 'hidden',
    tintColor: Colors.text,
  },
  list: {},
  borderTop: { borderTopWidth: 1, borderColor: Colors.lightGrey },
});
