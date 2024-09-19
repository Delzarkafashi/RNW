import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// för att se på hemisdan  http://localhost:3000/add-item

export default function ViewItemsScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Funktion för att hämta items från backend
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/items'); // Ändra till din backend-url
        const data = await response.json();
        
        if (response.ok) {
          setItems(data); // Sätter items i state
        } else {
          console.error('Failed to fetch items:', data.message);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Items</Text>
      {items.length === 0 ? (
        <Text>No items available</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});



