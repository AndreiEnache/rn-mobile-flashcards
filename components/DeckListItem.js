import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { gray, black } from '../utils/colors';

const DeckListItem = ({ item, onPress }) => (
  <TouchableOpacity key={item.title} onPress={onPress(item)}>
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.cardNo}>
          {item.questions && item.questions.length}{' '}
          {item.questions && item.questions.length === 1 ? 'card' : 'cards'}
        </Text>
      </View>
      <View style={styles.hr} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: 85,
  },
  deckName: {},
  cardNo: {
    color: gray,
  },
  hr: {
    borderBottomColor: black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
  textContainer: {
    alignItems: 'center',
  },
});

export default DeckListItem;

{
  /* <Card title={item.name}>
    <View>
      <Text>Number of cards: {item.cards}</Text>
      <Button text="Add more cards" />
      <Button text="Play" />
    </View>

  </Card> */
}
