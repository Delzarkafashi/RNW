import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ViewItemsScreen() {
  return (
    <View style={styles.container}>
      <Text>Here you can view items!</Text>
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
