import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface AddButtonComponentProps {
  onPress: () => void;
}

const AddButtonComponent: React.FC<AddButtonComponentProps> = () => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    >
      <TouchableOpacity  style={{ paddingRight:15 , paddingLeft : 15, backgroundColor: 'green', marginTop: 10, borderRadius: 40 }}>
        <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddButtonComponent;
