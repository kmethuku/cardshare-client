import React from 'react';
import { act, cleanup, render, RenderResult, createEvent, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Button } from 'react-bootstrap';
import * as Auth from '../../contexts/AuthContext';
import HeaderButtons from '../../components/headerButtons'


configure({adapter: new Adapter()});
const contextValues = {
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

describe('<HeaderButtons />', () => {
  it('should useContext mock and shallow render a div tag', () => {
    const wrapper = mount(
      <Auth.AuthContext.Provider value={contextValues}>
        <HeaderButtons />
      </Auth.AuthContext.Provider>
    );
    const button = wrapper.find('[data-testid="signout"]').at(0);
    expect(button.prop('onClick')).toEqual(expect.any(Function));
    const handleSignOut = jest.fn();

    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);
  })

})
