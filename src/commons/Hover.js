import React, { createRef } from 'react';

class Hover extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }
  state = { hovering: false };

  handleMouseOver = () => this.setState({ hovering: true });
  handleMouseOut = () => this.setState({ hovering: false });

  componentDidMount() {
    const node = this.myRef.current;
    if (node) {
      node.addEventListener('mouseover', this.handleMouseOver);
      node.addEventListener('mouseout', this.handleMouseOut);
    }
  }

  componentWillUnmount() {
    const node = this.myRef.current;
    node.removeEventListener('mouseover', this.handleMouseOver);
    node.removeEventListener('mouseout', this.handleMouseOut);
  }

  render() {
    return this.props.children(this.myRef, this.state.hovering);
  }
}

export default Hover;
