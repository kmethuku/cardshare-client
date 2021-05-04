import ICard from './ICard'

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