import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const PostDetailScreen = () => {
  const route = useRoute();
  const { uri, caption } = route.params || {};

  const [comment, setComment] = useState('');

  const defaultCaption = (
    <>
      <Text style={styles.paragraph}>
        When I first landed in Marrakesh, I’ll admit — I was both excited and a little nervous. As a solo female traveler, I had done my research, packed a scarf or two, and kept an open mind. What I didn’t expect was just how colorful, chaotic, and magical this place would be. Marrakesh is alive — and as I quickly learned, there’s no better way to experience it than head-on.
      </Text>

      <Text style={styles.paragraph}>
        Here are the 12 best things I did in Marrakesh, and what I’d recommend to any woman traveling alone:
      </Text>

      {[
        ['1. Got lost (on purpose) in the Medina', 'The Medina is overwhelming in the best way. I started exploring early in the morning, when the crowds were still sleepy and the air cooler. I stuck to the main souks at first, but eventually let myself wander — maps off, curiosity on.'],
        ['2. Haggled (gently) at Souk Semmarine', "I'm not a born bargainer, but shopping here was half theater, half adventure. The key? Be friendly, smile, and don't be afraid to walk away. I left with a gorgeous handwoven scarf and a surprising boost in confidence."],
        ['3. Treated myself to a women-only hammam', "Walking into Les Bains de l'Alhambra felt intimidating, but after a steamy scrub, I walked out glowing — and feeling more connected to the culture than I expected. Self-care, Moroccan style."],
        ['4. Watched the world from a rooftop with mint tea', "Café des Épices became my happy place. I’d sit there with my journal and a glass of mint tea, watching the buzz below and feeling completely at peace — even in a city that never stops moving."],
        ['5. Learned to cook a proper tagine', "I joined a cooking class with a local woman named Amina, and we bonded instantly. There’s something really grounding about chopping herbs, grinding spices, and laughing with someone who reminds you of home — even when you’re across the world."],
        ['6. Visited Jardin Majorelle for a quiet reset', "After the Medina, this place felt like a dream. Blue walls, fountains, cacti — I wandered for hours. It’s solo-girl sanctuary vibes."],
        ['7. Took a day trip to the Atlas Mountains', "With a small group tour, I hiked through Berber villages and ate lunch with a family in their home. It reminded me how generous people can be when you show up with an open heart."],
        ['8. Kept my outfits modest but still me', "I wore loose dresses, light scarves, and oversized sunglasses — and felt both respectful and stylish. Marrakesh fashion is next level, and I totally leaned into it."],
        ['9. Said “no, thank you” like a pro', "Street vendors, tour offers, unsolicited help — I learned quickly that a firm but kind “no, thank you” (with a smile) works wonders."],
        ['10. Had quiet moments in Koutoubia Gardens', "While others crowded near the mosque, I found a quiet bench in the garden nearby. I watched the locals pass by, kids playing soccer, birds swooping through the roses — it was grounding in the best way."],
        ['11. Ate every pastry I could find', "From honey-drenched chebakia to almond briouats, I lived my best pastry life. Solo travel bonus: I didn’t have to share."],
        ['12. Trusted my gut, always', "Whether it was choosing a taxi, picking a tour, or turning down a narrow alley — I listened to that quiet inner voice. And every time I did, I felt safer and stronger."]
      ].map(([title, text], index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={styles.bold}>{title}</Text>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
      ))}

      <Text style={styles.paragraph}>
        Marrakesh isn’t always easy — but that’s what made it unforgettable. As a solo woman, I left more aware, more inspired, and honestly, more in love with the world.
      </Text>
      <Text style={styles.paragraph}>
        If you're thinking about going: do it. Go boldly. Go kindly. And bring extra room in your suitcase — for the scarves and the stories.
      </Text>
    </>
  );

  return (
    <ScrollView style={styles.container}>
      {uri ? (
        <Image
          source={{ uri }}
          style={styles.postImage}
          resizeMode="contain"
        />
      ) : (
        <View style={[styles.postImage, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#999' }}>No image provided</Text>
        </View>
      )}

      <View style={styles.captionSection}>
        {caption ? (
          <Text style={styles.captionText}>{caption}</Text>
        ) : (
          defaultCaption
        )}
      </View>

      <View style={styles.commentSection}>
        <TextInput
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
          style={styles.commentInput}
        />
        <TouchableOpacity style={styles.postButton}>
          <Text style={{ color: 'white' }}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: '#f4f4f4',
  },
  captionSection: {
    padding: 16,
  },
  captionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
    color: '#222',
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    lineHeight: 20,
  },
  commentSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 8,
  },
  postButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});

export default PostDetailScreen;