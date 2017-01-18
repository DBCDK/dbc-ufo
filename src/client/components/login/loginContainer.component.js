import React from 'react';
import request from 'superagent';

// Components
import LoginForm from './loginForm.component';

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  onSubmit = (fields) => {
    const agency = fields.agency;
    const user = fields.user;
    const password = fields.password;
    const agreement = fields.agreement;
    this.requestLogin({agency, user, password, agreement});
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
          console.error(res.text); // eslint-disable-line no-console
          console.error(err); // eslint-disable-line no-console
          this.setState({error: res.text});
        }
      });
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit} error={this.state.error}/>
      </div>
    );
  }
}

LoginContainer.propTypes = {};
