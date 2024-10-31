import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Post } from './Post'; 
import postStore from '../../../../store/postsStore'; 

jest.mock('../../../../store/postsStore', () => ({
  deletePostById: jest.fn(),
  updatePostAuthor: jest.fn(),
}));

describe('Post Component', () => {
  const mockPostData = {
    thumbnail: 'https://example.com/image.jpg',
    title: 'Test Post',
    author: 'Test Author',
    id: '1',
  };

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders the post with title and author', () => {
    render(<Post postData={mockPostData} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  test('allows editing of author', () => {
    render(<Post postData={mockPostData} />);

    fireEvent.click(screen.getByText('Test Author'));

    const input = screen.getByDisplayValue('Test Author');
    expect(input).toBeInTheDocument();


    fireEvent.change(input, { target: { value: 'Updated Author' } });

    
    fireEvent.blur(input); 
    expect(postStore.updatePostAuthor).toHaveBeenCalledWith('1', 'Updated Author');
  });

  test('deletes the post when delete button is clicked', () => {
    render(<Post postData={mockPostData} />);

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(postStore.deletePostById).toHaveBeenCalledWith('1');
  });
});