import IDeck from './IDeck';

export default interface IUser {
  username: string,
  email: string,
  myDecks?: IDeck[],
  savedDecks?: IDeck[],
}