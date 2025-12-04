import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from '../api/axios';
import Profile from './Profile';

// Mock axios
jest.mock('../api/axios');

describe('Profile component', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    image: 'uploads/profile/test.jpg',
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUser });
    axios.put.mockResolvedValue({ data: { message: 'User updated successfully' } });
  });

  test('renders profile data fetched from the backend', async () => {
    render(<Profile />);

    // Wait for the user data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Name:')).toBeInTheDocument();
      expect(screen.getByText('Email:')).toBeInTheDocument();
      expect(screen.getByText('Phone:')).toBeInTheDocument();
    });

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByAltText('User')).toHaveAttribute('src', `http://localhost:5000/${mockUser.image}`);
  });

  test('allows editing and saving the profile', async () => {
    render(<Profile />);

    // Click the "Edit Profile" button
    fireEvent.click(screen.getByText('Edit Profile'));

    // Check if the input fields are displayed
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();

    // Change the user's name
    fireEvent.change(screen.getByDisplayValue('Test User'), {
      target: { value: 'Updated User' },
    });

    // Click the "Save Profile" button
    fireEvent.click(screen.getByText('Save Profile'));

    // Wait for the PUT request to be sent
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        '/users/1',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    });

    // Check if the component is no longer in editing mode
    expect(screen.queryByDisplayValue('Updated User')).not.toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
  });

  test('handles image change and upload', async () => {
    render(<Profile />);

    // Click the "Edit Profile" button
    fireEvent.click(screen.getByText('Edit Profile'));

    // Simulate choosing a new image file
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const imageInput = screen.getByLabelText('File browser');
    fireEvent.change(imageInput, { target: { files: [file] } });

    // Click the "Save Profile" button
    fireEvent.click(screen.getByText('Save Profile'));

    // Wait for the PUT request to be sent
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        '/users/1',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    });
  });
});
