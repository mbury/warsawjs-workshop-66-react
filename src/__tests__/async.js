import * as React from 'react';
import axios from 'axios';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';

afterEach(cleanup);

describe('Status component', () => {
  test.todo('should display online status after mount');

  test.todo('should display offline status after refresh');

  test.todo('should call axios with user in url');
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
