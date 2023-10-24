import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomText } from '../CustomText';
import { colors } from '../../theme';

export type DetachProps = {
  text: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
}

export function Detach(
  { 
    text, 
    color, 
    width,
    height,
    borderRadius = 10,
    backgroundColor 
  }: DetachProps) {
  return (
    <View style={
      [
        styles.container,
        { 
          width: width, 
          height: height, 
          borderRadius: borderRadius, 
          backgroundColor: backgroundColor
        }
      ]
    }>
      <CustomText 
        mode='detach'
        text={text}
        color={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})