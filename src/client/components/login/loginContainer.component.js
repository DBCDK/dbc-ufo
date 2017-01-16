import React from 'react';

// Components
import LoginForm from './loginForm.component';

export default class LoginContainer extends React.Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

LoginContainer.propTypes = {};
