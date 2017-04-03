import React from 'react';

function getMessage (error) {
  const errorMessages = {
    user_not_found: 'Vi kan ikke genkendelse de indtastede oplysninger. Prøv igen'
  };

  if (errorMessages[error]) {
    return errorMessages[error];
  }

  return error;
}

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
      error: this.props.error,
      showAgency: true,
      showPassword: false
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.fields.agreement) {
      this.setState({error: null});
      this.props.onSubmit(this.state.fields);
    }
    else {
      this.setState({error: 'Du skal acceptere retningslinjerne.'});
    }
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
    const fields = this.state.fields;
    fields.agreement = !fields.agreement;
    this.setState({fields});
  };

  componentDidMount() {
    this.agency.focus();
  }

  render() {
    const errorMsg = this.state.error || this.props.error ? (
      <div className="message flex"><span className="nb">Ups </span><span className="message-content">{getMessage(this.state.error || this.props.error)}</span></div>) : null;

    return (
      <div className='login-form'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Netpunkt brugernavn
              <input className='underline' type='text' id="login-input-user" onChange={this.onChange} name='user'
                     required="required"
                     value={this.state.fields.user}/>
            </label>
          </div>
          <div className='form-group'>
            <label className="with-icon">Biblioteksnummer
              <input className='underline' type="text" id='login-input-agency'
                     ref={(agency) => this.agency = agency}
                     required="required"
                     onChange={this.onChange} name='agency' value={this.state.fields.agency}/>
            </label>
          </div>
          <div className='form-group'>
            <label className="with-icon">Adgangskode
              <input className='underline' type={this.state.showPassword && 'text' || 'password'}
                     required="required"
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
            <input type="submit" className='submit pointer button' id="login-input-submit" value="LOG IND" />
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
