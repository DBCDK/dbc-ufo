import React from 'react';
import request from 'superagent';

// Components
import LoginForm from './loginForm.component';

export default class LoginContainer extends React.Component {
  onSubmit = (fields) => {
    const agencyid = fields.agencyid;
    const user = fields.user;
    const pin = fields.pin;
    this.requestLogin({agencyid, user, pin});
  };

  requestLogin(params) {
    request
      .post('/login')
      .send(params)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err && res.status === 200) {
          window.location = '/';
        }
        else {
          console.error(err); // eslint-disable-line no-console
        }
      });
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

LoginContainer.propTypes = {};
