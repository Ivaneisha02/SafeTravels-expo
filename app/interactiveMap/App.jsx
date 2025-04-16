import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, TextInput, Card } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as uuidv4} from 'uuid';

const API_KEY = "AIzaSyByMPegHzUYz6fnzh8VpJWTKtxjmQsCH4I";

const markersData = [
  { id: 1, latitude: 48.8566, longitude: 2.3522, type: 'safety', name: 'Paris, France' },
  { id: 2, latitude: 40.7128, longitude: -74.0060, type: 'gender', name: 'New York, USA' },
  { id: 3, latitude: 35.6895, longitude: 139.6917, type: 'cultural', name: 'Tokyo, Japan' },
];

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [region, setRegion] = useState({
    latitude: 20.0,
    longitude: 0.0,
    latitudeDelta: 50,
    longitudeDelta: 50,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);

  const filteredMarkers = selectedFilter
    ? markersData.filter(marker => marker.type === selectedFilter)
    : markersData;

  const handleReset = () => {
      setSelectedFilter(null);
      setSearchMarker(null); // Clear the search marker when resetting
    };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <GooglePlacesAutocomplete
        placeholder="Search for a destination"
        fetchDetails={true}
        onPress={(data, details = null) => {
          alert('onPress fired');
          console.log('Data:', data);
          console.log('Details:', details);
          if (details) {
            const { lat, lng } = details.geometry.location;
            setRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 5,
              longitudeDelta: 5,
            });
            setSearchMarker({
                latitude: lat,
                longitude: lng,
                name: data.description,
            });
          } else {
              console.warn('No details.');  }
        }}
        query={{
          key: API_KEY,
          language: 'en',
        }}
        styles={{
          container: styles.searchContainer,
          textInput: styles.searchInput,
        }}
      />

      {/* Map */}
      <MapView style={styles.map} region={region}>
        {filteredMarkers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            pinColor={marker.type === 'safety' ? 'blue' :
                      marker.type === 'gender' ? 'pink' : 'purple'}
            onPress={() => setSelectedMarker(marker)}
          />
        ))}

        {/* Render Search Marker */}
        {searchMarker && (
          <Marker
            key={'search-marker'}
            coordinate={{ latitude: searchMarker.latitude, longitude: searchMarker.longitude }}
            pinColor='green'
            title={searchMarker.name || "Searched Location"}
            description="Your search result"
          />
        )}
      </MapView>

      {/* Marker Info */}
      {selectedMarker && (
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.infoText}>{selectedMarker.name}</Text>
            <Text>Type: {selectedMarker.type}</Text>
          </Card.Content>
        </Card>
      )}

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <Button mode="contained" onPress={() => setSelectedFilter('safety')}>Safety</Button>
        <Button mode="contained" onPress={() => setSelectedFilter('gender')}>Gender</Button>
        <Button mode="contained" onPress={() => setSelectedFilter('cultural')}>Cultural</Button>
        <Button mode="contained" onPress={() => setSelectedFilter(null)}>Reset</Button>
        <Button mode="outlined" onPress={() => setSearchMarker(null)}>Clear Search</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  filterContainer: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  infoCard: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

