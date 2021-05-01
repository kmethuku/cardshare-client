import React, { createContext, Provider } from 'react';
import { act, cleanup, render, RenderResult, createEvent, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import { AuthProvider } from './mocks';
import { mount, configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Button } from 'react-bootstrap';

configure({adapter: new Adapter()});

import HeaderButtons from '../components/headerButtons'

const AuthContext = createContext({
  signOut: jest.fn(),
});

describe('<HeaderButtons />', () => {
  it('should display a navbar with a sign out button', async () => {
    const test = render(
      <AuthProvider>
        <HeaderButtons />
      </AuthProvider>
    )
    const button = test.getByTestId('signout');
    console.log()

    const handleSignOut = jest.fn();
    const myEvent = createEvent.click(button, handleSignOut)
    fireEvent.click(button, myEvent);
    expect(handleSignOut).toHaveBeenCalledTimes(1);

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

  // it('should call HandleSignOut when sign out button is clicked', () => {
  //   const wrapper = mount(
  //     <AuthProvider>
  //       <HeaderButtons />
  //     </AuthProvider>
  //   );

  //   const instance: any = wrapper.instance();

  //   const button = wrapper.find('#signout');
  //   button.simulate('click')

  //   expect((instance as any).handleSignOut).toHaveBeenCalled();

  // })

  // it('should have a list of nav links', () => {
  //   expect(screen.findByText('Discover')).toHaveClass('nav-link')
  // })
})
