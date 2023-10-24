import React from 'react';
import { ColorValue, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Picture, PictureProps } from '../Picture';

export type CustomButtonProps = TouchableOpacityProps & {
  text?: { value: string, color: ColorValue };
  picture?: PictureProps;
}

export function CustomButton(
  {
    text,
    picture,
    ...rest
  }: CustomButtonProps) {
  return (
    <TouchableOpacity {...rest} >
      {text && <Text style={{color: text.color}}>{text.value}</Text>}
      {picture && <Picture source={picture.source} width={picture.width} height={picture.height} />}
    </TouchableOpacity>
  );
}