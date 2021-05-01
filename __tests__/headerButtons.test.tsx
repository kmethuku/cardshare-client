import React from 'react';
import { act, cleanup, render, RenderResult, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import '@testing-library/dom';

import HeaderButtons from '../components/headerButtons'

describe('<HeaderButtons />', () => {
  it('should display a navbar with a sign out button', async () => {
    const test = render(<HeaderButtons />)
    console.log(test.find);

    // expect(getByTestId('signout')).toBe(true);

    // act(() => {
    //   fireEvent.click(button);
    // })

    // expect().toBeInTheDocument();
    // const title = await screen.getByTestId('test')
    // console.log(title)
    // await waitFor(() => {
    //   console.log(testing.getByTestId('test'))
    // })
  })

  // it('should have a list of nav links', () => {
  //   expect(screen.findByText('Discover')).toHaveClass('nav-link')
  // })
})
