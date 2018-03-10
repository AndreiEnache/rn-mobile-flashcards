import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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

DeckListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    })).isRequired,
  }),
  onPress: PropTypes.func,
};

DeckListItem.defaultProps = {
  item: {},
};

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
