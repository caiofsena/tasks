import React from 'react';
import { ColorValue, StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { colors } from '../../theme';

export type CustomTextProps = TextProps & {
  text: string;
  mode: 'detach' | 'title' | 'detail' | 'normal' | 'placeholder' | 'scratched';
  color?: ColorValue;
}

export function CustomText(
  {
    mode, 
    text,
    color,
    ...rest
  }: CustomTextProps) {
  let styleText: StyleProp<TextStyle> = null;
  switch (mode) {
    case 'detach':
      styleText = { fontSize: 12, fontWeight: 'bold', color: color ? color : colors.gray100 }
      break;
    case 'normal':
      styleText = { fontSize: 14, color: color ? color : colors.gray100 }
      break;
    case 'detail':
      styleText = { fontSize: 14, fontWeight: 'bold', color: color ? color : colors.gray100 }
      break;
    case 'placeholder':
      styleText = { fontSize: 16, color: color ? color : colors.gray100 }
      break;
    case 'scratched':
      styleText = { fontSize: 14, textDecorationLine: 'line-through', textDecorationStyle: 'solid',  color: color ? color : colors.gray300 }
      break;
    case 'title':
      styleText = { fontSize: 40, fontWeight: 'bold', color: color ? color : colors.gray100 }
      break;
  
    default:
      break;
  }
  return (
    <Text {...rest} style={[ rest.style, styleText]}>
      {text}
    </Text>

  );
}