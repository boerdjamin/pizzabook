import * as React from 'react';
import { View, ImageSourcePropType } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { appTexts } from '../../data/texts';
import commonStyles from '../../styles/common';
import { LabeledTextInput, SmallButton, BigButton } from '../../components';

//** work in progress */
interface CreateUserComponentProps {
  readonly onCreate: (name: string, photo?: ImageSourcePropType) => void;
}

const CreateUserComponent: React.FC<CreateUserComponentProps> = ({
  onCreate,
}) => {
  const [name, setName] = React.useState('');
  //   const [photo, setPhoto] = React.useState('');

  const onSelectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      console.log('got', response.assets);
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
      />
      <SmallButton label={'Take photo'} onPress={onSelectPhoto} />
      <BigButton label={appTexts.select_submit_button} onPress={submit} />
    </View>
  );
};

export default CreateUserComponent;
