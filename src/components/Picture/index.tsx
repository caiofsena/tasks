import React from 'react';
import { Image, ImageProps } from 'react-native';

export type PictureProps = ImageProps & {
  width?: number;
  height?: number; 
}

export function Picture(
  {
    width = 50, 
    height = 50,
    ...rest
  }: PictureProps) {
    return (
      <Image {...rest} style={[ rest.style, { width: width, height: height }]} />
    );
}