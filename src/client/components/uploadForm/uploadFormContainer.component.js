import React from 'react';
import ImageUpload from './imageUpload.component';
import PreviewContainer from './previewContainer.component';

export default class UploadFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.minSize = 100000;
    this.maxSize = 5000000;
    this.accepts = 'image/jpeg, image/jpg, image/png';
    this.state = {
      acceptedFiles: [],
      rejectedFiles: []
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      acceptedFiles: this.state.acceptedFiles.concat(acceptedFiles),
      rejectedFiles: this.state.rejectedFiles.concat(rejectedFiles)
    });
  };

  render() {
    return (
      <div className="upload-form-container">
        <ImageUpload accept={this.accepts} minSize={this.minSize} maxSize={this.maxSize} onDrop={this.onDrop} />
        <PreviewContainer acceptedFiles={this.state.acceptedFiles} rejectedFiles={this.state.rejectedFiles} />
      </div>
    );
  }
}
