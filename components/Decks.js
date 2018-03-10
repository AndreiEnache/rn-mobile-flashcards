import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import DeckListItem from './DeckListItem';
import * as api from '../utils/api';
import { getDecks } from '../reducers';

class Decks extends React.Component {
  async componentDidMount() {
    await this.props.receiveDecks();
  }
  handleNavigateToDeck = item => () => {
    this.props.navigation.navigate('SelectedDeck', { title: item.title });
  };
  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <DeckListItem item={item} onPress={this.handleNavigateToDeck} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  decks: getDecks(state),
});

export default connect(mapStateToProps, { receiveDecks })(Decks);
