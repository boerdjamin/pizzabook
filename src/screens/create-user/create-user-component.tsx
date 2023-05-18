import * as React from 'react';

import { BigButton, LabeledTextInput, SmallButton } from '../../components';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Spacing, commonStyles } from '../../styles';

import { appTexts } from '../../data/texts';
import { launchImageLibrary } from 'react-native-image-picker';

//** work in progress */
interface CreateUserComponentProps {
  readonly onCreate: (name: string, photo?: ImageSourcePropType) => void;
}

const CreateUserComponent: React.FC<CreateUserComponentProps> = ({
  onCreate,
}) => {
  const [name, setName] = React.useState('');

  const onSelectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      console.log('got', response.assets);
      // TODO: how to save in airtable? base64?
      console.log(response.assets?.map(a => Object.keys(a)));
    });
  };

  const submit = () => {
    onCreate(name);
  };

  return (
    <View style={commonStyles.screen}>
      <LabeledTextInput
        label={appTexts.profile_create_user_label_name}
        value={name}
        onType={value => setName(value)}
        style={styles.nameInput}
      />
      <SmallButton
        label={'Take photo'}
        onPress={onSelectPhoto}
        style={styles.buttonSpacing}
      />
      <BigButton label={appTexts.select_submit_button} onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  nameInput: { marginBottom: Spacing.small },
  buttonSpacing: { marginBottom: Spacing.smaller },
});

export default CreateUserComponent;
