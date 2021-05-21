import React from 'react';
import SignupOrLoginForm from '../components/signupOrLoginForm'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

jest.mock('../services/internalApi.tsx', () => ({
  signUpService: () => ({username: 'testusername', email: 'test@email.com'})
}));

it('should call signupservice with correct credentials', async () => {
  const setUser = jest.fn();
  const credentials = {username: 'testusername', email: 'test@email.com'}

  render(<SignupOrLoginForm />);

  const emailInput = screen.getByPlaceholderText(/jack@example.com/)
  console.log(emailInput)
})