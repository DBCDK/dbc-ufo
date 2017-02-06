import React from 'react';

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
  }

  onOpen() {

  }

  onClose() {

  }

  render() {
    return (
      <div className={`overlay ${this.props.open && 'open'}`} onClick={this.onClose}>
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
  open: React.PropTypes.string,
  children: React.PropTypes.any,
  close: React.PropTypes.func
};
