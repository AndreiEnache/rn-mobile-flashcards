import * as TYPES from '../types';
import * as api from '../utils/api';

const addDeckRequest = () => ({
  type: TYPES.ADD_DECK_REQUEST,
});
const addDeckSuccess = title => ({
  type: TYPES.ADD_DECK_SUCCESS,
  title,
});
export const addDeck = title => async (dispatch) => {
  dispatch(addDeckRequest());
  await api.addDeck(title);
  dispatch(addDeckSuccess(title));
};
export const addQuestion = (title, question) => async (dispatch) => {
  dispatch(addQuestionRequest());
  console.log(title);
  console.log(question);
  await api.addQuestionToDeck(title, question);
  dispatch(addQuestionSuccess(title, question));
};
const addQuestionRequest = () => ({
  type: TYPES.ADD_QUESTION_REQUEST,
});

const addQuestionSuccess = (title, question) => ({
  type: TYPES.ADD_QUESTION_SUCCESS,
  title,
  question,
});

const receiveDecksRequest = () => ({
  type: TYPES.RECEIVE_DECKS_REQUEST,
});

const receiveDecksSuccess = decks => ({
  type: TYPES.RECEIVE_DECKS_SUCCESS,
  decks,
});

export const receiveDecks = () => async (dispatch) => {
  dispatch(receiveDecksRequest());
  const response = await api.getDecks();
  dispatch(receiveDecksSuccess(response));
};
