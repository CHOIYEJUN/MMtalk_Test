// TodoListModule.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CheckBox from '@react-native-community/checkbox';

interface TodoListModuleProps {
  todos: TodoItem[];
  editMode: boolean;
  handleToggleTodo: (index: number) => void;
  handleDeleteTodo: (index: number) => void;
}

const TodoListModule: React.FC<TodoListModuleProps> = ({ todos, editMode, handleToggleTodo, handleDeleteTodo }) => {
  return (
    <View
      style={{ marginTop: 0, width: '100%', alignItems: 'center' }}
    >
      {todos.length === 0 && (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
        >
          <Image
            source={require('../../image/noData.png')}
            style={{ width: 200, height: 150, marginTop: 20 }}
          />
          <Text
            style={{ marginTop: 20, color: 'grey', fontSize: 20, fontWeight: 600 }}
          >
            No checklists
          </Text>
          <Text
            style={{ marginTop: 5, color: 'grey', fontSize: 14 }}
          >
            Add checklists that should be checked weekly.
          </Text>
        </View>
      )}

      {todos.length > 0 && (
        <View
          style={{ marginTop: 20, width: '100%', alignItems: 'center' }}
        >
          {todos.map((todo, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, width: '80%', marginRight: 40 }}
            >
              {!editMode && (
                <CheckBox
                  onValueChange={() => handleToggleTodo(index)}
                  value={todo.completed}
                />
              )}
              <Text
                style={[{ marginLeft: 10, width: '100%' },
                  { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}
              >
                {todo.content}
              </Text>
              {editMode && (
                <TouchableOpacity onPress={() => handleDeleteTodo(index)}>
                  <View style={{ marginLeft: 'auto' }}>
                    <Image
                      source={require('../../image/deleteBtn.png')}
                      style={{ width: 25, height: 25 }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default TodoListModule;
