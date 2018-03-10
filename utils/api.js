import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'MobileFlashcards:StorageKey';

export const addDeck = title =>
  AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    }),
  );

export const addQuestionToDeck = async (title, { question, answer }) => {
  const deck = await getDeck(title);
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [...deck.questions, { question, answer }],
      },
    }),
  );
};

export const getDeck = title =>
  AsyncStorage.getItem(STORAGE_KEY)
    .then(res => JSON.parse(res))
    .then(decks => decks[title]);

export const getDecks = () =>
  AsyncStorage.getItem(STORAGE_KEY)
    .then(res => JSON.parse(res))
    .then(decks =>
      (decks
        ? Object.keys(decks).map(title => ({
          title,
          questions: decks[title].questions,
        }))
        : []));

export const clearStorage = () => AsyncStorage.removeItem(STORAGE_KEY);
