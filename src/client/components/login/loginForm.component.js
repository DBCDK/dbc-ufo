import React from 'react';

export default class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label>Bibliotek</label>
          <input type="text" />
          <label>Brugernavn</label>
          <input type="text" />
          <label>Adgangskode</label>
          <input type="text" />
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {};
