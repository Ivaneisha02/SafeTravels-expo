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
   // Additional Locations

   { id: 4, latitude: 51.5074, longitude: -0.1278, type: 'safety', name: 'London, UK' },
   { id: 5, latitude: 34.0522, longitude: -118.2437, type: 'gender', name: 'Los Angeles, USA' },
   { id: 6, latitude: -33.8688, longitude: 151.2093, type: 'cultural', name: 'Sydney, Australia' },
   { id: 7, latitude: 48.2082, longitude: 16.3738, type: 'safety', name: 'Vienna, Austria' },
   { id: 8, latitude: 39.9042, longitude: 116.4074, type: 'gender', name: 'Beijing, China' },
   { id: 9, latitude: 52.5200, longitude: 13.4050, type: 'cultural', name: 'Berlin, Germany' },
   { id: 10, latitude: 40.7306, longitude: -73.9352, type: 'safety', name: 'Brooklyn, USA' },
   { id: 11, latitude: 55.7558, longitude: 37.6173, type: 'gender', name: 'Moscow, Russia' },
   { id: 12, latitude: 34.0522, longitude: -118.2437, type: 'cultural', name: 'Los Angeles, USA' },
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
          if (details) {
            const { lat, lng } = details.geometry.location;
            setRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 30,
              longitudeDelta: 30,
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
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion} //update region on map drag
      >
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

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { v4 as uuidv4 } from 'uuid';
//
// const API_KEY = "AIzaSyByMPegHzUYz6fnzh8VpJWTKtxjmQsCH4I";
//
// export default function App() {
//   const [region, setRegion] = useState({
//     latitude: 20.0,
//     longitude: 0.0,
//     latitudeDelta: 50,
//     longitudeDelta: 50,
//   });
//   const [selectedCategory, setSelectedCategory] = useState(null); // Category for filters
//   const [markersData, setMarkersData] = useState([
//     { id: 1, latitude: 48.8566, longitude: 2.3522, type: 'safety', name: 'Paris, France' },
//     { id: 2, latitude: 40.7128, longitude: -74.0060, type: 'gender', name: 'New York, USA' },
//     { id: 3, latitude: 35.6895, longitude: 139.6917, type: 'cultural', name: 'Tokyo, Japan' },
//   ]);
//   const [newMarker, setNewMarker] = useState(null);
//
//   const handleAddMarker = (latitude, longitude) => {
//     console.log("Selected Category:", selectedCategory); // Debugging log for selected category
//     console.log("Attempting to add a marker at", latitude, longitude); // Debugging log
//     if (selectedCategory) {
//       const newMarkerData = {
//         id: uuidv4(),
//         latitude,
//         longitude,
//         type: selectedCategory,
//         name: `Custom Marker at ${latitude}, ${longitude}`,
//       };
//       console.log("Adding marker:", newMarkerData); // Debugging log
//       setMarkersData([...markersData, newMarkerData]);
//       setNewMarker(newMarkerData);
//     } else {
//       Alert.alert("Please select a category first.");
//     }
//   };
//
//   const filteredMarkers = selectedCategory
//     ? markersData.filter(marker => marker.type === selectedCategory)
//     : markersData;
//
//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <GooglePlacesAutocomplete
//         placeholder="Search for a destination"
//         fetchDetails={true}
//         onPress={(data, details = null) => {
//           if (details) {
//             const { lat, lng } = details.geometry.location;
//             setRegion({
//               latitude: lat,
//               longitude: lng,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             });
//           }
//         }}
//         query={{
//           key: API_KEY,
//           language: 'en',
//         }}
//         styles={{
//           container: styles.searchContainer,
//           textInput: styles.searchInput,
//         }}
//       />
//
//       {/* Filter Buttons */}
//       <View style={styles.filterContainer}>
//         <Button title="Safety" onPress={() => { setSelectedCategory('safety'); console.log("Category selected: safety"); }} />
//         <Button title="Gender" onPress={() => { setSelectedCategory('gender'); console.log("Category selected: gender"); }} />
//         <Button title="Cultural" onPress={() => { setSelectedCategory('cultural'); console.log("Category selected: cultural"); }} />
//         <Button title="Reset" onPress={() => { setSelectedCategory(null); console.log("Category reset"); }} />
//       </View>
//
//       {/* Map */}
//       <MapView style={styles.map} region={region} onPress={(e) => handleAddMarker(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}>
//         {/* Render Markers Based on Filter */}
//         {filteredMarkers.map(marker => (
//           <Marker
//             key={marker.id}
//             coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
//             pinColor={marker.type === 'safety' ? 'blue' : marker.type === 'gender' ? 'pink' : 'purple'}
//             title={marker.name}
//             description={`Category: ${marker.type}`}
//           />
//         ))}
//
//         {/* Render New Marker */}
//         {newMarker && (
//           <Marker
//             key={newMarker.id}
//             coordinate={{ latitude: newMarker.latitude, longitude: newMarker.longitude }}
//             pinColor={newMarker.type === 'safety' ? 'blue' : newMarker.type === 'gender' ? 'pink' : 'purple'}
//             title={newMarker.name}
//             description={`Category: ${newMarker.type}`}
//           />
//         )}
//       </MapView>
//
//       {/* Marker Info */}
//       {newMarker && (
//         <View style={styles.infoCard}>
//           <Text>{newMarker.name}</Text>
//           <Text>Category: {newMarker.type}</Text>
//         </View>
//       )}
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
//   filterContainer: {
//     position: 'absolute',
//     bottom: 100,
//     left: 10,
//     right: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   searchContainer: {
//     position: 'absolute',
//     top: 40,
//     left: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   searchInput: {
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//   },
//   infoCard: {
//     position: 'absolute',
//     bottom: 150,
//     left: 20,
//     right: 20,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 10,
//   },
// });





