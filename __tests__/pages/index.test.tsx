import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import * as Auth from '../../contexts/AuthContext';
import Home from '../../pages/index';
import mocks from '../mocks'
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'

jest.mock('../../services/internalApi.tsx', () => ({
  getDeckByEmailService: async () => (mocks.testDeckArray),
  deleteDeckByIdService: async () => (Promise.resolve(true)),
  signUpService: async () => (Promise.resolve(true))
}))

let container: any;

describe('<Index />', () => {
  beforeEach(() => {
    act(() => {
      const { container } = render(
      <Auth.AuthContext.Provider value={mocks.contextValues}>
        <Home />
      </Auth.AuthContext.Provider>)
    })
  })

  afterEach(cleanup)

  it('should load the main page with the welcome text', async () => {

    await waitFor(() => {
      const welcome = screen.getByText(/Welcome to Cardshare/)
      expect(welcome).toBeTruthy();
    })

  })

  it('should call sign up service with the correct credentials', async () => {
    const credientials = { username: mocks.testUser.username, email: mocks.testUser.email }
    const handleSignUp = jest.fn()

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText(/jack@example.com/)
      const usernameInput = screen.getByPlaceholderText(/jack1234/)
      const submitBtn = screen.getByRole('button', { name: /signup/ })
      expect(emailInput).toBeTruthy()
      expect(usernameInput).toBeTruthy();
      expect(submitBtn).toHaveDisplayValue(/Sign Up/);
      userEvent.click(submitBtn)
      expect(handleSignUp).toHaveBeenCalled();

    })

  })

})