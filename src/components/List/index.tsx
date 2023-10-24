import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Task } from '../../types/components';

export type ListProps = {
  data: Array<Task>;
}

export function List({data}: ListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item: Task) => item.text}
      renderItem={({item}: {item: Task}) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        ) 
      }
    />
  );
}