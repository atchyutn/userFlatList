import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const uri = "https://reqres.in/api/users?page=1"

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data.data}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            padding: 10,
            paddingTop: Constants.statusBarHeight+30 || 42
          }}
          renderItem={({ item, index }) => {
            return <View style={{
              flexDirection: 'row',
              marginBottom: 25,
              padding: 10,
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderRadius: 50
              
            }}>
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                  borderWidth: 2,
                  borderColor: 'gray',
                  marginRight: 30
                }}
              />
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.first_name + ' ' + item.last_name}</Text>
                <Text style={{fontSize: 15, color: 'blue'}}>{item.email}</Text>
              </View>
            </View>
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EBEDEF',
  },
});
