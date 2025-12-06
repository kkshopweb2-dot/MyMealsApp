import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Profile from './Profile';
import { updateUser } from '../redux/authSlice';
import axios from '../api/axios';

jest.mock('../api/axios');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Profile component with Redux', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    image: 'uploads/profile/test.jpg',
  };

  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: true,
        user: mockUser,
        token: 'fake-token',
      },
    });
    axios.put.mockResolvedValue({ data: { ...mockUser, name: 'Updated User' } });
  });

  test('allows editing and saving the profile, dispatching the updateUser action', async () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    fireEvent.click(screen.getByText('Edit Profile'));

    fireEvent.change(screen.getByDisplayValue('Test User'), {
      target: { value: 'Updated User' },
    });

    fireEvent.click(screen.getByText('Save Profile'));

    await waitFor(() => {
      const actions = store.getActions();
      const updateUserAction = actions.find(action => action.type === updateUser.type);
      expect(updateUserAction).toBeDefined();
      expect(updateUserAction.payload.name).toBe('Updated User');
    });
  });
});
