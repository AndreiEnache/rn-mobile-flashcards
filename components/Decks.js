import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import DeckListItem from './DeckListItem';
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

Decks.propTypes = {
  receiveDecks: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  decks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

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
