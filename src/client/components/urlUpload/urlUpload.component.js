import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';


export default class UrlUpload extends React.Component {

  propTypes = {
    onSubmit: React.PropTypes.onSubmit
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
  }
  onChange = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return UrlUploadDisplay({value: this.state.value, onChange: this.onChange, onSubmit: this.onSubmit});
  }
}

function UrlUploadDisplay({value, onSubmit, onChange}) {
  return (
    <div className="url-upload component">
      <TextareaAutosize
        useCacheForDOMMeasurements
        value={value}
        onChange={onChange}
      />
      <button onClick={onSubmit}>vis i liste</button>
    </div>
  );
}

UrlUploadDisplay.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func
};
