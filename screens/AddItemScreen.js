import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddItemScreen() {
  return (
    <View style={styles.container}>
      <Text>Here you can add a new item!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
