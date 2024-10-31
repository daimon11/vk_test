import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, LIST } from './Tabs'; 
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Tabs Component', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => navigate);
    render(
      <BrowserRouter>
        <Tabs />
      </BrowserRouter>
    );
  });

  test('renders the tabs', () => {
    LIST.forEach(tab => {
      expect(screen.getByText(tab.value)).toBeInTheDocument();
    });
  });

  test('toggles dropdown on button click', () => {
    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button); 

    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('navigates to the correct link when a tab is clicked', () => {
    const tabButton = screen.getByText('Топ');
    fireEvent.click(tabButton); 

    expect(navigate).toHaveBeenCalledWith('/category/top'); 
  });

  test('shows active page when a tab is clicked', () => {
    const tabButton = screen.getByText('Лучшие'); 
    fireEvent.click(tabButton); 

    expect(screen.getByRole('button', { name: 'Лучшие' })).toBeInTheDocument();
  });
});