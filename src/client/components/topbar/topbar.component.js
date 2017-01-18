import React from 'react';

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="header">
        <a href="/"><span className="logo"/></a>
        {this.props.authenticated && <a href="/logout">Log ud</a>}
      </div>
    );
  }
}
