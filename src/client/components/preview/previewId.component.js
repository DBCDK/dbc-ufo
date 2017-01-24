import React from 'react';

export default class PreviewId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.value
    };
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
    const {value} = this.props;
    return (
      <form onSubmit={this.onSubmit} className="id-form component flex">
        <label htmlFor="id">ID</label>
        <div className="id-input grow">
          <input className="underline" onChange={this.onChange} ref={(input) => this.input = input} id="id" type="text" name="id"
                 defaultValue={value}
                 placeholder="Skriv id her"/>
        </div>
        <button disabled={!this.isButtonActive() && 'disabled' || ''} className="submit small" onClick={this.onSubmit}>
          Opdater
        </button>
      </form>
    );
  }
}

PreviewId.propTypes = {
  value: React.PropTypes.string,
  onSubmit: React.PropTypes.func
};
