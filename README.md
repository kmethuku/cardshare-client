This is the client repo. Server repo is here: https://github.com/kmethuku/cardshare-server

## Cardshare

## Project Info

**Cardshare** is a flashcard hub for books outside of the formal education context, made for lifelong learners.

Cardshare was **written in 6 days**, and later converted to Typescript and tested (see **Contributors** for more information).

Users can: 
  * Create flashcard decks
  * Search for available decks by book
  * Save decks and study them using the flashcards interface
  * Export decks as a csv file to use with their favorite flashcard app
  * Vote on decks

## Getting Started

Clone this repo as well as the server repo, located here: https://github.com/kmethuku/cardshare-server

Run npm i to install the required dependencies.

In the server repo, follow the instructions in the .env.sample file FIRST, and then start the backend server by typing npm run dev in the terminal.

In the client repo, follow the instructions in the .env.sample file FIRST, and then start the frontend server by typing npm run dev in the terminal.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

Front End: React with NextJS, Google Books API

Bank End: Express, MongoDB with Mongoose

Testing (thank you Kimberly Innes (https://github.com/kjinnes) and Louisa Wong (https://github.com/louisawong)!): React Testing Library, Jest, Supertest

## Contributors

Owner/Creator: Kiranmayi Methuku

Contributors: Kimberly Innes (https://github.com/kjinnes) and Louisa Wong (https://github.com/louisawong)
  * Linting
  * Conversion to Typescript
  * Integration testing
  * Refactoring from Bootstrap to raw CSS
  * Rearrange page/component structure
  * Changing books API from Open Library to Google Books
