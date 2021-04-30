import ICard from './ICard'

export default interface Deck {
  title: string,
  description: string,
  src?: string,
  cards: ICard[],
  genre: string,
  OLID: string,
  creator: string,
}