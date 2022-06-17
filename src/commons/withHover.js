import React, { createRef } from 'react';

const withHover = (Component) => {
  return class Hover extends React.Component {
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
      return (
        <Component
          {...this.props}
          hoverRef={this.myRef}
          isHovered={this.state.hovering}
        />
      );
    }
  };
};

export default withHover;
