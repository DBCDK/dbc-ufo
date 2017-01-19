import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        agency: '',
        user: '',
        password: '',
        agreement: false
      }
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.fields);
  };

  onChange = (e) => {
    const name = e.target.name || null;
    if (name) {
      const fields = Object.assign(this.state.fields, {});
      fields[name] = e.target.value;
      this.setState({fields: fields});
    }
  };

  checkboxHandler = () => {
    const state = Object.assign(this.state, {});
    state.fields.agreement = !this.state.fields.agreement;
    this.setState(state);
  };

  render() {
    const disabled = !this.state.fields.agency || !this.state.fields.user || !this.state.fields.password || !this.state.fields.agreement;
    const errorMsg = this.props.error ? (<div className="message error"><h2>Fejl: {this.props.error}</h2></div>) : null;

    return (
      <div className='login-form'>
        {errorMsg}
        <form>
          <div className='form-group'>
            <label>Biblioteksnummer
              <input type='text' id='login-input-agency' onChange={this.onChange} name='agency' value={this.state.fields.agency}/>
            </label>
          </div>
          <div className='form-group'>
            <label>Brugernavn
              <input type='text' id="login-input-user" onChange={this.onChange} name='user' value={this.state.fields.user}/>
            </label>
          </div>
          <div className='form-group'>
            <label>Adgangskode
              <input type='password' id="login-input-password" onChange={this.onChange} name='password' value={this.state.fields.password}/>
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor="termas-and-conditions" className='pointer' id='login-input-tac'>
              <input type="checkbox" id='termas-and-conditions' name="termas-and-conditions" checked={this.state.fields.agreement} onClick={this.checkboxHandler}/>
              <span>Jeg har læst og accepteret retningslinjerne for upload af billeder til Forsideservice.</span>
            </label>
          </div>
          <div className='login-form--submit-btn-container'>
            <button className='submit pointer' id="login-input-submit" onClick={this.onSubmit} disabled={disabled}>LOG IND</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  error: React.PropTypes.string
};
