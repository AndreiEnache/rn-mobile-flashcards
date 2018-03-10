import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { getDeck } from '../reducers';
import Button from './General/Button';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { green, red, white } from '../utils/colors';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    side: 'question',
    correct: 0,
    animatedVal: new Animated.Value(0),
  };
  componentWillMount() {
    this.value = 0;
    this.state.animatedVal.addListener(({ value }) => {
      this.value = value;
    });
  }

  handleMark = wasCorrect => () => {
    this.setState(
      ({ correct, questionIndex }) => ({
        correct: wasCorrect ? correct + 1 : correct,
        questionIndex: questionIndex + 1,
        side: 'question',
      }),
      () => {
        if (this.state.questionIndex === this.props.deck.questions.length) {
          clearLocalNotification().then(setLocalNotification);
        }
        Animated.spring(this.state.animatedVal, {
          toValue: 0,
          tension: 10,
          friction: 8,
        }).start();
      },
    );
  };
  handleFlip = () => {
    this.setState(({ side }) => ({
      side: side === 'question' ? 'answer' : 'question',
    }));
    if (this.value >= 90) {
      Animated.spring(this.state.animatedVal, {
        toValue: 0,
        tension: 10,
        friction: 8,
      }).start();
    } else {
      Animated.spring(this.state.animatedVal, {
        toValue: 180,
        tension: 10,
        friction: 8,
      }).start();
    }
  };
  render() {
    const { deck } = this.props;
    const { questionIndex, side, correct } = this.state;
    const frontAnimatedStyle = {
      opacity: this.state.animatedVal.interpolate({
        inputRange: [89, 90],
        outputRange: [1, 0],
      }),
      transform: [
        {
          rotateX: this.state.animatedVal.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };
    const backAnimatedStyle = {
      opacity: this.state.animatedVal.interpolate({
        inputRange: [89, 90],
        outputRange: [0, 1],
      }),
      transform: [
        {
          rotateX: this.state.animatedVal.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    };
    if (questionIndex === deck.questions.length) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Your score was {`${correct}/${deck.questions.length}`}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.questionIndex}>{`${questionIndex + 1}/${deck.questions.length}`}</Text>
        <View style={styles.container}>
          <View style={styles.flipCard}>
            <Animated.View style={[styles.textContainer, frontAnimatedStyle]}>
              <Text style={styles.title}>{deck.questions[questionIndex].question}</Text>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.textContainer, styles.flipCardBack]}>
              <Text style={styles.title}>{deck.questions[questionIndex].answer}</Text>
            </Animated.View>
          </View>
          <TouchableOpacity onPress={this.handleFlip}>
            <Text style={styles.cardNo}>{side === 'question' ? 'Answer' : 'Question'}</Text>
          </TouchableOpacity>
          <View style={styles.buttons}>
            <Button
              text="Correct"
              style={{ backgroundColor: green, marginBottom: 10 }}
              onPress={this.handleMark(true)}
            />
            <Button
              text="Incorrect"
              style={{ backgroundColor: red }}
              onPress={this.handleMark(false)}
            />
          </View>
        </View>
      </View>
    );
  }
}

Quiz.propTypes = {
  deck: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textContainer: {
    backfaceVisibility: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: white,
    borderRadius: 7,
    height: 300,
    width: 300,
  },
  flipCardBack: {
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 25,
    margin: 15,
  },
  buttons: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  questionIndex: {
    fontSize: 20,
    marginLeft: 15,
    marginTop: 15,
  },
  cardNo: {
    color: red,
  },
});

const mapStateToProps = (state, ownProps) => ({
  deck: getDeck(state)(ownProps.navigation.state.params.title),
});

export default connect(mapStateToProps, {})(Quiz);
