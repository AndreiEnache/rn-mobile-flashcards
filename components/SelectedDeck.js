import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getDeck } from '../reducers';
import Button from './General/Button';
import { white, gray } from '../utils/colors';

class SelectedDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title,
    };
  };

  handleAddCard = () => {
    this.props.navigation.navigate('AddCard', { title: this.props.deck.title });
  };

  handleStartQuiz = () => {
    if (this.props.deck.questions.length === 0) {
      alert("This quiz doesn't have any questions. Please add some questions first");
    } else {
      this.props.navigation.navigate('Quiz', { title: this.props.deck.title });
    }
  };

  render() {
    const { deck } = this.props;
    if (!deck) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardNo}>
            {deck.questions && deck.questions.length}{' '}
            {deck.questions && deck.questions.length === 1 ? 'card' : 'cards'}
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            text="Add Card"
            style={{ backgroundColor: white, marginBottom: 10 }}
            onPress={this.handleAddCard}
          />
          <Button text="Start Quiz" onPress={this.handleStartQuiz} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 40,
    marginBottom: 2,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
  },
  cardNo: {
    color: gray,
  },
});

SelectedDeck.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  deck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  deck: getDeck(state)(ownProps.navigation.state.params.title),
});

export default connect(mapStateToProps)(SelectedDeck);
