import React from 'react';
import axios from 'axios';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';

jest.mock('axios', () => ({ get: jest.fn() }));

afterEach(cleanup);

beforeEach(() => {
  axios.get.mockClear();
});

describe('Status component', () => {
  test('should display online status after mount', async () => {
    axios.get.mockResolvedValueOnce({ data: { status: 'online' } });
    render(<Status user="warsawJS" />);

    const statusNode = await screen.findByText(/online/i);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(statusNode).toHaveTextContent('online');
  });

  test('should display offline status after refresh', async () => {
    axios.get.mockResolvedValueOnce({ data: { status: 'online' } });
    render(<Status user="warsawJS" />);
    await screen.findByText(/online/i);
    axios.get.mockResolvedValueOnce({ data: { status: 'offline' } });

    fireEvent.click(screen.getByText(/odśwież/i));
    const statusNode = await screen.findByText(/offline/i);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(statusNode).toHaveTextContent('offline');
  });

  test('should call axios with user in url', async () => {
    axios.get.mockResolvedValueOnce({ data: { status: 'online' } });
    render(<Status user="warsawJS" />);

    await screen.findByText(/online/i);

    const url = 'http://api.acme.com/status/warsawJS';
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});

class Status extends React.Component {
  state = { status: '', isLoading: false };

  componentDidMount() {
    this.checkStatus();
  }

  checkStatus = async () => {
    this.setState({ isLoading: true });
    const url = `http://api.acme.com/status/${this.props.user}`;
    try {
      const response = await axios.get(url);
      this.setState({ status: response.data.status, isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ status: 'offline', isLoading: false });
    }
  };

  render() {
    const { status, isLoading } = this.state;
    return (
      <div>
        <button onClick={this.checkStatus}>Odśwież</button>
        {isLoading ? <span>loading...</span> : <span>{status}</span>}
      </div>
    );
  }
}
