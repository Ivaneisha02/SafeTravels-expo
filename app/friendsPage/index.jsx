import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import FriendsList from './list';
import FriendsFeed from './feed';

export default function FriendsScreen() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveTab('list')} style={[styles.tab, activeTab === 'list' && styles.activeTab]}>
          <Text style={styles.tabText}>Friends List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('feed')} style={[styles.tab, activeTab === 'feed' && styles.activeTab]}>
          <Text style={styles.tabText}>Friends Feed</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {activeTab === 'list' ? <FriendsList /> : <FriendsFeed />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#f2f2f2' },
  tab: { padding: 10 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#007bff' },
  tabText: { fontSize: 16 },
});
