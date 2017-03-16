import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';


export default class UrlUpload extends React.Component {

  propTypes = {
    onSubmit: React.PropTypes.onSubmit,
    back: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value.split('\n'));
    this.setState({value: ''});
  }
  onChange = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return UrlUploadDisplay({value: this.state.value, onChange: this.onChange, onSubmit: this.onSubmit, back: this.props.back});
  }
}

function UrlUploadDisplay({value, onSubmit, onChange}) {
  return (
    <div className="url-upload mb2">
      <div className="url-upload-header flex baseline">
        <h1 className="grow">Upload af URL'er</h1>
        <a href="/image">Vil du uploade filer?</a>
      </div>
      <TextareaAutosize
        rows={8}
        placeholder="Skriv en URL pr. linie"
        useCacheForDOMMeasurements
        value={value}
        onChange={onChange}
      />
      <div className="relative">
        <div className="help description">
          Skriv en URL på hver linie <i>eller</i><br />
          Skriv URL og materialeID på samme linie adskilt af mellemrum eller tab
        </div>
        <div className="absolute right text-right">
          <button disabled={!value} className="submit" onClick={onSubmit}>Hent preview af billeder</button>
        </div>
      </div>

    </div>
  );
}

UrlUploadDisplay.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func
};
