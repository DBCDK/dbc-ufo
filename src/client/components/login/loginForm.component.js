import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        agencyid: '',
        user: '',
        pin: ''
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

  render() {
    const disabled = !({...this.state.fields});
    return (
      <div className='login-form'>
        <form>
          <div className='form-group'>
            <label>Biblioteksnummer
              <input type='text' onChange={this.onChange} name='agencyid' value={this.state.fields.agencyid}/>
            </label>
          </div>
          <div className='form-group'>
            <label>Brugernavn
              <input type='text' onChange={this.onChange} name='user' value={this.state.fields.user}/>
            </label>
          </div>
          <div className='form-group'>
            <label>Adgangskode
              <input type='text' onChange={this.onChange} name='pin' value={this.state.fields.pin}/>
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor="termas-and-conditions" className='pointer'>
              <input type="checkbox" name="termas-and-conditions" id="termas-and-conditions"/>
              <span>Jeg har læst og accepteret retningslinjerne for upload af billeder til Forsideservice.</span>
            </label>
          </div>
          <div className='login-form--submit-btn-container'>
            <button className='submit pointer' onClick={this.onSubmit} disabled={disabled}>LOG IND</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
