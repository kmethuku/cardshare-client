import React from 'react';
import ReactDOM from 'react-dom';
import { screen, cleanup, waitFor } from '@testing-library/react';
import * as Auth from '../../contexts/AuthContext';
import Create from '../../pages/create'
import mocks from '../mocks'
import { act } from 'react-dom/test-utils';

jest.mock('../../services/internalApi.tsx', () => ({
  getDeckByEmailService: async () => (mocks.testDeckArray),
  deleteDeckByIdService: async () => (Promise.resolve(true)),
}))

// jest.doMock('../../services/internalApi.tsx', () => {
//   return {
//     __esModule: true,
//     getDeckByEmailService: async () => (mocks.testDeckArray),
//     deleteDeckByIdService: async () => (Promise.resolve(true)),
//   }
// })

let container: any;

describe('<Create />', () => {
  beforeEach(() => {
    jest.resetModules()
    container = document.createElement('div')
    document.body.appendChild(container);
  })

  afterEach(cleanup);

  it('should load the create page and the auth provider', async () => {

    act(() => {
      ReactDOM.render(
      <Auth.AuthContext.Provider value={mocks.contextValues}>
        <Create />
      </Auth.AuthContext.Provider>, container
    )})

    await waitFor(() => {
      const createDeck = screen.getByText('Create a New Deck')
      expect(createDeck).toBeTruthy();
    })
  })

  it('should load the deck list if a deck is provided', async () => {
    act(() => {
      ReactDOM.render(
        <Auth.AuthContext.Provider value={mocks.contextValues}>
        <Create />
      </Auth.AuthContext.Provider>, container
      )
    })

    await waitFor(() => {
      const deckList = screen.getAllByRole('img');
      expect(deckList.length).toBe(mocks.testDeckArray.length);
    })
  })

  it('should load no deck list is no deck is provided', async () => {
    act(() => {
      ReactDOM.render(
        <Auth.AuthContext.Provider value={mocks.contextValues}>
        <Create />
      </Auth.AuthContext.Provider>, container
      )
    })

    await waitFor(() => {
      const deckList = screen.queryAllByRole('img');
      expect(deckList).toBeNull();
    })
  })
})