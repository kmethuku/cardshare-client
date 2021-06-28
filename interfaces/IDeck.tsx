import ICard, { defaultCard } from './ICard';

export default interface IDeck {
  _id?: string,
  title: string,
  description: string,
  src?: string,
  cards: ICard[],
  genre: string,
  OLID: string,
  creator: string,
  votes: number,
}

export const defaultDeck = {
  title: '',
  description: '',
  src: '',
  genre: '',
  OLID: '',
  cards: [defaultCard],
  creator: '',
  votes: 0,
};