import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const fetchAddress = () => {
    fetch("http://www.mapquestapi.com/geocoding/v1/address?key=Th641oY1JqBxhPmRAjeQ5Kj2jCtEntWA&inFormat=kvp&outFormat=json&location="+address)
    .then(response => response.json())
    .then(data => {
      const latLng = data.results[0].locations[0].latLng;
      setLocation({latitude: latLng.lat, longitude: latLng.lng});
    })
    .catch(error => { 
      Alert.alert("Error", error);
    });
  } 

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1, minWidth: 400, height: 650}} region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}>
    <Marker coordinate={{
      latitude: location.latitude,
      longitude: location.longitude,
      }} />
  </MapView>
      
      <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}} placeholder="Address" onChangeText={setAddress}  value={address} />
      <Button title="Show" onPress={fetchAddress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
