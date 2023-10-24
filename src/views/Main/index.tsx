import React, { useContext } from 'react';
import { Tasks } from '../Tasks';
import { Picture, PictureProps } from '../../components/Picture';
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../theme';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { Detach } from '../../components/Detach';
import { Task } from '../../types/components';
import { TasksContext, TasksDispatchContext } from '../../data/TasksContext';

export function Main() {
  const tasks: Array<Task> = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const [text, setText] = React.useState('');
  const headerPicture: PictureProps = {
    source: require('../../resources/rocket_blue.png'),
    width: 20,
    height: 32
  }
  const buttonPicture: PictureProps = {
    source: require('../../resources/plus_blue.png'),
    width: 16,
    height: 16
  }
  const createdTasksCount = tasks.length.toString();
  const completedTasksCount = tasks.filter(t => t.done === true).length.toString();
  
  function getNextValueId() {
    if (tasks.length > 0) {
      let maxId = Math.max(...tasks.map(task => task.id));
      return ++maxId;
    }
    return 0;
  } 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Picture {...headerPicture} />
        <View style={styles.headerTitle}>
          <CustomText text='to' mode='title' color={colors.blue} />
          <CustomText text='do' mode='title' color={colors.purpleDark} />
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.addTask}>
          <CustomInput 
            placeholder='Adicione uma nova tarefa' 
            placeholderTextColor={colors.gray300}
            value={text}
            onChangeText={value => setText(value)}
            style={styles.addTaskInput} 
          />
          <CustomButton 
            picture={buttonPicture} 
            onPress={() => {
              setText('');
              dispatch({
                type: 'added',
                payload: { id: getNextValueId(),text: text }
              }); 
              Keyboard.dismiss();
            }} 
            style={styles.addTaskButton} 
          />
        </View>
        <View style={styles.statusTask}>
          <View style={styles.statusTaskCreated}>
            <CustomText 
              text='Criadas' 
              mode='detail' 
              color={colors.blue} 
              style={styles.statusTaskCreatedText} 
            />
            <Detach 
              text={createdTasksCount} 
              color={colors.gray200} 
              width={25} 
              height={19} 
              borderRadius={999} 
              backgroundColor={colors.gray400}  
            />
          </View>
          <View style={styles.statusTaskCompleted}>
            <CustomText 
              text='Concluídas' 
              mode='detail' 
              color={colors.purple} 
              style={styles.statusTaskCompletedText}
            />
            <Detach 
              text={completedTasksCount}
              color={colors.gray200} 
              width={25} 
              height={19} 
              borderRadius={999} 
              backgroundColor={colors.gray400}  
            />
          </View>
        </View>
        <View style={styles.listTask}>
          <Tasks data={tasks} />
        </View>
      </View>
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray700
  },
  headerTitle: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  middle: {
    flex: 1,
    marginTop: 72,
    backgroundColor: colors.gray600
  },
  addTask: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: -26,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addTaskInput: {
    flex: 1,
    marginRight: 4,
    height: 54,
    padding: 16,
    fontSize: 16, 
    borderWidth: 1, 
    borderRadius: 6, 
    color: colors.gray100,
    backgroundColor: colors.gray600 
  },
  addTaskButton: {
    width: 52,
    height: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueDark
  },
  statusTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginHorizontal: 24
  },
  statusTaskCreated: {
    flexDirection: 'row'
  },
  statusTaskCreatedText: {
    marginRight: 8
  },
  statusTaskCompleted: {
    flexDirection: 'row'
  },
  statusTaskCompletedText: {
    marginRight: 8
  },
  listTask: {
    marginTop: 20,
    marginHorizontal: 24
  },
})