import * as React from 'react';

import { Colors, Spacing, commonStyles, textStyles } from '../../styles';
import { Icon, SmallButton } from '../../components';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Icons } from '../../../assets';
import { User } from '../../models';
import { appTexts } from '../../data';
import { doNothing } from '../../utils';

interface ProfileScreenHeaderProps {
  readonly user?: User;
  readonly onCreateUser: () => void;
}

const ProfileScreenHeader = ({
  user,
  onCreateUser,
}: ProfileScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.profilePic}>
          <Image
            source={user?.picture ? user.picture : Icons.userCircle}
            style={styles.pic}
          />
          {user ? (
            <Icon
              wrapperStyle={styles.editWrapper}
              icon={Icons.pencil}
              size={36}
            />
          ) : null}
        </View>
        {user ? (
          <Text style={textStyles.headline}>{user.name}</Text>
        ) : (
          <View>
            <SmallButton
              label={appTexts.profile_login}
              onPress={doNothing}
              style={styles.marginBottom}
            />
            <SmallButton
              label={appTexts.profile_register}
              onPress={onCreateUser}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileScreenHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    padding: Spacing.large,
    paddingBottom: Spacing.huge,
  },
  user: {
    ...commonStyles.row,
    justifyContent: 'flex-start',
  },
  marginBottom: {
    marginBottom: Spacing.smaller,
  },
  profilePic: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.large,
  },
  pic: {
    height: '100%',
    width: '100%',
    tintColor: Colors.text,
  },
  editWrapper: {
    backgroundColor: `${Colors.lightGrey}${Colors.transparency32}`,
    position: 'absolute',
    left: 50,
    top: 50,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.small,
  },
});
