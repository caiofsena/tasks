import React, { useContext } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Task } from '../../types/components';
import { colors } from '../../theme';
import Checkbox from 'expo-checkbox';
import { CustomText, CustomTextProps } from '../../components/CustomText';
import { Picture, PictureProps } from '../../components/Picture';
import { CustomButton } from '../../components/CustomButton';
import { TasksDispatchContext } from '../../data/TasksContext';

export type TasksProps = {
  data: Array<Task>;
}

export function Tasks(
  {
    data
  }: TasksProps) {
  const dispatch = useContext(TasksDispatchContext);
  const trash: PictureProps = {
    source: require('../../resources/trash.png'),
    width: 16,
    height: 16
  }
  const list: PictureProps = {
    source: require('../../resources/list.png'),
    width: 56,
    height: 56
  }

  function emptyTasks() {
    return (
      <View style={styles.emptyTasks}>
        <Picture
          {...list}
          style={styles.pictureEmptyTasks}
        />
        <CustomText
          mode='normal'
          color={colors.gray300}
          text={`Você ainda não tem tarefas cadastradas\nCrie tarefas e organize seus itens a fazer`}
          style={styles.textEmptyTasks}
        />
      </View>
    );
  }

  function renderItem(task: Task) {
    return (
      <View style={styles.itemContainer}>
        <Checkbox
          value={task.done}
          onValueChange={(value) => {
            dispatch({
              type: 'changed',
              payload: {
                ...task,
                done: value
              }
            });
          }}
          style={styles.checkbox}
        />
        <CustomText 
          mode={task.done ? 'scratched' : 'normal'}
          text={task.text} 
          numberOfLines={2}
          style={styles.itemText} 
        />
        <CustomButton 
          picture={trash} 
          onPress={() => {
            Alert.alert(
              'Excluir tarefa', 
              'Deseja realmente excluir esta tarefa?', 
              [
                {
                  text: 'cancelar',
                },
                {
                  text: 'ok',
                  onPress: () => {
                    dispatch({
                      type: 'deleted',
                      payload: task
                    })
                  }
                }
              ]
            )
          }} 
          style={styles.picture} 
        />
      </View>
    );
  }   
  
  return (
    <FlatList 
      data={data}
      keyExtractor={(item: Task) => item.id.toString()} 
      renderItem={({item}: {item: Task}) => (
        renderItem(item)
      )}
      ListEmptyComponent={emptyTasks}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    height: 64,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.gray500
  },
  checkbox: {
    marginLeft: 8,
    borderColor: colors.blue,
    borderRadius: 999,
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
    color: colors.gray100
  },
  picture: {
    marginRight: 12
  },
  emptyTasks: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray400
  },
  pictureEmptyTasks: {
    marginTop: 48
  },
  textEmptyTasks: {
    marginTop: 16
  }
})