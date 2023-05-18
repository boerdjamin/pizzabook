import * as React from 'react';

import { Colors, textStyles } from '../../styles';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

interface LabelProps extends TextProps {
  readonly text: string;
  readonly color?: Colors;
  readonly additionalStyle?: StyleProp<TextStyle>;
}

const Label = (props: LabelProps) => {
  return (
    <Text
      {...props}
      style={[textStyles.h3, props.additionalStyle, props.style]}>
      {props.text}
    </Text>
  );
};

export { Label };
