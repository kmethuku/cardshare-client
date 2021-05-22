This is the client repo. Server repo is here: https://github.com/kmethuku/cardshare-server

## Cardshare

## Project Info

**Cardshare** is a flashcard hub for books outside of the formal education context, made for lifelong learners.

Cardshare was written in 6 days, and later converted to Typescript and tested (see **Contributors** for more information).

Users can: 
  * Create flashcard decks
  * Search for available decks by book
  * Save decks and study them using the flashcards interface
  * Export decks as a csv file to use with their favorite flashcard app
  * Vote on decks

[Screenshots go here]

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run npm i to install the required dependencies.

Then, run the development server:

npm run dev
---OR---
yarn dev

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
  * Refactoring pages to a more modular structure
  * Changing books API from Open Library to Google Books
