import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock Tauri API
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the welcome heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Welcome to Tauri + React'
    );
  });

  it('renders all three logo links', () => {
    render(<App />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    
    expect(links[0]).toHaveAttribute('href', 'https://vite.dev');
    expect(links[1]).toHaveAttribute('href', 'https://tauri.app');
    expect(links[2]).toHaveAttribute('href', 'https://react.dev');
  });

  it('renders logo images with correct alt text', () => {
    render(<App />);
    
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
    expect(screen.getByAltText('Tauri logo')).toBeInTheDocument();
    expect(screen.getByAltText('React logo')).toBeInTheDocument();
  });

  it('renders an input field with placeholder text', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter a name...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'greet-input');
  });

  it('renders a greet button', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /greet/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('Enter a name...');
    await user.type(input, 'John');
    
    expect(input).toHaveValue('John');
  });

  it('calls greet function with correct name when form is submitted', async () => {
    const { invoke } = await import('@tauri-apps/api/core');
    vi.mocked(invoke).mockResolvedValue('Hello, John!');
    
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('Enter a name...');
    const button = screen.getByRole('button', { name: /greet/i });
    
    await user.type(input, 'John');
    await user.click(button);
    
    expect(invoke).toHaveBeenCalledWith('greet', { name: 'John' });
  });

  it('displays greeting message after successful greet', async () => {
    const { invoke } = await import('@tauri-apps/api/core');
    vi.mocked(invoke).mockResolvedValue('Hello, John!');
    
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('Enter a name...');
    const button = screen.getByRole('button', { name: /greet/i });
    
    await user.type(input, 'John');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Hello, John!')).toBeInTheDocument();
    });
  });

  it('prevents default form submission behavior', () => {
    render(<App />);
    const form = screen.getByRole('button', { name: /greet/i }).closest('form')!;
    
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');
    
    fireEvent(form, submitEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('initially shows empty greeting message', () => {
    render(<App />);
    const paragraphs = screen.getAllByRole('paragraph');
    const greetingParagraph = paragraphs[paragraphs.length - 1];
    expect(greetingParagraph).toHaveTextContent('');
  });

  it('handles empty name input', async () => {
    const { invoke } = await import('@tauri-apps/api/core');
    vi.mocked(invoke).mockResolvedValue('Hello, !');
    
    const user = userEvent.setup();
    render(<App />);
    
    const button = screen.getByRole('button', { name: /greet/i });
    await user.click(button);
    
    expect(invoke).toHaveBeenCalledWith('greet', { name: '' });
  });
});
