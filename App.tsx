import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Main } from './src/views/Main';
import { colors } from './src/theme';
import { TasksProvider } from './src/data/TasksContext';

export default function App() {
  return (
    <View style={styles.container}>
      <TasksProvider>
        <StatusBar style='light' />
        <Main />
      </TasksProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray700,
  },
});
