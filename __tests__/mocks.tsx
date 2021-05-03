// CARDS
export const testCard = {
  question: 'Are you a test card?',
  answer: 'Yes.'
}

export const testCardArray = [
  {
    question: 'Are you the first test card?',
    answer: 'Yes.'
  },
  {
    question: 'Are you the first test card?',
    answer: 'No.'
  },
  {
    question: 'Are you the third test card?',
    answer: 'Yes.'
  }
]


// DECKS
export const testDeck = {
  title: 'Test Deck',
  description: 'A deck for testing',
  src: 'imagesrc',
  cards: testCardArray,
  genre: 'self-growth',
  OLID: 'OLIDtest',
  votes: 12,
  creator: 'Me'
}

export const testDeckArray = [
  {
    _id: 1,
    title: 'Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'history',
    OLID: 'OLID1',
    votes: 12,
    creator: 'Me'
  },
  {
    _id: 2,
    title: 'Second Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'self-growth',
    OLID: 'OLID2',
    votes: 2,
    creator: 'Me'
  },
  {
    _id: 3,
    title: 'Third Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'self-growth',
    OLID: 'OLID3',
    votes: 15,
    creator: 'Me'
  }
]

export const testUnpopularDeckArray = [
  {
    _id: 4,
    title: 'First Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'history',
    OLID: 'OLIDunpopular1',
    votes: 9,
    creator: 'Me'
  },
  {
    _id: 5,
    title: 'Second Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'self-growth',
    OLID: 'OLIDunpopular2',
    votes: 5,
    creator: 'Me'
  }
]

export const testPopularDeckArray = [
  {
    _id: 6,
    title: 'First Popular Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'history',
    OLID: 'OLIDpopular1',
    votes: 10,
    creator: 'Me'
  },
  {
    _id: 7,
    title: 'Second Popular Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'self-growth',
    OLID: 'OLIDpopular2',
    votes: 20,
    creator: 'Me'
  }
]

export const testHistoryDeckArray = [
  {
    _id: 8,
    title: 'First Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'history',
    OLID: 'OLIDhistory',
    votes: 8,
    creator: 'Me'
  },
]

export const testSelfGrowthDeckArray = [
  {
    _id: 9,
    title: 'First Test Deck',
    description: 'A deck for testing',
    src: 'imagesrc',
    cards: testCardArray,
    genre: 'self-growth',
    OLID: 'OLIDselfgrowth',
    votes: 8,
    creator: 'Me'
  },
]

export const resultDeck =  {
    _id: 10,
    creator: "Me",
    description: "A deck for testing",
    genre: "TestFiction",
    src: "imagesrc",
    title: "Test Deck",
    votes: 12,
  }

// USERS
export const testUser = {
  username: 'testUser',
  email: 'test@user.com',
  myDecks: [],
  savedDecks: [],
}

export const testUserArray = [
  {
    username: 'testUserOne',
    email: 'test@userone.com',
    myDecks: [],
    savedDecks: [],
  },
  {
    username: 'testUserTwo',
    email: 'test@usertwo.com',
    myDecks: testDeckArray,
    savedDecks: [],
  },
  {
    username: 'testUserThree',
    email: 'test@userthree.com',
    myDecks: testUnpopularDeckArray,
    savedDecks: testPopularDeckArray,
  },
  {
    username: 'testUserFour',
    email: 'test@userfour.com',
    myDecks: testPopularDeckArray,
    savedDecks: [],
  },
  {
    username: 'testUserFive',
    email: 'test@userfive.com',
    myDecks: testHistoryDeckArray,
    savedDecks: [],
  },
  {
    username: 'testUserSix',
    email: 'test@usersix.com',
    myDecks: testSelfGrowthDeckArray,
    savedDecks: [],
  }
]

export const discoverUserArrayResult = ['testUserTwo', 'testUserFour'];
export const discoverHistoryArrayResult = ['testUserTwo', 'testUserThree', 'testUserFour', 'testUserFive'];
export const discoverSelfGrowthArrayResult = ['testUserTwo', 'testUserThree', 'testUserFour', 'testUserSix'];


export const contextValues = {
  signOut: jest.fn(),
  currentUser: { uid: 'string', email: 'string' },
  setCurrentUser: jest.fn(),
  username: 'test',
  setUsername: jest.fn(),
  email: 'test@test.com',
  setEmail: jest.fn(),
  signUp: jest.fn(),
  logIn: jest.fn(),
};


const mocks = { testUser, testUserArray, testCard, testCardArray, testDeck, testDeckArray, resultDeck, discoverUserArrayResult, discoverHistoryArrayResult, discoverSelfGrowthArrayResult, contextValues}

export default mocks;
