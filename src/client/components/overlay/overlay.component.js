import React from 'react';

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      const transitionType = nextProps.show && 'transition-in' || 'transition-out';
      this.setState({transition: transitionType});
      setTimeout(() => this.setState({transition: false}), 500);
    }
  }

  render() {
    return (
      <div className={`overlay ${this.props.show && 'open' || ''} ${this.state.transition || ''}`}
           onClick={this.onClose}>
        <div className="modal">
          {this.props.children}
          <div className="modal-close text-right">
            <button className="submit" onClick={this.props.close}>Luk</button>
          </div>
        </div>
      </div>
    );
  }
}

Overlay.propTypes = {
  show: React.PropTypes.string,
  children: React.PropTypes.any,
  close: React.PropTypes.func
};
