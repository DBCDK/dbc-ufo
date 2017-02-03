import React from 'react';

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="header">
        <a href="/"><span className="logo"/></a>
        <div className="text-right right">
          {this.props.authenticated && <a className="logout" id='logout-btn' href="/logout">Log ud</a>}
          <a href="/help" target="_blank"><span className="icon icon-inline help" /></a>
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  authenticated: React.PropTypes.bool.isRequired
};
