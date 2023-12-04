// TextInputButtonModule.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Pressable,
  Text
} from "react-native";

interface TextInputButtonModuleProps {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  onAddTodo: () => void;
}

const TextInputButtonModule: React.FC<TextInputButtonModuleProps> = ({ newTodo, setNewTodo, onAddTodo }) => {
  const textInputRef = useRef(null);

  const handleButtonPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleTextInputSubmit = () => {
    setNewTodo(textInputRef.current?.value || '');
    onAddTodo();
    Keyboard.dismiss();
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  return (
    <View
      style={{position: 'absolute', bottom: 50, right: 30}}
    >
      <TextInput
        style={{ position: 'absolute', left: -1000 }}
        ref={textInputRef}
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
        onSubmitEditing={handleTextInputSubmit}
      />
      {!isKeyboardVisible && (
        <Pressable onPress={handleButtonPress} style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {

  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#44CEC6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,

  }

});

export default TextInputButtonModule;
