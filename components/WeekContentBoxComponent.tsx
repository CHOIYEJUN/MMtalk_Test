import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,  Button, ScrollView, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CheckBox from '@react-native-community/checkbox';
interface TodoItem {
  weekNumber: number;
  content: string;
  completed: boolean;
}

interface WeekContentBoxComponentProps {
  weekNumber: number;
  todos: TodoItem[];
  onAddTodo: (weekNumber: number, content: string) => void;
  onToggleTodo: (weekNumber: number, index: number) => void;
}

const WeekContentBoxComponent:
  React.FC<WeekContentBoxComponentProps> = ({
  weekNumber, todos, onAddTodo, onToggleTodo, }) => {
  const [newTodo, setNewTodo] = useState('');
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;


  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      onAddTodo(weekNumber, newTodo);
      setNewTodo('');
    }

  };
  const progressPercentage = (completedTodos / totalTodos) * 100 || 0;

  const handleToggleTodo = (index: number) => {
    onToggleTodo(weekNumber, index);
    console.log(weekNumber, index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20, // 좌우 여백 조절
          alignItems: 'center',

        }}
      >
        <TextInput
          style={[styles.input, { marginRight: 10 }]}
          placeholder="Add a new todo..."
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}

        />
        <Button
          title="Add"
          onPress={handleAddTodo}
          color={'#FF7484'}
        />

      </View>




      <Text style={styles.header}>Week {weekNumber} Todo List</Text>
      {todos.map((todo, index) => (
        <View key={index} style={styles.todoItem}>
          <CheckBox
            onValueChange={() => handleToggleTodo(index)}
            value={todo.completed}
          />
          <Text
            style={
            [
              styles.todoText ,
              {textDecorationLine : todo.completed ? 'line-through' : 'none' }
            ]}>
            {todo.content}
          </Text>
        </View>
      ))}


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign : 'left',
    marginBottom: 5,
    width: '80%',
    marginRight: 40,

  },
  todoText: {
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default WeekContentBoxComponent;
