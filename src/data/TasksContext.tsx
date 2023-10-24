import { createContext, useReducer } from 'react';
import { Task } from '../types/components';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }: { children: any }) {
  const [ tasks, dispatch ] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(
  tasks: Array<Task>, 
  action: { type: string, payload: { id: number, text: string, done: boolean } }) {
  switch (action.type) {
    case 'added': {
      console.log('ADD TASK: ', action);
      return [...tasks, {
        id: action.payload.id,
        text: action.payload.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.payload.id) {
          return action.payload;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.payload.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks: Array<Task> = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
