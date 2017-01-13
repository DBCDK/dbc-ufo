import React from 'react';
import ImageUpload from './imageUpload.component';
import PreviewList from '../preview/previewList.component';

export default class ImageUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.minSize = 100000;
    this.maxSize = 5000000;
    this.accepts = 'image/jpeg, image/jpg, image/png';
    this.state = {
      accepted: [],
      rejected: []
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      accepted: this.state.accepted.concat(acceptedFiles),
      rejected: this.state.rejected.concat(rejectedFiles)
    });
  };

  onRemove = (element) => {
    const accepted = this.state.accepted.filter(file => file !== element);
    const rejected = this.state.rejected.filter(file => file !== element);
    this.setState({accepted, rejected});
  };

  render() {
    return (
      <div className="upload-form-container">
        <ImageUpload accept={this.accepts} minSize={this.minSize} maxSize={this.maxSize} onDrop={this.onDrop} />
        <PreviewList type="image" accepted={this.state.accepted} rejected={this.state.rejected} onRemove={this.onRemove} />
      </div>
    );
  }
}

