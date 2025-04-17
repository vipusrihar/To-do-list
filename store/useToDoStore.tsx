import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../type/types';

type TodoStore = {
  todos: Todo[];
  taskId: number;
  setTaskId: (id: number) => void;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  taskId: 0,
  setTaskId: (id) => {
    AsyncStorage.setItem('taskId', id.toString());
    set({ taskId: id });
  },
  setTodos: (todos) => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
    set({ todos });
  },
  addTodo: (todo) =>
    set((state) => {
      const newTodos = [...state.todos, todo];
      AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
  deleteTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
  toggleComplete: (id: number | null) =>
    set((state) => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),


}));

