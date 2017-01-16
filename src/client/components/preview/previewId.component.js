import React from 'react';

export default class PreviewId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.value,
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.input.value);
    this.setState({currentValue: this.input.value});
  }

  onChange = () => {
    this.setState({currentValue: this.input.value});
  }

  isButtonActive() {
    if (this.state.currentValue && this.state.currentValue !== this.props.value) {
      return true;
    }

    return false;
  }

  render() {
    const {value, idIsValid} = this.props;
    const state = value && (idIsValid && 'checkmark' || 'cross') || '';
    return (
      <form onSubmit={this.onSubmit} className="id-form component flex">
        <label htmlFor="id">ID</label>
        <div className="input grow">
          <input onChange={this.onChange} ref={(input) => this.input = input} id="id" type="text" name="id" defaultValue={value}
                 placeholder="Skriv id her"/>
          <span className={`state ${state}`}></span>
        </div>
        <button disabled={!this.isButtonActive() && 'disabled' || ''} className="submit small" onClick={this.onSubmit}>Opdater</button>
      </form>
    );
  }
}

PreviewId.propTypes = {
  value: React.PropTypes.string,
  idIsValid: React.PropTypes.bool,
  onSubmit: React.PropTypes.func
};
