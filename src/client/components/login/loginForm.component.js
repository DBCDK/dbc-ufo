import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        agency: '',
        user: 'netpunkt',
        password: '',
        agreement: false
      },
      showAgency: true,
      showPassword: false
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

  toggle = (element) => {
    this.setState(prevState => ({[element]: !prevState[element]}));
  };

  checkboxHandler = () => {
    const state = Object.assign(this.state, {});
    state.fields.agreement = !this.state.fields.agreement;
    this.setState(state);
  };

  render() {
    const disabled = !this.state.fields.agency || !this.state.fields.user || !this.state.fields.password || !this.state.fields.agreement;
    const errorMsg = this.props.error ? (
      <div className="message"><span className="nb">Fejl </span>{this.props.error}</div>) : null;

    return (
      <div className='login-form'>
        <h1 className="login-header mb1">Indtast Netpunkt login</h1>
        <form>
          <div className='form-group'>
            <label>Brugernavn
              <input className='underline' type='text' id="login-input-user" onChange={this.onChange} name='user'
                     value={this.state.fields.user}/>
            </label>
          </div>
          <div className='form-group'>
            <label className="with-icon">Biblioteksnummer
              <input className='underline' type={this.state.showAgency && 'text' || 'password'} id='login-input-agency'
                     onChange={this.onChange} name='agency' value={this.state.fields.agency}/>
              <span className={`icon icon-inline ${this.state.showAgency && 'open' || 'closed'}`}
                    onClick={() => this.toggle('showAgency')}/>
            </label>
          </div>
          <div className='form-group'>
            <label className="with-icon">Adgangskode
              <input className='underline' type={this.state.showPassword && 'text' || 'password'}
                     id="login-input-password" onChange={this.onChange} name='password'
                     value={this.state.fields.password}/>
              <span className={`icon icon-inline ${this.state.showPassword && 'open' || 'closed'}`}
                    onClick={() => this.toggle('showPassword')}/>
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor="termas-and-conditions" className='pointer' id='login-input-tac'>
              <input type="checkbox" id='termas-and-conditions' name="termas-and-conditions"
                     checked={this.state.fields.agreement} onClick={this.checkboxHandler}/>
              <span>Jeg har læst og accepteret <a href="/terms" target="_blank">retningslinjerne</a> for upload af billeder til Forsideservice.</span>
            </label>
          </div>
          <div>
            {errorMsg}
          </div>
          <div className='login-form--submit-btn-container'>
            <button className='submit pointer' id="login-input-submit" onClick={this.onSubmit} disabled={disabled}>LOG
              IND
            </button>
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
